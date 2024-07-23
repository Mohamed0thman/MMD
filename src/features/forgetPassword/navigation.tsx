import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import { BackHeaderIcon } from '../../navigation/components/Header';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  CheckForgetPasswordScreen,
  RequestChangePasswordScreen,
  ResetPassowrdScreen,
} from './screens';

type ForgetNavigationScreenParamsList = {
  Request: undefined;
  Check: { email: string };
  Reset: { email: string; code: string };
};

const ForgetPasswordNavigationScreens: {
  name: keyof ForgetNavigationScreenParamsList;
  component: React.ComponentType<any>;
  options?: NativeStackNavigationOptions;
}[] = [
  {
    name: 'Request',
    component: RequestChangePasswordScreen,
    options: {
      headerLeft: () => <BackHeaderIcon title="طلب تغير كلمة السر" />,
      headerTitle: '',
    },
  },
  {
    name: 'Check',
    component: CheckForgetPasswordScreen,
    options: {
      headerLeft: () => <BackHeaderIcon title="تآكيد تغير كلمة السر" />,
      headerTitle: '',
    },
  },
  {
    name: 'Reset',
    component: ResetPassowrdScreen,
    options: {
      headerLeft: () => <BackHeaderIcon title="تغير كلمة السر" />,
      headerTitle: '',
    },
  },
];

const Stack = createNativeStackNavigator();

const ForgetStack = () => {
  return (
    <Stack.Navigator screenOptions={{}}>
      {ForgetPasswordNavigationScreens.map((screen, index) => (
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

const useForgetNavigation = () =>
  useNavigation<NavigationProp<ForgetNavigationScreenParamsList>>();

const useForgetRoute = <T extends keyof ForgetNavigationScreenParamsList>(
  _screenName: T,
) => useRoute<RouteProp<ForgetNavigationScreenParamsList, T>>();

export {
  ForgetStack,
  useForgetNavigation,
  useForgetRoute,
  type ForgetNavigationScreenParamsList,
};
