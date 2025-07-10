import Container from '@/components/Container';
import {FormDatePicker} from '@/components/FormDatePicker';
import {FormInput} from '@/components/FormInput';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useAppointmentForm} from './hooks';

const Form = () => {
  const {
    state: {
      form: {date, location, notes, title},
      initialData,
    },
    handler: {
      handleChange,
      handleSubmit,
      onDateChange,
      getError,
      handleFocus,
      t,
    },
  } = useAppointmentForm();

  return (
    <Container
      contentContainerStyle={styles.container}
      headerProps={{
        title: t(initialData?.id ? 'updateAppointment' : 'addAppointment'),
      }}>
      <FormInput
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        label={t('form.title')}
        placeholder="e.g. Dentist Appointment"
        field="title"
        value={title}
        onChangeInput={text => handleChange('title', text)}
        onFocusInput={() => handleFocus('title')}
        error={getError('title')}
        required
      />

      <FormDatePicker
        label={t('form.date')}
        required
        value={date ? new Date(date) : undefined}
        onChangeDate={onDateChange}
        error={getError('date')}
        onFocusInput={() => handleFocus('date')}
        placeholder="e.g. 10/10/2025"
      />

      <FormInput
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        label={t('form.location')}
        placeholder="e.g. Clinic"
        field="location"
        value={location}
        onChangeInput={text => handleChange('location', text)}
        onFocusInput={() => handleFocus('location')}
        error={getError('location')}
        required
      />

      <FormInput
        containerStyle={styles.inputContainer}
        inputStyle={[styles.input, styles.area]}
        label={t('form.notes')}
        field="notes"
        value={notes}
        onChangeInput={text => handleChange('notes', text)}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{t('button.add')}</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default Form;
