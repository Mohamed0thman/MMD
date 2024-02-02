import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { OnboardingScreen, WelcomeScreen } from './screens';

type OnboardingNavigationScreenParamsList = {
  Welcome: undefined;
  Onboarding: undefined;
};

const OnboardingNavigationScreens: {
  name: keyof OnboardingNavigationScreenParamsList;
  component: React.ComponentType<any>;
  options?: NativeStackNavigationOptions;
}[] = [
  {
    name: 'Welcome',
    component: WelcomeScreen,
  },

  {
    name: 'Onboarding',
    component: OnboardingScreen,
  },
];

export {
  OnboardingNavigationScreens,
  type OnboardingNavigationScreenParamsList,
};
