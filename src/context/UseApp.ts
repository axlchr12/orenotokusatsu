import { useCallback, useMemo, useState } from 'react';
import { useTokusatsuData } from '../dataHook';

export type TokuItem = {
  id: number;
  image: string;
  rating: string;
  title: string;
  titleJapanese: string;
  type: string;
  year: string;
};

export type UseAppMethods = {
  selectedTokuWorks: (TokuItem | null)[];
  setSelectedTokuWorks: React.Dispatch<
    React.SetStateAction<(TokuItem | null)[]>
  >;
  handleAddWork: (newItem: TokuItem, index: number) => void;
  handleRemoveWork: (index: number) => void;
  resetSearch: () => void;
  searchedShows?: TokuItem[] | undefined;
  handleSearchTitle: (title: string) => void;
  searchTitle: string;
  isListLoading: boolean;
  isListError: boolean;
};

type UseAppProps = {
  currentLanguage?: string;
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
  } = useTokusatsuData({ query: searchTitle });

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
      return masterListToku?.filter((item: any) =>
        item.titleJapanese?.includes(searchTitle),
      );

    return masterListToku?.filter((item: any) =>
      item.title.toLowerCase().includes(searchTitle.toLowerCase()),
    );
  }, [masterListToku, currentLanguage, searchTitle]);

  return {
    selectedTokuWorks,
    setSelectedTokuWorks,
    handleAddWork,
    handleRemoveWork,
    isListError,
    isListLoading,
    resetSearch,
    searchedShows,
    handleSearchTitle,
    searchTitle,
  };
};
