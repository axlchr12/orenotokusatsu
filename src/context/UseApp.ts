import { useCallback, useMemo, useState } from 'react';
import { useTokusatsuData } from '../dataHook';

export type TokuItem = {
  id: string;
  title: string;
  titleJapanese?: string;
  image: string | null;
  source?: string;
};

export type UseAppMethods = {
  selectedTokuWorks: (TokuItem | null)[];
  setSelectedTokuWorks: React.Dispatch<
    React.SetStateAction<(TokuItem | null)[]>
  >;
  handleAddWork: (newItem: TokuItem, index: number) => void;
  handleRemoveWork: (index: number) => void;
  masterListToku: TokuItem[] | undefined;
  isListLoading: boolean;
  isListError: boolean;
  resetSearch: () => void;
  searchedShows?: TokuItem[] | undefined;
  handleSearchTitle: (title: string) => void;
  searchTitle: string;
};

type UseAppProps = {
  currentLanguage: string;
};

export const useApp = ({ currentLanguage }: UseAppProps): UseAppMethods => {
  const [selectedTokuWorks, setSelectedTokuWorks] = useState<
    (TokuItem | null)[]
  >(Array(12).fill(null));
  const [searchTitle, setSearchTitle] = useState<string>('');

  const {
    data: masterListToku,
    isLoading: isListLoading,
    isError: isListError,
  } = useTokusatsuData();

  const resetSearch = useCallback(() => {
    setSearchTitle('');
  }, []);

  const handleAddWork = (newItem: TokuItem, index: number) => {
    setSelectedTokuWorks(prev => {
      const copy = [...prev];
      copy[index] = newItem;
      return copy;
    });
  };

  const handleRemoveWork = (index: number) => {
    setSelectedTokuWorks(prev => {
      const copy = [...prev];
      copy[index] = null;
      return copy;
    });
  };

  const handleSearchTitle = (title: string) => {
    setSearchTitle(title);
  };

  const searchedShows = useMemo(() => {
    if (!masterListToku || !searchTitle) return [];

    if (currentLanguage === 'ja')
      return masterListToku?.filter(item =>
        item.titleJapanese?.includes(searchTitle),
      );

    return masterListToku?.filter(item =>
      item.title.toLowerCase().includes(searchTitle.toLowerCase()),
    );
  }, [masterListToku, currentLanguage, searchTitle]);

  return {
    selectedTokuWorks,
    setSelectedTokuWorks,
    handleAddWork,
    handleRemoveWork,
    masterListToku,
    isListError,
    isListLoading,
    resetSearch,
    searchedShows,
    handleSearchTitle,
    searchTitle,
  };
};
