import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { OnboardingScreen, WelcomeScreen } from './screens';
import { BackHeaderIcon } from '../../navigation/components/Header';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

type OnboardingNavigationScreenParamsList = {
  Welcome: undefined;
  SelectAccount: undefined;
};

const OnboardingNavigationScreens: {
  name: keyof OnboardingNavigationScreenParamsList;
  component: React.ComponentType<any>;
  options?: NativeStackNavigationOptions;
}[] = [
  {
    name: 'Welcome',
    component: WelcomeScreen,
    options: { headerShown: false },
  },

  {
    name: 'SelectAccount',
    component: OnboardingScreen,
    options: {
      headerRight: () => BackHeaderIcon({ title: ' الاعداد' }),
      headerLeft: () => <></>,
      headerTitle: '',
    },
  },
];

const Stack = createNativeStackNavigator();

const OnboardingStack = () => {
  return (
    <Stack.Navigator>
      {OnboardingNavigationScreens.map((screen, index) => (
        <Stack.Screen
          key={index}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </Stack.Navigator>
  );
};

const useOnboardingNavigation = () =>
  useNavigation<NavigationProp<OnboardingNavigationScreenParamsList>>();

const useOnboardingRoute = <
  T extends keyof OnboardingNavigationScreenParamsList,
>(
  _screenName: T,
) => useRoute<RouteProp<OnboardingNavigationScreenParamsList, T>>();

export {
  OnboardingStack,
  useOnboardingNavigation,
  useOnboardingRoute,
  type OnboardingNavigationScreenParamsList,
};
