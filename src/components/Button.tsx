import {
  StyleSheet,
  Text,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React from 'react';

import { Box, Icons, StyledText } from '.';
import { COLORS, ICONS, FONTS } from '../constants';

type Varinat = 'text' | 'icon';

type Props = PressableProps & {
  varinat?: Varinat;
  title?: String;
  icon?: keyof typeof ICONS;
  style?: StyleProp<ViewStyle>;
};

const Button = ({ style, title, icon, onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}>
      <Box
        style={[styles.container, style]}
        flexDirection="row"
        justifyContent="center"
        alignItems="center">
        {icon && <Icons varinat={icon} />}
        {title && <StyledText>{title}</StyledText>}
      </Box>
    </Pressable>
  );
};

export { Button };

const styles = StyleSheet.create({
  container: {
    height: 45,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: COLORS.white,
    ...FONTS.h3,
  },
});
