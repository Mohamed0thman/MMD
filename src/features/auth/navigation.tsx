import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import {
  ForgetPasswordScreen,
  LoginScreen,
  OtpScreen,
  PresonalInfoScreen,
  RegisterScreen,
} from './screens';
import { BackHeaderIcon } from '../../navigation/components/Header';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

type AuthNavigationScreenParamsList = {
  Login: undefined;
  Register: { first_name: string; last_name: string } | undefined;
  ForgetPassword: undefined;
  Otp: User | undefined;
  PresonalInfo: undefined;
};

const AuthNavigationScreens: {
  name: keyof AuthNavigationScreenParamsList;
  component: React.ComponentType<any>;
  options?: NativeStackNavigationOptions;
}[] = [
  {
    name: 'Login',
    component: LoginScreen,
    options: {
      headerRight: () => BackHeaderIcon({ title: 'تسجيل الدخول' }),
      headerLeft: () => <></>,

      headerTitle: '',
    },
  },
  {
    name: 'Register',
    component: RegisterScreen,
    options: {
      headerRight: () => BackHeaderIcon({ title: 'انشاء حساب' }),
      headerLeft: () => <></>,
      headerTitle: '',
    },
  },
  {
    name: 'ForgetPassword',
    component: ForgetPasswordScreen,
    options: {
      headerRight: () => BackHeaderIcon({ title: 'نسيت كلمة السر' }),
      headerLeft: () => <></>,
      headerTitle: '',
    },
  },

  {
    name: 'Otp',
    component: OtpScreen,
    options: {
      headerRight: () => BackHeaderIcon({ title: 'تأكيد الحساب' }),
      headerLeft: () => <></>,
      headerTitle: '',
    },
  },
  {
    name: 'PresonalInfo',
    component: PresonalInfoScreen,
    options: {
      headerRight: () => BackHeaderIcon({ title: 'انشاء حساب' }),
      headerLeft: () => <></>,
      headerTitle: '',
    },
  },
];

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{}}>
      {AuthNavigationScreens.map((screen, index) => (
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

const useAuthNavigation = () =>
  useNavigation<NavigationProp<AuthNavigationScreenParamsList>>();

const useAuthRoute = <T extends keyof AuthNavigationScreenParamsList>(
  _screenName: T,
) => useRoute<RouteProp<AuthNavigationScreenParamsList, T>>();

export {
  AuthStack,
  useAuthNavigation,
  useAuthRoute,
  type AuthNavigationScreenParamsList,
};
