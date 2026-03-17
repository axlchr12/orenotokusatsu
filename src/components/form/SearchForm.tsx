import { useState } from 'react';
import type { TranslateProps } from '../../dataHook';

type SearchFormProps = {
  handleSearch: (title: string) => void;
  translate: TranslateProps;
};

export const SearchForm = ({ handleSearch, translate }: SearchFormProps) => {
  const [inputValue, setInputValue] = useState<string>('');

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  return (
    <div className="relative mb-5">
      <div className="flex w-full">
        <div className="relative flex-1">
          <input
            type="text"
            className="block w-full px-4 py-2.5 border border-gray-300 rounded-l-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-sky-500 focus:z-10 transition-all sm:text-sm"
            placeholder={translate('searchPlaceholder')}
            onChange={onChangeText}
          />
        </div>

        <button
          type="button"
          className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-sm font-bold rounded-r-xl border border-sky-600 transition-all shadow-xl active:scale-75 focus:z-10"
          onClick={() => handleSearch(inputValue)}
        >
          {translate('search')}
        </button>
      </div>
    </div>
  );
};
