import React from 'react';
import type { PropsWithChildren } from 'react';
import type { UseAppMethods } from './UseApp';

export const AppContext = React.createContext<UseAppMethods | {}>({});

export const useAppContext = () =>
  React.useContext(AppContext) as UseAppMethods;

export type AppProviderProps = UseAppMethods & {};

export function AppProvider({
  children,
  ...props
}: PropsWithChildren<AppProviderProps>) {
  return <AppContext.Provider value={props}>{children}</AppContext.Provider>;
}
