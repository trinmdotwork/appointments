import { useNavigation } from '@react-navigation/native';

import { TRootNavigationProp } from './types';

export { default as RootNavigator } from './RootNavigator';
export * from './types';

export const useAppNavigation = () => {
  const navigate = useNavigation<TRootNavigationProp>();
  return navigate;
};
