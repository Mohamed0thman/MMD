import React from 'react';
import {
  NavigationContainer,
  NavigationProp,
  NavigatorScreenParams,
  useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  OnboardingNavigationScreenParamsList,
  OnboardingStack,
} from '../features/onboarding/navigation';
import {
  AuthNavigationScreenParamsList,
  AuthStack,
} from '../features/auth/navigation';
import { TabNavigator, TabParamList } from './TabNavigation';
import { useAuthStore, useUserStore } from '../store/authStore';
import {
  UserNavigationScreenParamsList,
  UserStack,
} from '../features/user/navigation';
import {
  ForgetNavigationScreenParamsList,
  ForgetStack,
} from '../features/forgetPassword/navigation';
import { SplashScreen } from '../features/SplashScreen';
import { PaymentScreen, SelectPaymentScreen } from '../features/home/screens';

type MainNavigationParamsList = {
  Splash: undefined;
  Onboarding: NavigatorScreenParams<OnboardingNavigationScreenParamsList>;
  Auth: NavigatorScreenParams<AuthNavigationScreenParamsList>;
  main: NavigatorScreenParams<TabParamList>;
  user: NavigatorScreenParams<UserNavigationScreenParamsList>;
  Forget: NavigatorScreenParams<ForgetNavigationScreenParamsList>;
  // Payment: undefined;
  // Select: undefined;
};

const Stack = createNativeStackNavigator<MainNavigationParamsList>();

function RootNavigation() {
  const { token } = useAuthStore();
  const { user } = useUserStore();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Splash">
        <Stack.Screen
          name={'Splash'}
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        {!token || !user?.email_verified_at ? (
          <>
            <Stack.Screen
              name={'Onboarding'}
              component={OnboardingStack}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={'Auth'}
              component={AuthStack}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={'Forget'}
              component={ForgetStack}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name={'main'}
              component={TabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={'user'}
              component={UserStack}
              options={{ headerShown: false }}
            />
          </>
        )}
        {/* <Stack.Screen
          name={'Payment'}
          component={PaymentScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={'Select'}
          component={SelectPaymentScreen}
          options={{ headerShown: false }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const useMainNavigation = () =>
  useNavigation<NavigationProp<MainNavigationParamsList>>();

export { RootNavigation, useMainNavigation, type MainNavigationParamsList };
