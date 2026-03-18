import { useMemo } from 'react';
import type { TokuItem } from '../../context';
import type { TranslateProps } from '../../dataHook';
import { OverviewShowDetail } from './OverviewShowDetail';
import { Modal } from '../../components';

type OverviewShowModalProps = {
  show: boolean;
  onClose: () => void;
  title: string;
  translate: TranslateProps;
  selectedTokuTitles: (TokuItem | null)[];
  activeSlot: number | undefined;
  currentLanguage: string;
};

export const OverviewShowModal = ({
  show,
  onClose,
  title,
  translate,
  selectedTokuTitles,
  activeSlot,
  currentLanguage,
}: OverviewShowModalProps) => {
  const tokuTitle = useMemo(() => {
    if (typeof activeSlot === 'number' && selectedTokuTitles) {
      return selectedTokuTitles[activeSlot] || null;
    }
    return null;
  }, [activeSlot, selectedTokuTitles]);

  return (
    <Modal onClose={onClose} show={show} title={title} translate={translate}>
      <OverviewShowDetail
        tokuTitle={tokuTitle}
        currentLanguage={currentLanguage}
      />
    </Modal>
  );
};
