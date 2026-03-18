import { useCallback, useMemo, useState, type RefObject } from 'react';
import type { TranslateProps } from '../../dataHook';
import { toJpeg } from 'html-to-image';
import type { TokuItem } from '../../context';
import classNames from 'classnames';

type ExportGridProps = {
  translate: TranslateProps;
  contentRef: RefObject<HTMLDivElement | null>;
  selectedWorks: (TokuItem | null)[];
};

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

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const handleShare = async () => {
    if (isExporting) return;

    setIsExporting(true);

    if (!contentRef.current) {
      console.error('Element not found!');
      return;
    }

    try {
      const dataUrl = await toJpeg(contentRef?.current, {
        quality: 0.95,
        backgroundColor: '#eaefef',
        cacheBust: true,
        style: {
          filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.1))',
        },
        filter: node => {
          const exclusionClasses = ['no-export'];
          return !exclusionClasses.some(cls => node.classList?.contains(cls));
        },
      });

      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], 'my-tokusatsu.jpg', { type: 'image/jpeg' });

      if (
        isMobile &&
        navigator.canShare &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          files: [file],
          title: 'testTitle',
          text: 'cekidot:',
          url: window.location.href,
        });
      } else {
        const link = document.createElement('a');
        link.download = 'my-tokusatsu-list.jpg';
        link.href = dataUrl;
        link.click();
      }
    } catch (err) {
      console.error('Failed to share:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const _onClick = useCallback(() => {
    if (disabled) return;

    return handleShare();
  }, [disabled, handleShare]);

  return (
    <button
      onClick={_onClick}
      className={classNames(
        'px-4 py-2.5 rounded-xl shadow-xl font-bold text-white transition-all',
        {
          'bg-gray-400 cursor-not-allowed': disabled,
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
