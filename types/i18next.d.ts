import locales from '../src/localization/locales';
import en from '../src/localization/locales/en/app.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: typeof en;
    };
  }
}
