import {createSlice} from '@reduxjs/toolkit';
import {
  addAppointmentThunk,
  deleteAppointmentThunk,
  fetchAppointmentsThunk,
  updateAppointmentThunk,
} from './thunk';
import {AppointmentState} from './types';

const initialState: AppointmentState = {
  appointments: [],
  error: null,
};

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Fetch
    builder.addCase(fetchAppointmentsThunk.pending, state => {
      state.error = null;
    });
    builder.addCase(fetchAppointmentsThunk.fulfilled, (state, action) => {
      state.appointments = action.payload;
    });
    builder.addCase(fetchAppointmentsThunk.rejected, (state, action) => {
      state.error = action.error.message ?? 'Error fetching appointments';
    });
    // Add
    builder.addCase(addAppointmentThunk.pending, state => {
      state.error = null;
    });
    builder.addCase(addAppointmentThunk.fulfilled, (state, action) => {
      state.appointments.push(action.payload);
    });
    builder.addCase(addAppointmentThunk.rejected, (state, action) => {
      state.error = action.error.message ?? 'Error adding appointment';
    });
    // Update
    builder.addCase(updateAppointmentThunk.pending, state => {
      state.error = null;
    });
    builder.addCase(updateAppointmentThunk.fulfilled, (state, action) => {
      const index = state.appointments.findIndex(
        a => a.id === action.payload.id,
      );
      if (index !== -1) {
        state.appointments[index] = action.payload;
      }
    });
    builder.addCase(updateAppointmentThunk.rejected, (state, action) => {
      state.error = action.error.message ?? 'Error updating appointment';
    });
    // Delete
    builder.addCase(deleteAppointmentThunk.pending, state => {
      state.error = null;
    });
    builder.addCase(deleteAppointmentThunk.fulfilled, (state, action) => {
      state.appointments = state.appointments.filter(
        a => a.id !== action.payload,
      );
    });
    builder.addCase(deleteAppointmentThunk.rejected, (state, action) => {
      state.error = action.error.message ?? 'Error deleting appointment';
    });
  },
  selectors: {
    appointmentsSelector: state => state.appointments,
    appointmentErrorSelector: state => state.error,
  },
});
export const {appointmentErrorSelector, appointmentsSelector} =
  appointmentsSlice.selectors;

export const {} = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
