import { useState } from 'react';

export type UseAppMethods = {
  partnerId: string | undefined;
  setPartnerId: React.Dispatch<React.SetStateAction<string>>;
};

export const UseApp = (): UseAppMethods => {
  const [partnerId, setPartnerId] = useState<string>('2');
  return { partnerId, setPartnerId };
};
