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
          <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Processing...</span>
        </>
      ) : (
        <>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          <span>Share My List</span>
        </>
      )}
    </button>
  );
};
