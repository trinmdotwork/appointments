import {useNavigationState} from '@react-navigation/native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Header, {IHeader} from '@/components/Header';
import {SPACING} from '@/constants/theme';

const useHeader = () => {
  const routes = useNavigationState(state => state.routes);

  const dismissMiniAppProps: Pick<
    IHeader,
    'dismissMiniApp' | 'isDismissingMiniApp'
  > = {
    dismissMiniApp: () => {},
    isDismissingMiniApp: routes.length === 1,
  };

  return {
    state: {routes, routesCount: routes.length},
    components: {
      Header: (props: IHeader) => (
        <Header {...dismissMiniAppProps} {...props} />
      ),
    },
  };
};

const useLayout = () => {
  const insets = useSafeAreaInsets();
  const bottom = insets.bottom <= 2 ? SPACING.L : SPACING.XS + insets.bottom;

  return {bottom, insets};
};

export {useHeader, useLayout};
