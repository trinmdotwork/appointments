import {useAppDispatch, useAppSelector} from '@/hooks/redux';
import {appointmentsSelector} from '@/store/appointments';
import {APPOINTMENTS_THUNKS} from '@/store/appointments/constant';
import {
  addAppointmentThunk,
  deleteAppointmentThunk,
  fetchAppointmentsThunk,
  updateAppointmentThunk,
} from '@/store/appointments/thunk';
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';

export const useAppointment = () => {
  const dispatch = useAppDispatch();
  const appointments = useAppSelector(appointmentsSelector);
  const fetchLoading =
    useAppSelector(
      state => state.app.loadingComponent[APPOINTMENTS_THUNKS.FETCH],
    ) || false;
  const {t} = useTranslation();

  const addAppointment = () => {
    dispatch(
      addAppointmentThunk({
        title: 'Lunch',
        date: new Date().toISOString(),
        location: 'Cafe',
        notes: 'Catch up',
      }),
    );
  };

  const updateAppointment = () =>
    dispatch(
      updateAppointmentThunk({
        id: '1',
        title: 'Updated title',
        date: new Date().toISOString(),
        location: 'New location',
        notes: 'Updated notes',
      }),
    );

  const deleteAppointment = (id: string) =>
    dispatch(deleteAppointmentThunk(id));

  const fetchAppointments = () => dispatch(fetchAppointmentsThunk());

  useEffect(() => {
    fetchAppointments();
  }, []);

  return {
    state: {appointments, fetchLoading},
    handler: {
      addAppointment,
      updateAppointment,
      deleteAppointment,
      fetchAppointments,
      t,
    },
  };
};
