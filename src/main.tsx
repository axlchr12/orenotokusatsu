import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './pages/App';
import './i18n/config';
import { AppProvider } from './context/AppProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider
      handleAddWork={() => {}}
      handleRemoveWork={() => {}}
      handleSearchTitle={() => {}}
      isListError={false}
      isListLoading={false}
      resetSearch={() => {}}
      searchTitle=""
      selectedTokuWorks={[]}
      setSelectedTokuWorks={() => {}}
    >
      <App />
    </AppProvider>
  </StrictMode>,
);
