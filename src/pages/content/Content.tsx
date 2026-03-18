import { useTranslation, Trans } from 'react-i18next';
import { ChangeLanguageButton } from '../../components';
import { TitleSelectionList } from './TitleSelectionList';
import { ExportGrid } from './ExportGrid';
import { useRef } from 'react';
import { useApp } from '../../context';
const appName = import.meta.env.APP_NAME;
const appVersion = import.meta.env.APP_VERSION;

export const Content = () => {
  const { t: translate, i18n } = useTranslation();
  const contentRef = useRef<HTMLDivElement>(null);

  const currentLanguage = i18n.language;

  const appState = useApp({ currentLanguage });

  return (
    <>
      <section id="mainContent" ref={contentRef}>
        <div id="heading">
          <h1 className="pt-10 pb-2 text-2xl sm:text-4xl tracking-wide text-amber-700 ">
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
        <div className="watermark-only text-center">
          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold font-mono opacity-80">
            {translate('watermark', { appName, appVersion })}
          </span>
        </div>
      </section>
      <div id="exportGrid" className="flex justify-center mt-5">
        <ExportGrid
          translate={translate}
          contentRef={contentRef}
          selectedWorks={appState?.selectedTokuTitles}
        />
      </div>
    </>
  );
};
