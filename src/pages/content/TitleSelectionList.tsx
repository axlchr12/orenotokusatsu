import { useCallback, useState } from 'react';
import { type TokuItem, type UseAppMethods } from '../../context';
import { SelectionModal } from './SelectionModal';
import { SelectionGrid } from './SelectionGrid';
import type { TranslateProps } from '../../dataHook';

type TitleSelectionListProps = {
  translate: TranslateProps;
  appState: UseAppMethods;
  currentLanguage: string;
};

export const TitleSelectionList = ({
  translate,
  appState,
  currentLanguage,
}: TitleSelectionListProps) => {
  const {
    selectedTokuWorks,
    handleRemoveWork,
    handleAddWork,
    resetSearch,
    handleSearchTitle,
    searchTitle,
    searchedShows,
  } = appState;

  const [showModal, setShowModal] = useState<boolean>(false);
  const [activeSlot, setActiveSlot] = useState<number | undefined>(undefined);

  const onOpenModal = (index: number) => {
    setShowModal(true);
    setActiveSlot(index);
  };

  const onCloseModal = () => {
    setActiveSlot(undefined);
    setShowModal(false);
    resetSearch();
  };

  const _handleAddWork = useCallback(
    (newItem: TokuItem) => {
      if (typeof handleAddWork === 'function') {
        handleAddWork(newItem, activeSlot!);
      }
      return undefined;
    },
    [handleAddWork, activeSlot],
  );

  return (
    <>
      <SelectionGrid
        selectedTokuWorks={selectedTokuWorks}
        handleRemoveWork={handleRemoveWork}
        onOpenModal={onOpenModal}
        translate={translate}
        currentLanguage={currentLanguage}
      />
      <SelectionModal
        show={showModal}
        onClose={onCloseModal}
        title="titleModal"
        handleAddWork={_handleAddWork}
        handleSearchTitle={handleSearchTitle}
        searchedShows={searchedShows}
        translate={translate}
        searchTitle={searchTitle}
        selectedTokuWorks={selectedTokuWorks}
        currentLanguage={currentLanguage}
      />
    </>
  );
};
