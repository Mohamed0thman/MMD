import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  OnboardingNavigationScreens,
  OnboardingNavigationScreenParamsList,
} from '../features/onboarding/navigation';
import {
  AuthNavigationScreenParamsList,
  AuthNavigationScreens,
} from '../features/auth/navigation';
import { TabNavigator } from './TabNavigation';
import { useAuthStore, useUserStore } from '../store/authStore';

export type RootStackParamList = {
  main: undefined;
} & OnboardingNavigationScreenParamsList &
  AuthNavigationScreenParamsList;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigation() {
  const { token } = useAuthStore();
  const { user } = useUserStore();

  console.log('token && user?.email_verified_at', token, user);

  console.log('tokentokentoken', token);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{}}>
        {!token || !user?.email_verified_at ? (
          <>
            {OnboardingNavigationScreens.map((screen, index) => (
              <Stack.Screen
                key={index}
                name={screen.name}
                component={screen.component}
                options={{ ...screen.options, headerShown: false }}
              />
            ))}

            {AuthNavigationScreens.map((screen, index) => (
              <Stack.Screen
                key={index}
                name={screen.name}
                component={screen.component}
                options={screen.options}
              />
            ))}
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
