import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import {
  ForgetPasswordScreen,
  LoginScreen,
  OtpScreen,
  PresonalInfoScreen,
  RegisterScreen,
} from './screens';

type AuthNavigationScreenParamsList = {
  Login: undefined;
  Register: undefined;
  ForgetPassword: undefined;
  Otp: undefined;
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
  },
  {
    name: 'Register',
    component: RegisterScreen,
  },
  {
    name: 'ForgetPassword',
    component: ForgetPasswordScreen,
  },

  {
    name: 'Otp',
    component: OtpScreen,
  },
  {
    name: 'PresonalInfo',
    component: PresonalInfoScreen,
  },
];

export { AuthNavigationScreens, type AuthNavigationScreenParamsList };
