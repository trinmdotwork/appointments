import i18n from 'i18next';
import 'intl-pluralrules';
import {initReactI18next} from 'react-i18next';
import {DEFAULT_LANGUAGE, INTERPOLATION, SUPPORTED_LANGUAGES} from './constant';
import {en, vi} from './locales';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    vi: {
      translation: vi,
    },
  },
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: SUPPORTED_LANGUAGES,
  interpolation: INTERPOLATION,
  react: {
    bindI18n: 'languageChanged',
    useSuspense: true,
  },
});

export default i18n;
