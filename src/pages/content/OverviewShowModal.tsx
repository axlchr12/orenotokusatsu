import { useCallback, useMemo } from 'react';
import type { TokuItem } from '../../context';
import type { TranslateProps } from '../../dataHook';
import { OverviewShowDetail } from './OverviewShowDetail';
import { Modal } from '../../components';

type OverviewShowModalProps = {
  show: boolean;
  onClose: () => void;
  title: string;
  translate: TranslateProps;
  selectedselectedTokuTitles: (TokuItem | null)[];
  activeSlot: number | undefined;
  currentLanguage: string;
};

export const OverviewShowModal = ({
  show,
  onClose,
  title,
  translate,
  selectedselectedTokuTitles,
  activeSlot,
  currentLanguage,
}: OverviewShowModalProps) => {
  const _onClose = useCallback(() => {
    if (typeof onClose === 'function') {
      onClose();
    }
  }, [onClose]);

  const tokuShow = useMemo(() => {
    if (typeof activeSlot === 'number' && selectedselectedTokuTitles) {
      return selectedselectedTokuTitles[activeSlot];
    }

    return null;
  }, [activeSlot, selectedselectedTokuTitles]);

  return (
    <Modal onClose={_onClose} show={show} title={title} translate={translate}>
      <OverviewShowDetail
        tokuShow={tokuShow}
        currentLanguage={currentLanguage}
      />
    </Modal>
  );
};
