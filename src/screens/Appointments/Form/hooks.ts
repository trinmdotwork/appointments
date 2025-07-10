import {useAppDispatch} from '@/hooks/redux';
import {useFormValidator} from '@/hooks/validator';
import {TRootStackParamList} from '@/navigation';
import {hidePopup, showPopup} from '@/store/app';
import {
  addAppointmentThunk,
  updateAppointmentThunk,
} from '@/store/appointments/thunk';
import {getMessage} from '@/utils/errors';
import {navigationServices} from '@/utils/navigationServices';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {rules} from './constant';

export const useAppointmentForm = () => {
  const router = useRoute<RouteProp<TRootStackParamList, 'FormAppointment'>>();
  const {initialData} = router?.params || {};
  const dispatch = useAppDispatch();
  const {t} = useTranslation();

  const [form, setForm] = useState({
    title: initialData?.title ?? '',
    date: initialData?.date ?? '',
    location: initialData?.location ?? '',
    notes: initialData?.notes ?? '',
  });

  const {state, handler} = useFormValidator(form, rules);

  const onDateChange = (selectedDate: Date) => {
    handleChange('date', selectedDate.toISOString());
  };

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (state.hasErrors) {
      dispatch(
        showPopup({
          onActionPress: () => {
            dispatch(hidePopup());
          },
          message: getMessage('ERROR', 'custom', {message: t('form.invalid')}),
          actionButtonText: t('button.close'),
          type: 'failure',
        }),
      );
      return;
    }

    if (initialData?.id) {
      await dispatch(
        updateAppointmentThunk({...form, id: initialData?.id}),
      ).unwrap();
    } else {
      await dispatch(addAppointmentThunk(form)).unwrap();
    }

    dispatch(
      showPopup({
        onActionPress: () => {
          dispatch(hidePopup());
          navigationServices.goBack();
        },
        message: getMessage('SUCCESS', initialData?.id ? 'updated' : 'saved'),
        actionButtonText: t('button.close'),
        type: 'success',
      }),
    );
  };

  return {
    state: {
      ...state,
      form,
      initialData,
    },
    handler: {
      ...handler,
      handleChange,
      handleSubmit,
      onDateChange,
      t,
    },
  };
};
