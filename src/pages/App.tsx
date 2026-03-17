import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import { Footer } from './footer';
import { Content } from './content';
import { Suspense } from 'react';

const queryClient = new QueryClient();

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
