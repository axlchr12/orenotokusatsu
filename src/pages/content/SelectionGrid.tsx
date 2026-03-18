import React from 'react';
import { useCallback, useState } from 'react';
import type { TokuItem } from '../../context';
import type { TranslateProps } from '../../dataHook';
import { OverviewShowModal } from './OverviewShowModal';

type SelectionGridProps = {
  selectedTokuTitles: (TokuItem | null)[];
  handleRemoveWork: (index: number) => void;
  onOpenModal: (index: number) => void;
  translate: TranslateProps;
  currentLanguage: string;
};

export const SelectionGrid = React.memo(
  ({
    selectedTokuTitles,
    handleRemoveWork,
    onOpenModal,
    translate,
    currentLanguage,
  }: SelectionGridProps) => {
    const [activeSlot, setActiveSlot] = useState<number | undefined>(undefined);
    const [showOverviewModal, setShowOverviewModal] = useState<boolean>(false);
    const onOpenOverviewModal = useCallback((index: number) => {
      setActiveSlot(index);
      setShowOverviewModal(true);
    }, []);

    const onCloseOverviewModal = useCallback(() => {
      setActiveSlot(undefined);
      setShowOverviewModal(false);
    }, []);

    return (
      <>
        <div className="w-full max-w-3xl mx-auto p-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-2">
            {selectedTokuTitles.map((item, index) => (
              <div
                key={item?.id || index}
                className="relative flex flex-col items-center justify-center aspect-square border border-gray-100 rounded-xl cursor-pointer hover:border-sky-400 hover:bg-sky-50 transition-all shadow-md overflow-hidden backdrop-blur-sm duration-300"
                onClick={() => !item && onOpenModal(index)}
              >
                <span className="absolute top-0 left-0 text-[10px] sm:text-sm font-bold text-white bg-sky-700/90 px-2 py-1 rounded-br-xl z-30 shadow-md transition-shadow">
                  {index + 1}
                </span>
                {item ? (
                  <>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        handleRemoveWork(index);
                      }}
                      className="absolute top-0 right-0 z-40 bg-red-500/90 hover:bg-red-600 text-white w-7 h-7 rounded-bl-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-75 shadow-md no-export cursor-pointer"
                    >
                      <span className="text-lg leading-none">&times;</span>
                    </button>
                    <img
                      src={
                        item.image
                          ? `${item.image}&lang=${currentLanguage}`
                          : 'https://placehold.co/150'
                      }
                      // loading="lazy"
                      loading="eager"
                      decoding="sync"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      onClick={() => onOpenOverviewModal(index)}
                      crossOrigin="anonymous"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm p-1.5 z-20 translate-y-0 transition-transform rounded-b-xl">
                      <p className="text-white text-[9px] sm:text-[11px] font-medium leading-tight text-center line-clamp-2">
                        [{item?.type}-{item?.year}]&nbsp;
                        {currentLanguage === 'ja'
                          ? item?.titleJapanese
                          : item?.title}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-1 group transition-transform duration-300 hover:scale-110">
                    <div className="text-gray-300 text-4xl font-light group-hover:text-sky-400 transition-colors duration-300">
                      +
                    </div>
                    <div className="text-gray-400 text-[9px] sm:text-[10px] font-light group-hover:text-sky-400 transition-colors duration-300 uppercase tracking-widest">
                      {translate('addItem')}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <OverviewShowModal
          activeSlot={activeSlot}
          onClose={onCloseOverviewModal}
          selectedTokuTitles={selectedTokuTitles}
          show={showOverviewModal}
          title="overviewShowModalTitle"
          translate={translate}
          currentLanguage={currentLanguage}
        />
      </>
    );
  },
);
