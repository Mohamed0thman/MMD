import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ForgetPasswordScreen,
  LoginScreen,
  Onboardingscreen,
  OtpScreen,
  PresonalInfoScreen,
  RegisterScreen,
  WelcomeScreen,
} from '../../features';

export type UnAuthStackParamList = {
  Welcome: undefined;
  Onboarding: undefined;
  PresonalInfo: undefined;
  Register: undefined;
  Login: undefined;
  Otp: undefined;
  ForgetPassword: undefined;
};

const Stack = createNativeStackNavigator<UnAuthStackParamList>();

export default function UnAuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Onboarding" component={Onboardingscreen} />
      <Stack.Screen name="PresonalInfo" component={PresonalInfoScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
      <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
    </Stack.Navigator>
  );
}
