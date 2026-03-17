import { useTranslation, Trans } from 'react-i18next';
import { ChangeLanguageButton } from '../../components';
import { TitleSelectionList } from './TitleSelectionList';
import { ExportGrid } from './ExportGrid';
import { useRef } from 'react';
import { useApp } from '../../context';

export const Content = () => {
  const { t: translate, i18n } = useTranslation();
  const contentRef = useRef<HTMLDivElement>(null);

  const currentLanguage = i18n.language;

  const appState = useApp({ currentLanguage });

  return (
    <>
      <section id="mainContent" ref={contentRef}>
        <div id="heading">
          <h1 className="mb-1 text-2xl sm:text-4xl tracking-wide text-amber-700 ">
            <Trans
              i18nKey="title"
              components={[
                <mark
                  key="0"
                  className="px-2 pb-0.5 text-white bg-teal-600 rounded-xl"
                />,
              ]}
            />
          </h1>
          <span className="text-black text-xs">{translate('description')}</span>
        </div>
        <ChangeLanguageButton i18n={i18n} />
        <TitleSelectionList
          translate={translate}
          appState={appState}
          currentLanguage={currentLanguage}
        />
      </section>
      <div id="exportGrid" className="flex justify-center mb-5">
        <ExportGrid
          translate={translate}
          contentRef={contentRef}
          selectedWorks={appState?.selectedTokuWorks}
        />
      </div>
    </>
  );
};
