import React from 'react';
import {Text, TextInput, TextInputProps, View, StyleSheet} from 'react-native';

interface FormInputProps extends TextInputProps {
  label?: string;
  error?: string;
  field: string;
  value: string;
  onChangeInput: (value: string) => void;
  onFocusInput?: (field: string) => void;
  multiline?: boolean;
  containerStyle?: object;
  inputStyle?: object;
  required?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  field,
  value,
  onChangeInput,
  onFocusInput,
  multiline = false,
  containerStyle,
  inputStyle,
  required,
  ...rest
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {!!label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}>*</Text>}
        </Text>
      )}

      <TextInput
        style={[
          styles.input,
          multiline && styles.textArea,
          inputStyle,
          !!error && styles.inputError,
        ]}
        value={value}
        multiline={multiline}
        onChangeText={text => onChangeInput(text)}
        onBlur={() => onFocusInput?.(field)}
        {...rest}
      />

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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  required: {
    color: 'red',
  },
});
