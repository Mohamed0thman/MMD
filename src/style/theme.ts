import { createTheme, useTheme } from '@shopify/restyle';
import { isIos } from '../utils/platform';

const palette = {
  bluePrimary: '#0477C0',
  blueSecondary: '#5F93D0',

  pinkPrimary: '#F16C91',
  pinkSecondary: '#FAC4D3',

  orange: '#FFA800',
  yellow: '#FFDA55',

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

const fonts = {
  light: isIos ? 'NotoKufiArabic-Regular' : 'NotoKufiArabic-Regular',
  regular: isIos ? 'NotoKufiArabic-Regular' : 'NotoKufiArabic_Regular',
  medium: isIos ? 'NotoKufiArabic_SemiBold' : 'NotoKufiArabic_SemiBold',
  semiBold: isIos ? 'NotoKufiArabic_SemiBold' : 'NotoKufiArabic_SemiBold',
  bold: isIos ? 'NotoKufiArabic-Bold' : 'NotoKufiArabic-Bold',
  black: isIos ? 'NotoKufiArabic-Bold' : 'NotoKufiArabic-Bold',
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
      fontSize: 18,
      fontFamily: fonts.bold,
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
    defaults: {
      fontSize: 14,
      fontFamily: fonts.regular,
      textAlign: 'left',
    },
    headingXL: {
      fontSize: 28,
      fontFamily: fonts.bold,
    },
    headingL: {
      fontSize: 20,
      fontFamily: fonts.bold,
    },
    headingM: {
      fontSize: 16,
      fontFamily: fonts.semiBold,
    },
    headingS: {
      fontSize: 14,
      fontFamily: fonts.semiBold,
    },
    headingXS: {
      fontSize: 12,
      fontFamily: fonts.semiBold,
    },
    labelL: {
      fontSize: 16,
      fontFamily: fonts.semiBold,
    },
    labelM: {
      fontSize: 14,
      fontFamily: fonts.semiBold,
    },
    labelMB: {
      fontSize: 14,
      fontFamily: fonts.bold,
    },
    labelS: {
      fontSize: 12,
      fontFamily: fonts.semiBold,
    },
    paragraphsL: {
      fontSize: 16,
      fontFamily: fonts.regular,
    },
    paragraphsM: {
      fontSize: 14,
      fontFamily: fonts.regular,
    },
    paragraphsS: {
      fontSize: 12,
      fontFamily: fonts.semiBold,
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
  radioIndicatorVariants: {
    defaults: {},
    active: {
      backgroundColor: 'primaryBackground',
    },
    inactive: {
      backgroundColor: 'transparent',
    },
  },
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
