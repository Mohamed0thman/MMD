import { createTheme, useTheme } from '@shopify/restyle';

const palette = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',

  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  greyLight: '#d6d6d6',
  grey700: '#7A7A7A',

  redLight: '#F44336',

  orangeDark: '#E9742B',

  black: '#0B0B0B',
  white: '#FFFFFF',
};

const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    cardPrimaryBackground: palette.purplePrimary,
    cardRegularBackground: palette.white,
    textInputBorderColor: palette.greyLight,
    textInputBackground: palette.white,
    textInputPlaceholderColor: palette.greyLight,
    textInputLabel: palette.black,
    error: palette.redLight,
    primary: palette.orangeDark,
    transparent: 'transparent',
    ...palette,
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    headingXL: {
      fontSize: 32,
      fontWeight: 'bold',
    },
    headingL: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    headingM: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    headingS: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    headingXS: {
      fontSize: 12,
      fontWeight: 'bold',
    },
    labelL: {
      fontSize: 16,
      fontWeight: 500,
    },
    labelM: {
      fontSize: 14,
      fontWeight: 500,
    },
    labelMB: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    labelS: {
      fontSize: 12,
      fontWeight: 500,
    },
    paragraphsL: {
      fontSize: 16,
      fontWeight: 400,
    },
    paragraphsM: {
      fontSize: 14,
      fontWeight: 400,
    },
    paragraphsS: {
      fontSize: 12,
      fontWeight: 500,
    },
    inputLabel: {
      fontSize: 10,
      color: 'textInputLabel',
      fontWeight: 'bold',
    },
    header: {
      fontWeight: 'bold',
      fontSize: 34,
    },
    headerLight: {
      fontSize: 20,
      fontWeight: 400,
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
    },
    defaults: {
      // We can define a default text variant here.
    },
  },
  borderRadii: {
    s: 4,
    m: 9,
    l: 14,
    xl: 20,
  },
  inputVariants: {
    defaults: {
      // We can define defaults for the variant here.
      // This will be applied after the defaults passed to createVariant and before the variant defined below.
      backgroundColor: 'textInputBackground',
      borderColor: 'textInputBorderColor',
      borderRadius: 'm',
      borderWidth: 1,
    },
    datePicker: {},
    radioBox: {
      borderWidth: 0,
      backgroundColor: 'transparent',
    },
    focused: {},
  },
});

export type Theme = typeof theme;

const useRestyleTheme = () => {
  return useTheme<Theme>();
};

export { theme, useRestyleTheme };
