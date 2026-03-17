import { useTranslation, Trans } from 'react-i18next';
import { ChangeLanguageButton } from '../../components';
import { TitleSelectionList } from './TitleSelectionList';

export const Content = () => {
  const { t: translate, i18n } = useTranslation();
  return (
    <>
      <section id="mainContent">
        <div id="heading">
          <h1 className="mb-1 text-2xl sm:text-4xl tracking-wide text-amber-700 ">
            <Trans
              i18nKey="title"
              components={[
                <mark
                  key="0"
                  className="px-2 pb-0.5 text-white bg-teal-600 rounded"
                />,
              ]}
            />
          </h1>
          <span className="text-black text-xs">{translate('description')}</span>
        </div>
        <ChangeLanguageButton i18n={i18n} />
        <TitleSelectionList i18n={i18n} translate={translate} />
      </section>
    </>
  );
};
