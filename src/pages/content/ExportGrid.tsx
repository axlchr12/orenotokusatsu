import { useCallback, useMemo, useState, type RefObject } from 'react';
import type { TranslateProps } from '../../dataHook';
import { toJpeg } from 'html-to-image';
import type { TokuItem } from '../../context';
import classNames from 'classnames';
import { toBase64 } from '../../utils';

type ExportGridProps = {
  translate: TranslateProps;
  contentRef: RefObject<HTMLDivElement | null>;
  selectedWorks: (TokuItem | null)[];
};

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

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
    if (isExporting) return;

    setIsExporting(true);

    if (!contentRef.current) {
      throw new Error('Failed to share:', { cause: 'Element not found' });
    }

    const images = contentRef.current?.querySelectorAll('img');
    const originalSrcs: string[] = [];

    try {
      const promises = Array.from(images || []).map(async (img, index) => {
        originalSrcs[index] = img.src;

        if (img.src && !img.src.startsWith('data:')) {
          try {
            const base64 = await toBase64(img.src);
            img.src = base64;
          } catch (e) {
            throw new Error(
              `Failed to change image to base64 for index-${index}`,
              { cause: e },
            );
          }
        }
      });

      await Promise.all(promises);

      const dataUrl = await toJpeg(contentRef.current!, {
        quality: 0.95,
        backgroundColor: '#eaefef',
        cacheBust: false,
        style: {
          filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.1))',
        },
        filter: node => {
          const exclusionClasses = ['no-export'];
          return !exclusionClasses.some(cls => node.classList?.contains(cls));
        },
      });

      images?.forEach((img, index) => {
        if (originalSrcs[index]) {
          img.src = originalSrcs[index];
        }
      });

      const rawTitle = translate('title');
      const shareText = translate('textToShare');
      const shareTitle = translate('titleToShare');
      const cleanTitle = rawTitle.replace(/<\/?[0-9]+>/g, '');
      const fileName = `${cleanTitle}.jpg`;

      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], fileName, { type: 'image/jpeg' });

      if (
        isMobile &&
        navigator.canShare &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          files: [file],
          title: shareTitle,
          text: `${shareText}\n\n`,
          url: window.location.href,
        });
      } else {
        const link = document.createElement('a');
        link.download = fileName;
        link.href = dataUrl;
        link.click();
      }
    } catch (err) {
      setIsExporting(false);
      throw new Error('Failed to share:', { cause: err });
    } finally {
      setIsExporting(false);
    }
  }, [isExporting, isMobile, translate, contentRef]);

  const _onClick = useCallback(() => {
    if (disabled) return;

    return handleShare();
  }, [disabled, handleShare]);

  return (
    <button
      onClick={_onClick}
      className={classNames(
        'px-4 py-2.5 rounded-xl shadow-xl font-bold text-white transition-all duration-300',
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
