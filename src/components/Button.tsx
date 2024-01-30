import {
  StyleSheet,
  Text,
  View,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React from 'react';

//
import {Icons} from '.';
//
import {COLORS, ICONS, FONTS} from '../constants';

type Varinat = 'text' | 'icon';

type Props = PressableProps & {
  varinat?: Varinat;
  title?: String;
  Iconvarinat?: keyof typeof ICONS;
  style?: StyleProp<ViewStyle>;
};

const Button = ({
  style,
  varinat = 'text',
  title,
  Iconvarinat,
  onPress,
}: Props) => {
  let content;
  switch (varinat) {
    case 'icon':
      content = <Icons varinat={Iconvarinat || 'boy-head'} />;
      break;
    default:
      content = <Text style={styles.label}>{title}</Text>;
      break;
  }
  return (
    <Pressable onPress={onPress}>
      <View style={[styles.container, style]}>{content}</View>
    </Pressable>
  );
};

export {Button};

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
