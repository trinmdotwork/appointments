import {NAVIGATION_OPTIONS} from '@/config/navigation';
import {TRootStackParamList} from '@/navigation/types';
import {FormAppointment, HomeAppointment} from '@/screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

const Stack = createNativeStackNavigator<TRootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...NAVIGATION_OPTIONS,
      }}>
      <Stack.Screen name="HomeAppointment" component={HomeAppointment} />
      <Stack.Screen name="FormAppointment" component={FormAppointment} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
