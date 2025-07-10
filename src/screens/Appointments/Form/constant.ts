import {Rules} from '@/types/app';
import {FormType} from './types';
import i18n from '@/i18n';

export const rules: Rules<FormType>[] = [
  {
    field: 'title',
    validate: v => !!v,
    errorMessage: i18n.t('form.title.required'),
  },
  {
    field: 'date',
    validate: v => !!v,
    errorMessage: i18n.t('form.date.required'),
  },
  {
    field: 'location',
    validate: v => !!v,
    errorMessage: i18n.t('form.location.required'),
  },
];
