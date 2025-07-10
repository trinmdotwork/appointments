import store from '@/store';
import {UseAppointmentFormProps} from '@/types/appointment';
import {NavigationProp} from '@react-navigation/native';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

export const RootStackParamList = {
  HomeAppointment: undefined,
  FormAppointment: {} as Partial<UseAppointmentFormProps>,
};

export const BottomSheetScreensParamList = {};

type TRootStackParamList = typeof RootStackParamList;
type TSheetStackParamList = typeof BottomSheetScreensParamList;

type TRootState = ReturnType<typeof store.getState>;
type TAppDispatch = typeof store.dispatch;
type TRootNavigationProp = NavigationProp<TRootStackParamList>;
type TNavigationType = 'navigate' | 'push' | 'replace';
type TAppNavigationOptions = NativeStackNavigationOptions & object;

export type {
  TAppDispatch,
  TAppNavigationOptions,
  TNavigationType,
  TRootNavigationProp,
  TRootStackParamList,
  TRootState,
  TSheetStackParamList,
};
