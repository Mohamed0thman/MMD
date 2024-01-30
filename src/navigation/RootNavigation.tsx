import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UnAuthStack from './UnAuthStack';

export type RootStackParamList = {
  UnAuth: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="UnAuth" component={UnAuthStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
