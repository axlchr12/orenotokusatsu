import { useCallback, useState } from 'react';
import type { TokuItem } from '../../context';
import type { TranslateProps } from '../../dataHook';
import { Modal, SearchForm } from '../../components';
import { SelectionShowList } from './SelectionShowList';
import { DuplicateErrorAlert } from './DuplicateErrorAlert';

type SelectionModalProps = {
  show: boolean;
  onClose: () => void;
  title: string;
  handleSearchTitle: (title: string) => void;
  handleAddWork: (newItem: TokuItem) => void;
  searchedTitles: TokuItem[] | undefined;
  translate: TranslateProps;
  searchTitle: string;
  selectedselectedTokuTitles: (TokuItem | null)[];
  currentLanguage: string;
  isListLoading: boolean;
};

export const SelectionModal = ({
  show,
  onClose,
  title,
  handleSearchTitle,
  handleAddWork,
  searchedTitles,
  translate,
  searchTitle,
  selectedselectedTokuTitles,
  currentLanguage,
  isListLoading,
}: SelectionModalProps) => {
  const [alertInfo, setAlertInfo] = useState<{
    message: string;
  } | null>(null);

  const _onClose = useCallback(() => {
    if (typeof onClose === 'function') {
      onClose();
      setAlertInfo(null);
    }
  }, [onClose]);

  const _handleAddWork = useCallback(
    (newItem: TokuItem) => {
      const isDuplicate = selectedselectedTokuTitles.some(
        work => work !== null && work.id === newItem.id,
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
    [handleAddWork, selectedselectedTokuTitles, _onClose, currentLanguage],
  );

  return (
    <>
      <Modal onClose={_onClose} show={show} title={title} translate={translate}>
        <SearchForm handleSearch={handleSearchTitle} translate={translate} />
        <SelectionShowList
          searchedTitles={searchedTitles}
          handleAddWork={_handleAddWork}
          translate={translate}
          searchTitle={searchTitle}
          isListLoading={isListLoading}
        />
      </Modal>
      {alertInfo && (
        <DuplicateErrorAlert
          message={alertInfo.message}
          onClose={() => setAlertInfo(null)}
        />
      )}
    </>
  );
};
