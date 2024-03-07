import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import ar from './ar.json';
import { useSettingStore } from '../store/settingStore';
import * as RNLocalize from 'react-native-localize';

export const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
} as const;

export async function initI18Next() {
  await i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources,
    lng:
      useSettingStore.getState().lang ||
      RNLocalize.getLocales()[0].languageCode, // Default language
    supportedLngs: ['ar', 'en'],
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
  });
}
export default i18n;
