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

type RootStackParamList = {
  main: undefined;
  Auth: undefined;
  Onboarding: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigation() {
  const { token } = useAuthStore();
  const { user } = useUserStore();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
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
          </>
        ) : (
          <></>
        )}

        <Stack.Screen
          name={'main'}
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

type MainNavigationParamsList = {
  Onboarding: NavigatorScreenParams<OnboardingNavigationScreenParamsList>;
  Auth: NavigatorScreenParams<AuthNavigationScreenParamsList>;
  main: NavigatorScreenParams<TabParamList>;
};

const useMainNavigation = () =>
  useNavigation<NavigationProp<MainNavigationParamsList>>();

export { RootNavigation, useMainNavigation, type MainNavigationParamsList };
