import { useTranslation } from 'react-i18next';

export const ChangeLanguageButton = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="flex justify-between mt-5 gap-3">
      <button
        onClick={() => changeLanguage('id')}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Bahasa Indonesia
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        English
      </button>
      <button
        onClick={() => changeLanguage('ja')}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        日本語
      </button>
    </div>
  );
};
