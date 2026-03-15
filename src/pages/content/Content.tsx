import { useTranslation } from 'react-i18next';
import { ChangeLanguageButton } from '../../components';

export const Content = () => {
  const { t: translate } = useTranslation();
  return (
    <>
      <section id="mainContent">
        <div>
          <h1>Get started</h1>
          <ChangeLanguageButton />
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
          <p>test cenah {translate('welcome')}</p>
        </div>
      </section>
    </>
  );
};
