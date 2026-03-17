import { useCallback, useMemo, useState } from 'react';
import type { TokuItem } from '../../context';
import type { TranslateProps } from '../../dataHook';
import { SearchForm } from '../../components';
import { SelectionShowList } from './SelectionShowList';
import { DuplicateErrorAlert } from './DuplicateErrorAlert';

type SelectionModalProps = {
  show: boolean;
  onClose: () => void;
  title: string;
  handleSearchTitle: (title: string) => void;
  handleAddWork: (newItem: TokuItem) => void;
  searchedShows: TokuItem[] | undefined;
  translate: TranslateProps;
  searchTitle: string;
  selectedTokuWorks: (TokuItem | null)[];
  currentLanguage: string;
};

export const SelectionModal = ({
  show,
  onClose,
  title,
  handleSearchTitle,
  handleAddWork,
  searchedShows,
  translate,
  searchTitle,
  selectedTokuWorks,
  currentLanguage,
}: SelectionModalProps) => {
  if (!show) return null;

  const [alertInfo, setAlertInfo] = useState<{
    message: string;
  } | null>(null);

  const translatedTitle = useMemo(() => {
    return translate(title);
  }, []);

  const _handleAddWork = useCallback(
    (newItem: TokuItem) => {
      const isDuplicate = selectedTokuWorks.some(
        work =>
          work !== null &&
          work.id === newItem.id &&
          work.source === newItem.source,
      );

      if (isDuplicate) {
        setAlertInfo({
          message: translate('duplicateEntries', {
            title:
              currentLanguage === 'ja'
                ? newItem?.titleJapanese
                : newItem?.title,
          }),
        });
        return;
      }

      if (typeof handleAddWork === 'function') {
        handleAddWork(newItem);
        onClose();
      }
    },
    [handleAddWork, selectedTokuWorks, onClose, currentLanguage],
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/55 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-xs sm:max-w-md transform transition-all overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-800">
            {translatedTitle}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-2xl"
          >
            &times;
          </button>
        </div>

        <div className="px-6 py-4">
          <SearchForm handleSearch={handleSearchTitle} translate={translate} />
          {alertInfo && (
            <DuplicateErrorAlert
              message={alertInfo.message}
              onClose={() => setAlertInfo(null)}
            />
          )}
          <SelectionShowList
            searchedShows={searchedShows}
            handleAddWork={_handleAddWork}
            translate={translate}
            searchTitle={searchTitle}
          />
        </div>
      </div>
    </div>
  );
};
