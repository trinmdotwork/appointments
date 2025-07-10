export interface Appointment {
  id: string;
  title: string;
  date: string;
  location: string;
  notes: string;
}

export interface UseAppointmentFormProps {
  initialData?: Appointment;
}
