import {
  CommonActions,
  createNavigationContainerRef,
  DrawerActions,
  StackActions,
  PartialState,
  NavigationState,
} from '@react-navigation/native';

import {TRootStackParamList} from '@/navigation';

const navigationRef = createNavigationContainerRef<TRootStackParamList>();

const navigate = (
  name: keyof TRootStackParamList,
  params?: TRootStackParamList[keyof TRootStackParamList],
) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};

const goBack = () => {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
};

const replace = (
  routeName: keyof TRootStackParamList,
  params?: TRootStackParamList[keyof TRootStackParamList],
) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(routeName, params));
  }
};

const push = (
  routeName: keyof TRootStackParamList,
  params?: TRootStackParamList[keyof TRootStackParamList],
) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(routeName, params));
  }
};

const reset = (config: PartialState<NavigationState> | NavigationState) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.reset(config));
  }
};

const pop = (numberPop: number) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.pop(numberPop));
  }
};

const getCurrentRoute = (): string | undefined => {
  if (navigationRef.isReady()) {
    const route = navigationRef.getCurrentRoute();
    return route ? route.name : undefined;
  }
  return undefined;
};

const toggleDrawer = () => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(DrawerActions.toggleDrawer());
  }
};

const closeDrawer = () => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(DrawerActions.closeDrawer());
  }
};

const openDrawer = () => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(DrawerActions.openDrawer());
  }
};

const navigationServices = {
  navigationRef,
  navigate,
  goBack,
  reset,
  push,
  replace,
  getCurrentRoute,
  toggleDrawer,
  closeDrawer,
  openDrawer,
  pop,
};

export {navigationServices};
