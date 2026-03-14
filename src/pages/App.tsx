import './App.css';
import { Footer } from './footer';
import { Content } from './content';
import { Suspense } from 'react';

export const App = () => {
  return (
    <Suspense fallback="Loading...">
      <Content />
      <Footer />
    </Suspense>
  );
};
