import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
  AndroidNativeProps,
  IOSNativeProps,
} from '@react-native-community/datetimepicker';

type ExtraProps = Partial<AndroidNativeProps & IOSNativeProps>;

interface FormDatePickerProps extends ExtraProps {
  label?: string;
  required?: boolean;
  value?: Date;
  onChangeDate: (date: Date) => void;
  error?: string;
  placeholder?: string;
  onFocusInput?: () => void;
}

export const FormDatePicker: React.FC<FormDatePickerProps> = ({
  label,
  required = false,
  value,
  onChangeDate,
  error,
  placeholder = 'Select date',
  mode = 'date',
  display = 'default',
  onFocusInput,
  ...rest
}) => {
  const [show, setShow] = useState(false);

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      if (event.type === 'dismissed') {
        setShow(false);
        onFocusInput?.();
        return;
      }
    }
    if (selectedDate) {
      onChangeDate?.(selectedDate);
      setShow(false);
      onFocusInput?.();
    }
  };

  return (
    <View style={styles.container}>
      {!!label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}>*</Text>}
        </Text>
      )}

      <TouchableOpacity
        style={[styles.input, !!error && styles.inputError]}
        onPress={() => setShow(true)}>
        <Text style={value ? styles.text : styles.placeholder}>
          {value ? value.toLocaleDateString() : placeholder}
        </Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={value ?? new Date()}
          mode={mode}
          display={display}
          onChange={handleChange}
          {...rest}
        />
      )}

      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    fontWeight: '500',
    marginBottom: 4,
    fontSize: 14,
  },
  required: {
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    color: '#000',
  },
  placeholder: {
    fontWeight: '500',
    marginBottom: 4,
    fontSize: 14,
  },
  inputError: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});
