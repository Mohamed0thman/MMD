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

export type RootStackParamList = {} & OnboardingNavigationScreenParamsList &
  AuthNavigationScreenParamsList;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Welcome">
        {OnboardingNavigationScreens.map((screen, index) => (
          <Stack.Screen
            key={index}
            name={screen.name}
            component={screen.component}
            options={screen.options}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
