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
  selectedTokuTitles: (TokuItem | null)[];
  setSelectedTokuTitles: React.Dispatch<
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
  const [selectedTokuTitles, setSelectedTokuTitles] = useState<
    (TokuItem | null)[]
  >(Array(12).fill(null));
  const [searchTitle, setSearchTitle] = useState<string>('');

  const {
    data: masterListToku,
    isLoading: isListLoading,
    isError: isListError,
  } = useTokusatsuData({ query: searchTitle });

  //

  const resetSearch = useCallback(() => {
    setSearchTitle('');
  }, []);

  const handleAddWork = useCallback((newItem: TokuItem, index: number) => {
    setSelectedTokuTitles(prev => {
      const copy = [...prev];
      copy[index] = newItem;
      return copy;
    });
  }, []);

  const handleRemoveWork = useCallback((index: number) => {
    setSelectedTokuTitles(prev => {
      const copy = [...prev];
      copy[index] = null;
      return copy;
    });
  }, []);

  const handleSearchTitle = useCallback((title: string) => {
    setSearchTitle(title);
  }, []);

  const searchedTitles = useMemo(() => {
    if (!masterListToku || !searchTitle) return [];

    if (currentLanguage === 'ja')
      return masterListToku.filter((item: any) =>
        item.titleJapanese?.includes(searchTitle),
      );

    return masterListToku?.filter((item: any) =>
      item.title.toLowerCase().includes(searchTitle.toLowerCase()),
    );
  }, [masterListToku, currentLanguage, searchTitle]);

  return {
    selectedTokuTitles,
    setSelectedTokuTitles,
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
