import {Appointment} from '@/types/appointment';

export interface AppointmentState {
  appointments: Appointment[];
  error: string | null;
}
