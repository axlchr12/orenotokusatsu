import { useTranslation, Trans } from 'react-i18next';
import { ChangeLanguageButton } from '../../components';

export const Content = () => {
  const { t: translate } = useTranslation();
  return (
    <>
      <section id="mainContent">
        <div id="heading">
          <h1 className="mb-2 text-4xl tracking-wide text-amber-700">
            <Trans
              i18nKey="title"
              components={[
                <mark
                  key="0"
                  className="px-2 pb-0.5 text-black bg-teal-500 rounded-lg"
                />,
              ]}
            />
          </h1>
          <span className="text-black text-sm">{translate('description')}</span>
        </div>
        <ChangeLanguageButton />
      </section>
    </>
  );
};
