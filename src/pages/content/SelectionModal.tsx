import { useCallback, useEffect, useMemo, useState } from 'react';
import type { TokuItem } from '../../context';
import type { TranslateProps } from '../../dataHook';
import { SearchForm } from '../../components';
import { SelectionShowList } from './SelectionShowList';
import { DuplicateErrorAlert } from './DuplicateErrorAlert';
import classNames from 'classnames';

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
  const [render, setRender] = useState(show);
  const [isClosing, setIsClosing] = useState(false);

  const [alertInfo, setAlertInfo] = useState<{
    message: string;
  } | null>(null);

  useEffect(() => {
    if (show) {
      setRender(true);
      setIsClosing(false);
    } else {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setRender(false);
        setIsClosing(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [show]);

  const translatedTitle = useMemo(() => {
    return translate(title);
  }, []);

  const _onClose = useCallback(() => {
    if (typeof onClose === 'function') {
      onClose();
      setAlertInfo(null);
    }
  }, [onClose]);

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
        _onClose();
      }
    },
    [handleAddWork, selectedTokuWorks, _onClose, currentLanguage],
  );

  if (!render) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className={classNames(
            'fixed inset-0 bg-black/55 backdrop-blur-sm transition-opacity',
            {
              'animate-fade-out': isClosing,
              'animate-fade-in': !isClosing,
            },
          )}
          onClick={_onClose}
        />

        <div
          className={classNames(
            'relative bg-white rounded-xl shadow-xl w-full max-w-xs sm:max-w-md transform transition-all overflow-hidden',
            {
              'animate-modal-out': isClosing,
              'animate-modal-in': !isClosing,
            },
          )}
        >
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800">
              {translatedTitle}
            </h3>
            <button
              onClick={_onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors text-2xl cursor-pointer"
            >
              &times;
            </button>
          </div>

          <div className="px-6 py-4">
            <SearchForm
              handleSearch={handleSearchTitle}
              translate={translate}
            />
            <SelectionShowList
              searchedShows={searchedShows}
              handleAddWork={_handleAddWork}
              translate={translate}
              searchTitle={searchTitle}
            />
          </div>
        </div>
      </div>
      <>
        {alertInfo && (
          <DuplicateErrorAlert
            message={alertInfo.message}
            onClose={() => setAlertInfo(null)}
          />
        )}
      </>
    </>
  );
};
