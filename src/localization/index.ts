import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import locales from './locales';

import en from './locales/en/app.json';
import ar from './locales/ar/app.json';

export const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
} as const;

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  fallbackLng: 'en',
  lng: 'en', // Default language
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
