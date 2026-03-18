import type { TokuItem } from '../../context';
import type { TranslateProps } from '../../dataHook';

type SelectionGridProps = {
  selectedTokuWorks: (TokuItem | null)[];
  handleRemoveWork: (index: number) => void;
  onOpenModal: (index: number) => void;
  translate: TranslateProps;
  currentLanguage: string;
};

export const SelectionGrid = ({
  selectedTokuWorks,
  handleRemoveWork,
  onOpenModal,
  translate,
  currentLanguage,
}: SelectionGridProps) => {
  return (
    <div className="w-full max-w-3xl mx-auto p-3">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {selectedTokuWorks.map((item, index) => (
          <div
            key={item?.id || index}
            className="relative flex flex-col items-center justify-center aspect-square border border-gray-100 rounded-xl cursor-pointer hover:border-sky-400 hover:bg-sky-50 transition-all shadow-xl overflow-hidden backdrop-blur-sm"
            onClick={() => !item && onOpenModal(index)}
          >
            <span className="absolute top-0 left-0 text-[10px] sm:text-sm font-bold text-white bg-sky-700 px-2 py-1 rounded-br-lg z-30 shadow-xl transition-shadow">
              {index + 1}
            </span>
            {item ? (
              <>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    handleRemoveWork(index);
                  }}
                  className="absolute top-0 right-0 z-40 bg-red-600 hover:bg-red-600 text-white w-7 h-7 sm:w-6 sm:h-6 rounded-bl-lg flex items-center justify-center transition-all hover:scale-105 active:scale-75 shadow-xl no-export cursor-pointer"
                >
                  <span className="text-lg font-bold">&times;</span>
                </button>
                <img
                  src={item.image || 'https://placehold.co/150'}
                  className="w-full h-full object-cover"
                  alt={item.title}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black backdrop-blur-sm p-1.5 z-20">
                  <p className="text-white text-[9px] sm:text-[12px] font-medium leading-tight text-center">
                    [{item?.type} - {item?.year}]&nbsp;
                    {currentLanguage === 'ja'
                      ? item?.titleJapanese
                      : item?.title}
                  </p>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-1">
                <div className="text-gray-300 text-4xl font-light group-hover:text-sky-400 transition-colors">
                  +
                </div>
                <div className="text-gray-400 text-[10px] sm:text-xs font-light group-hover:text-sky-400 transition-colors uppercase tracking-wider">
                  {translate('addItem')}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
