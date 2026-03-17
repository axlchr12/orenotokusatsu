import { useEffect, useState } from 'react';
import type { TokuItem } from '../../context';
import type { TranslateProps } from '../../dataHook';

type SelectionShowListProps = {
  searchedShows: TokuItem[] | undefined;
  handleAddWork: (newItem: TokuItem) => void;
  translate: TranslateProps;
  searchTitle: string;
};

export const SelectionShowList = ({
  searchedShows,
  handleAddWork,
  translate,
  searchTitle,
}: SelectionShowListProps) => {
  const [isSearching, setIsSearching] = useState(false);
  const [delayedResults, setDelayedResults] = useState<any[]>([]);

  useEffect(() => {
    if (searchTitle) {
      setIsSearching(true);
      setDelayedResults([]);

      const timer = setTimeout(() => {
        setDelayedResults(searchedShows || []);
        setIsSearching(false);
      }, 1500);

      return () => clearTimeout(timer);
    } else {
      setDelayedResults([]);
      setIsSearching(false);
    }
  }, [searchedShows, searchTitle]);

  return (
    <div className="max-h-87.5 overflow-y-auto">
      {searchTitle && (
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-3 z-10 py-3">
          {translate('searchResults', { query: searchTitle })}
        </p>
      )}

      {isSearching && (
        <div className="py-2">
          <p className="text-sm font-medium animate-pulse text-gray-400">
            {translate('onLoadingData')}
          </p>
        </div>
      )}

      {!isSearching && delayedResults.length > 0 ? (
        delayedResults.map((show: any, index: number) => (
          <div
            key={show?.id || index}
            className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-xl cursor-pointer transition-colors mb-1 group"
            onClick={() => {
              handleAddWork(show);
            }}
          >
            <div className="w-20 h-25 bg-gray-200 rounded-xl border border-gray-100">
              <img
                src={show.image || 'https://placehold.co/150'}
                className="w-full h-full object-contain"
                alt={show.title}
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-gray-800 group-hover:text-sky-500 truncate sm:whitespace-normal">
                {show.title}
              </h4>

              {show?.titleJapanese && show?.titleJapanese !== show?.title && (
                <p className="text-[11px] text-gray-500 italic truncate sm:whitespace-normal">
                  {show.titleJapanese}
                </p>
              )}
            </div>

            <div className="min-w-0">
              <div className="text-gray-400 text-4xl font-light group-hover:text-sky-400 transition-colors">
                +
              </div>
            </div>
          </div>
        ))
      ) : !isSearching && searchTitle && delayedResults.length === 0 ? (
        <div className="text-center py-2 font-bold text-gray-400 text-sm">
          {translate('dataNotFound')}
        </div>
      ) : null}
    </div>
  );
};
