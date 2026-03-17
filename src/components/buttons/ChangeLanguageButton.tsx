import { Button } from './Button';
import type { i18nProps } from '../../dataHook';

type ChangeLanguageButtonProps = {
  i18n: i18nProps;
};

export const ChangeLanguageButton = ({ i18n }: ChangeLanguageButtonProps) => {
  const currentLanguage = i18n.language;

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const buttonConfigs = [
    { label: 'ID', code: 'id' },
    { label: 'EN', code: 'en' },
    { label: 'JP', code: 'ja' },
  ];

  return (
    <div className="flex gap-1 items-center justify-center mb-2">
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
