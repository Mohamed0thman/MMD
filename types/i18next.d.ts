import locales from '../src/localization/locales';
import translation from '../src/localization/locales/en';

const resources = {
  translation,
} as const;

// const resources = locales as const;

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: typeof resources;
  }
}
