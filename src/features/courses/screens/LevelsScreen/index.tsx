import { Text, View } from 'react-native';
import React from 'react';
import { RootScreen } from '../../../../layout';
import { useAuthStore } from '../../../../store/authSlice';

const LevelsScreen = () => {
  const { user } = useAuthStore();

  console.log('user', user);

  return (
    <RootScreen>
      <Text>index</Text>
    </RootScreen>
  );
};

export { LevelsScreen };
