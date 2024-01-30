import locales from '../src/localization/locales';

const resources = locals as const;

// const resources = locales as const;

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: typeof resources;
  }
}
