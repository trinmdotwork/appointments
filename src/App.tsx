import {navigationServices} from '@/utils/navigationServices';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import LoadingProvider from './components/LoadingProvider';
import PopupProvider from './components/PopupProvider';
import {RootNavigator} from './navigation';
import store from './store';

const App = (props: any) => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{flex: 1}}>
          <NavigationContainer ref={navigationServices.navigationRef}>
            <>
              <LoadingProvider />
              <PopupProvider />
              <RootNavigator {...props} />
            </>
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
