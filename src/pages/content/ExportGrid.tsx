import { useCallback, useMemo, useState, type RefObject } from 'react';
import type { TranslateProps } from '../../dataHook';
import { toCanvas, toJpeg } from 'html-to-image';
import type { TokuItem } from '../../context';
import classNames from 'classnames';
import {
  convertImagesToBase64Batched,
  getExportConfig,
  waitForImages,
} from '../../utils';

type ExportGridProps = {
  translate: TranslateProps;
  contentRef: RefObject<HTMLDivElement | null>;
  selectedWorks: (TokuItem | null)[];
};

export const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export const ExportGrid = ({
  translate,
  contentRef,
  selectedWorks,
}: ExportGridProps) => {
  const [isExporting, setIsExporting] = useState(false);

  const disabled = useMemo(() => {
    const isFullSelect = selectedWorks.every(work => work !== null);
    return !isFullSelect || isExporting;
  }, [selectedWorks, isExporting]);

  const handleShare = useCallback(async () => {
    if (isExporting || !contentRef.current) return;
    setIsExporting(true);

    try {
      const element = contentRef.current;
      const images = element.querySelectorAll('img');
      const originalSrcs: string[] = [];

      await convertImagesToBase64Batched(images, originalSrcs, 3);
      await waitForImages(images);
      await new Promise(resolve => requestAnimationFrame(resolve));
      await new Promise(resolve => requestAnimationFrame(resolve));

      let dataUrl: string;

      if (isMobile) {
        const { pixelRatio, quality, scale } = getExportConfig(element);
        const sharedStyle = {
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: element.offsetWidth + 'px',
          height: element.offsetHeight + 'px',
          borderRadius: '0',
          boxShadow: '0px 0px 0px rgba(0,0,0,0) !important',
          filter: 'none !important',
        };
        const sharedFilter = (node: HTMLElement) =>
          !['no-export'].some(cls => node.classList?.contains(cls));

        const canvas = await toCanvas(element, {
          quality,
          pixelRatio,
          backgroundColor: '#eaefef',
          cacheBust: true,
          width: element.offsetWidth * scale,
          height: element.offsetHeight * scale,
          canvasWidth: element.offsetWidth * scale,
          canvasHeight: element.offsetHeight * scale,
          style: sharedStyle,
          filter: sharedFilter,
        });

        const ctx = canvas.getContext('2d');
        const pixel = ctx?.getImageData(0, 0, 1, 1).data;
        const isBlank =
          !pixel ||
          (pixel[0] === 0 &&
            pixel[1] === 0 &&
            pixel[2] === 0 &&
            pixel[3] === 0);

        if (isBlank) {
          const fallbackCanvas = await toCanvas(element, {
            quality: 0.55,
            pixelRatio: 1,
            backgroundColor: '#eaefef',
            cacheBust: true,
            width: element.offsetWidth,
            height: element.offsetHeight,
            canvasWidth: element.offsetWidth,
            canvasHeight: element.offsetHeight,
            style: { ...sharedStyle, transform: 'scale(1)' },
            filter: sharedFilter,
          });
          dataUrl = fallbackCanvas.toDataURL('image/jpeg', 0.55);
        } else {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }
      } else {
        // desktop (laptop, pc)
        dataUrl = await toJpeg(element, {
          quality: 0.75,
          backgroundColor: '#eaefef',
          cacheBust: false,
          pixelRatio: 2,
          filter: node =>
            !['no-export'].some(cls => node.classList?.contains(cls)),
        });
      }

      images.forEach((img, index) => {
        if (originalSrcs[index]) img.src = originalSrcs[index];
      });

      const rawTitle = translate('title');
      const shareText = translate('textToShare', { url: window.location.href });
      const shareTitle = translate('titleToShare');
      const cleanTitle = rawTitle.replace(/<\/?[0-9]+>/g, '');
      const fileName = `${cleanTitle}.jpg`;
      const fullText = `${shareText}\n\n#俺の特撮\n#OrenoTokusatsu`;

      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], fileName, { type: 'image/jpeg' });

      if (
        isMobile &&
        navigator.canShare &&
        navigator.canShare({ files: [file] })
      ) {
        await new Promise<void>(resolve => {
          setTimeout(async () => {
            try {
              await navigator.share({
                files: [file],
                title: shareTitle,
                text: fullText,
              });
              resolve();
            } catch (e) {
              const link = document.createElement('a');
              link.download = fileName;
              link.href = dataUrl;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              resolve();
            }
          }, 0);
        });
      } else {
        const link = document.createElement('a');
        link.download = fileName;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      throw new Error('Failed to share:', { cause: error });
    } finally {
      setIsExporting(false);
    }
  }, [isExporting, translate, contentRef]);

  const _onClick = useCallback(() => {
    if (disabled) return;
    return handleShare();
  }, [disabled, handleShare]);

  return (
    <button
      onClick={_onClick}
      className={classNames(
        'px-4 py-2.5 rounded-xl shadow-md font-bold text-white transition-all duration-300',
        {
          'bg-gray-400 cursor-not-allowed grayscale opacity-70': disabled,
          'bg-sky-600 hover:bg-sky-700 active:scale-75 cursor-pointer':
            !disabled,
        },
      )}
    >
      {isExporting ? (
        <span className="animate-pulse">{translate('shareOnProcess')}</span>
      ) : (
        <span>{translate('share')}</span>
      )}
    </button>
  );
};
