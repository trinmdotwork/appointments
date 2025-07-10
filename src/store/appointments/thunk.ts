import {Appointment} from '@/types/appointment';
import {delay} from '@/utils/common';
import {createAsyncThunk, nanoid} from '@reduxjs/toolkit';
import {hideLoading, showLoading} from '../app';
import {APPOINTMENTS_THUNKS} from './constant';

export const fetchAppointmentsThunk = createAsyncThunk<Appointment[]>(
  APPOINTMENTS_THUNKS.FETCH,
  async () => {
    await delay(1000);
    return [
      {
        id: '1',
        title: 'Dentist Appointment',
        date: new Date().toISOString(),
        location: 'Smile Clinic',
        notes: 'Check-up',
      },
      {
        id: '2',
        title: 'Team Meeting',
        date: new Date(Date.now() + 86400000).toISOString(),
        location: 'Office',
        notes: 'Monthly update',
      },
    ];
  },
);

export const addAppointmentThunk = createAsyncThunk<
  Appointment,
  Omit<Appointment, 'id'>
>(APPOINTMENTS_THUNKS.ADD, async (data, thunkAPI) => {
  try {
    thunkAPI.dispatch(showLoading());
    await delay(1000);
    return {...data, id: nanoid()};
  } catch (error) {
    throw error;
  } finally {
    thunkAPI.dispatch(hideLoading());
  }
});

export const updateAppointmentThunk = createAsyncThunk<
  Appointment,
  Appointment
>(APPOINTMENTS_THUNKS.UPDATE, async (data, thunkAPI) => {
  try {
    thunkAPI.dispatch(showLoading());
    await delay(1000);
    return data;
  } catch (error) {
    throw error;
  } finally {
    thunkAPI.dispatch(hideLoading());
  }
});

export const deleteAppointmentThunk = createAsyncThunk<string, string>(
  APPOINTMENTS_THUNKS.DELETE,
  async (id, thunkAPI) => {
    try {
      thunkAPI.dispatch(showLoading());
      await delay(1000);
      return id;
    } catch (error) {
      throw error;
    } finally {
      thunkAPI.dispatch(hideLoading());
    }
  },
);
