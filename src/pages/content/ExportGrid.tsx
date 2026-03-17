import { useState, type RefObject } from 'react';
import type { TranslateProps } from '../../dataHook';
import { toJpeg } from 'html-to-image';
import type { TokuItem } from '../../context';

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

  console.log('inilah2', { selectedWorks });

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

      //   if (navigator.canShare && navigator.canShare({ files: [file] })) {
      //     await navigator.share({
      //       files: [file],
      //       title: 'Ore no Tokusatsu List',
      //       text: 'Cek 12 karya Tokusatsu favorit gue! Bikin punya lo juga di sini:',
      //       url: window.location.href,
      //     });
      //   } else {
      const link = document.createElement('a');
      link.download = 'my-tokusatsu-list.jpg';
      link.href = dataUrl;
      link.click();
      //   }
    } catch (err) {
      console.error('Gagal membagikan:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={isExporting}
      className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-white transition-all 
    ${isExporting ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 active:scale-95'}`}
    >
      {isExporting ? (
        <>
          <span className="animate-pulse">Processing...</span>
        </>
      ) : (
        <>
          <span>Share My List</span>
        </>
      )}
    </button>
  );
};
