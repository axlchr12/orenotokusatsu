import { useTranslation } from 'react-i18next';
import { Button } from './Button';

export const ChangeLanguageButton = () => {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language;

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const buttonConfigs = [
    { label: 'Bahasa Indonesia', code: 'id' },
    { label: 'English', code: 'en' },
    { label: '日本語', code: 'ja' },
  ];

  return (
    <div className="flex gap-2 justify-center mb-2">
      {buttonConfigs.map(config => (
        <Button
          key={config.code}
          onClick={() => changeLanguage(config.code)}
          isActive={currentLanguage === config.code}
        >
          {config.label}
        </Button>
      ))}
    </div>
  );
};
