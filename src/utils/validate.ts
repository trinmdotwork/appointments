import {ValidateValueOptions} from '@/types/app';

const validURL = (url: string): boolean => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  );
  return !!pattern.test(url);
};

const validEmail = (email: string): boolean => {
  const expression = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return expression.test(email.toLowerCase());
};

const validPhone = (phone: string): boolean => {
  const expression = /^\(?([0-9]{3})\)?[-.]?([0-9]{3})[-.]?([0-9]{4})$/;
  return expression.test(phone.toLowerCase());
};

export const validateValue = ({
  form,
  rules,
}: ValidateValueOptions): Record<string, string> => {
  const errors: Record<string, string> = {};

  for (const rule of rules) {
    const value = form[rule.field];

    if (!rule.validate(value)) {
      errors[rule.field] = rule.errorMessage;
    }
  }

  return errors;
};

export {validURL, validEmail, validPhone};
