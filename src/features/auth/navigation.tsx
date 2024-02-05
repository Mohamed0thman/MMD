import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import {
  ForgetPasswordScreen,
  LoginScreen,
  OtpScreen,
  PresonalInfoScreen,
  RegisterScreen,
} from './screens';
import { Header } from './components/Header';

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
      header: props => <Header {...props} />,
      title: 'تسجيل الدخول',
    },
  },
  {
    name: 'Register',
    component: RegisterScreen,
    options: {
      header: props => <Header {...props} />,
      title: 'انشاء حساب',
    },
  },
  {
    name: 'ForgetPassword',
    component: ForgetPasswordScreen,
    options: {
      header: props => <Header {...props} />,
      title: 'نسيت كلمة السر',
    },
  },

  {
    name: 'Otp',
    component: OtpScreen,
    options: {
      header: props => <Header {...props} />,
      title: 'تأكيد الحساب',
    },
  },
  {
    name: 'PresonalInfo',
    component: PresonalInfoScreen,
    options: {
      header: props => <Header {...props} />,
      title: 'انشاء حساب',
    },
  },
];

export { AuthNavigationScreens, type AuthNavigationScreenParamsList };
