import { createTheme, useTheme } from '@shopify/restyle';

const palette = {
  bluePrimary: '#0477C0',
  blueSecondary: '#5F93D0',

  pinkPrimary: '#F16C91',
  pinkSecondary: '#FAC4D3',

  success100: '#E3FCEC',
  success300: '#92F2B8',
  success500: '#067647',

  negative100: '#FFECEB',
  negative300: '#E7A29D',
  negative500: '#AD342B',
  negative600: '#932C25',

  gray50: '#FFFFFF',
  gray100: '#F7F7F7',
  gray200: '#EBEBEB',
  gray300: '#0A0A0A1F',
  gray400: '#AFAFAF',
  gray700: '#7A7A7A',
  gray800: '#666666',
  gray900: '#0A0A0A',

  black: '#000000',
  white: '#FFFFFF',

  transparent: 'transparent',
};

const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    primaryBackground: palette.bluePrimary,
    secondaryBackground: palette.blueSecondary,
    cardRegularBackground: palette.white,
    textInputBackground: palette.white,
    textInputLabel: palette.black,
    error: palette.negative500,
    ...palette,
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    auto: 'auto',
  },
  buttonVariants: {
    primary: {
      backgroundColor: 'primaryBackground',
    },
    secondary: {
      backgroundColor: 'transparent',
      borderColor: 'primaryBackground',
      borderWidth: 1,
    },
    negative: {
      backgroundColor: 'negative500',
    },
    negativeTertiary: {
      backgroundColor: 'transparent',
    },
  },
  buttonVariantsDisabled: {
    primary: {
      backgroundColor: 'gray300',
    },
    secondary: {
      backgroundColor: 'transparent',
      borderColor: 'gray300',
    },
    negative: {
      backgroundColor: 'gray100',
    },
    negativeTertiary: {
      backgroundColor: 'transparent',
    },
  },
  buttonVariantsPressed: {
    //CAUTION: Please add colors from palette not the attributes inside theme
    primary: {
      backgroundColor: 'primaryBackground',
    },
    secondary: {
      backgroundColor: palette.white,
      borderColor: 'primaryBackground',
    },
    negative: {
      backgroundColor: palette.negative600,
    },
    negativeTertiary: {
      backgroundColor: palette.negative100,
    },
  },
  buttonTextVariants: {
    defaults: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    primary: {
      color: 'white',
    },
    secondary: {
      color: 'primaryBackground',
    },
    negative: {
      color: 'white',
    },
    negativeTertiary: {
      color: 'negative500',
    },
    disabled: {
      color: 'gray400',
    },
  },

  textVariants: {
    defaults: {},
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
      fontWeight: '500',
    },
    labelM: {
      fontSize: 14,
      fontWeight: '500',
    },
    labelMB: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    labelS: {
      fontSize: 12,
      fontWeight: '500',
    },
    paragraphsL: {
      fontSize: 16,
      fontWeight: '400',
    },
    paragraphsM: {
      fontSize: 14,
      fontWeight: '400',
    },
    paragraphsS: {
      fontSize: 12,
      fontWeight: '500',
    },
  },
  borderRadii: {
    s: 4,
    m: 8,
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
  iconVariants: { default: {} },
});

export type Theme = typeof theme;

const pinkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    primaryBackground: palette.pinkPrimary,
    secondaryBackground: palette.pinkSecondary,
  },
};

const useRestyleTheme = () => {
  return useTheme<Theme>();
};

export { theme, pinkTheme, useRestyleTheme };
