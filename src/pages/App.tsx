import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import { Footer } from './footer';
import { Content } from './content';
import { Suspense } from 'react';
import LogRocket from 'logrocket';

const queryClient = new QueryClient();

LogRocket.init('fej0iv/orenotokusatsu');

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback="Loading...">
        <Content />
        <Footer />
      </Suspense>
    </QueryClientProvider>
  );
};
