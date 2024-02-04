import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import enapp from './locales/en/app.json';
import arapp from './locales/ar/app.json';

export const locales = {
  en: {
    translation: enapp,
  },

  ar: {
    translation: arapp,
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: locales,
  fallbackLng: 'en',
  lng: 'en', // Default language
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
