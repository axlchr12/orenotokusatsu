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
  overview: string;
  overviewJp: string;
};

export type UseAppMethods = {
  selectedselectedTokuTitles: (TokuItem | null)[];
  setSelectedselectedTokuTitles: React.Dispatch<
    React.SetStateAction<(TokuItem | null)[]>
  >;
  handleAddWork: (newItem: TokuItem, index: number) => void;
  handleRemoveWork: (index: number) => void;
  resetSearch: () => void;
  searchedTitles?: TokuItem[] | undefined;
  handleSearchTitle: (title: string) => void;
  searchTitle: string;
  isListLoading: boolean;
  isListError: boolean;
};

type UseAppProps = {
  currentLanguage?: string;
};

export const useApp = ({ currentLanguage }: UseAppProps): UseAppMethods => {
  const [selectedselectedTokuTitles, setSelectedselectedTokuTitles] = useState<
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
    setSelectedselectedTokuTitles(prev => {
      const copy = [...prev];
      copy[index] = newItem;
      return copy;
    });
  };

  const handleRemoveWork = (index: number) => {
    setSelectedselectedTokuTitles(prev => {
      const copy = [...prev];
      copy[index] = null;
      return copy;
    });
  };

  const handleSearchTitle = (title: string) => {
    setSearchTitle(title);
  };

  const searchedTitles = useMemo(() => {
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
    selectedselectedTokuTitles,
    setSelectedselectedTokuTitles,
    handleAddWork,
    handleRemoveWork,
    isListError,
    isListLoading,
    resetSearch,
    searchedTitles,
    handleSearchTitle,
    searchTitle,
  };
};
