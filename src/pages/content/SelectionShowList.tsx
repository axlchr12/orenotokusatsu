import React from 'react';
import type { TokuItem } from '../../context';
import type { TranslateProps } from '../../dataHook';

type SelectionShowListProps = {
  searchedTitles: TokuItem[] | undefined;
  handleAddWork: (newItem: TokuItem) => void;
  translate: TranslateProps;
  searchTitle: string;
  isListLoading: boolean;
};

export const SelectionShowList = React.memo(
  ({
    searchedTitles,
    handleAddWork,
    translate,
    searchTitle,
    isListLoading,
  }: SelectionShowListProps) => {
    const hasResults = (searchedTitles || []).length > 0;

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

        {!isListLoading && hasResults ? (
          searchedTitles?.map((show, index: number) => (
            <div
              key={show?.id || index}
              className="flex items-center gap-3 p-2 rounded-xl cursor-pointer mb-1 group transition-all duration-200 hover:bg-sky-50 active:scale-75"
              onClick={() => {
                handleAddWork(show);
              }}
            >
              <div className="w-16 sm:w-22 h-full bg-gray-200 rounded-xl overflow-hidden border border-gray-100 shadow">
                <img
                  src={show.image || 'https://placehold.co/150'}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt={show.title}
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                  loading="lazy"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-gray-800 leading-tight transition-colors duration-200 group-hover:text-sky-600">
                  [{show.type}-{show.year}]&nbsp;{show.title}
                </h4>

                <p className="text-[11px] text-gray-400 italic leading-relaxed transition-colors duration-200 group-hover:text-sky-600">
                  {show.titleJapanese}
                </p>
              </div>
              <div className="min-w-0">
                <div className="text-gray-400 text-4xl font-light group-hover:text-sky-600 transition-colors">
                  +
                </div>
              </div>
            </div>
          ))
        ) : !isListLoading && searchTitle && !hasResults ? (
          <div className="text-center py-2 font-bold text-gray-400 text-sm">
            {translate('dataNotFound')}
          </div>
        ) : null}
      </div>
    );
  },
);
