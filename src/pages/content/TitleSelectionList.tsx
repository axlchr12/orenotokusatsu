import { UseApp } from '../../context';

export const TitleSelectionList = () => {
  const { partnerId } = UseApp();

  return <>test cenah {partnerId}</>;
};
