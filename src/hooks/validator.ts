import {ValidationRule} from '@/types/app';
import {useEffect, useState} from 'react';

export const useFormValidator = (
  form: Record<string, any>,
  rules: ValidationRule[],
) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleFocus = (field: string) => {
    setTouched(prev => ({
      ...prev,
      [field]: true,
    }));
  };

  const getError = (field: string): string | undefined => {
    if (!touched[field]) {
      return undefined;
    }
    return errors[field];
  };

  useEffect(() => {
    const newErrors: Record<string, string> = {};

    for (const rule of rules) {
      const value = form[rule.field];
      if (!rule.validate(value)) {
        newErrors[rule.field] = rule.errorMessage;
      }
    }

    setErrors(newErrors);
  }, [form, rules]);

  const hasErrors = Object.keys(errors).length > 0;

  return {
    state: {
      errors,
      touched,
      hasErrors,
    },
    handler: {
      handleFocus,
      getError,
    },
  };
};
