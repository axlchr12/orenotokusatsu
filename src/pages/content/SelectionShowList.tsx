import type { TokuItem } from '../../context';
import type { TranslateProps } from '../../dataHook';

type SelectionShowListProps = {
  searchedShows: TokuItem[] | undefined;
  handleAddWork: (newItem: TokuItem) => void;
  translate: TranslateProps;
  searchTitle: string;
  isListLoading: boolean;
};

export const SelectionShowList = ({
  searchedShows,
  handleAddWork,
  translate,
  searchTitle,
  isListLoading,
}: SelectionShowListProps) => {
  return (
    <div className="max-h-96 overflow-y-auto">
      {searchTitle && (
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-3 z-10 py-3">
          {translate('searchResults', { query: searchTitle })}
        </p>
      )}

      {isListLoading && (
        <div className="py-2">
          <p className="text-sm font-medium animate-pulse text-gray-400">
            {translate('onLoadingData')}
          </p>
        </div>
      )}

      {!isListLoading && (searchedShows || [])?.length > 0 ? (
        searchedShows?.map((show, index: number) => (
          <div
            key={show?.id || index}
            className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-xl cursor-pointer transition-all mb-1 group active:scale-75"
            onClick={() => {
              handleAddWork(show);
            }}
          >
            <div className="w-16 sm:w-22 h-full bg-gray-200 rounded-xl border border-gray-100">
              <img
                src={show.image || 'https://placehold.co/150'}
                className="w-full h-full object-cover"
                alt={show.title}
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-gray-800 group-hover:text-sky-600">
                [{show.type}-{show.year}]&nbsp;{show.title}
              </h4>

              <p className="text-[11px] text-gray-400 italic group-hover:text-sky-600">
                [{show.type}-{show.year}]&nbsp;{show.titleJapanese}
              </p>
            </div>

            <div className="min-w-0">
              <div className="text-gray-400 text-4xl font-light group-hover:text-sky-600 transition-colors">
                +
              </div>
            </div>
          </div>
        ))
      ) : !isListLoading &&
        searchTitle &&
        (searchedShows || [])?.length === 0 ? (
        <div className="text-center py-2 font-bold text-gray-400 text-sm">
          {translate('dataNotFound')}
        </div>
      ) : null}
    </div>
  );
};
