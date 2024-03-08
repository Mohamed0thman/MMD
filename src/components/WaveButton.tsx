import {
  StyleSheet,
  View,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { WaveIndicator } from 'react-native-indicators';
import { theme } from '../style/theme';
import { PressableBox } from '.';

type Props = {
  wave: boolean;
  onPressIn: () => void;
  onPressOut: () => void;
  icon?: React.ReactNode;
};

const WaveButton = ({ wave, icon, onPressIn, onPressOut }: Props) => {
  return (
    <PressableBox
     
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      width={200}
      backgroundColor="primaryBackground"
      height={200}
      style={{ borderRadius: 200, marginBottom: 100 }}
      justifyContent="center"
      alignItems="center"
      marginTop="auto"
      alignSelf="center">
      {wave && (
        <View style={{ position: 'absolute' }}>
          <WaveIndicator
            color={theme.colors.primaryBackground}
            count={1}
            size={500}
          />
        </View>
      )}
      {icon}
    </PressableBox>
  );
};

export { WaveButton };
