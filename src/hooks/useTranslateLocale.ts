import {useTranslation} from 'react-i18next';
import {TLanguage} from '@/types/app';

export const useTranslateLocale = (lang: TLanguage) => {
  const {t, i18n} = useTranslation('', {lng: lang});

  return {t, i18n};
};
