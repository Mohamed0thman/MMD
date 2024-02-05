import React, { createElement, FC, PropsWithChildren } from 'react';
import {
  VariantProps,
  createBox,
  createRestyleComponent,
  createVariant,
} from '@shopify/restyle';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Text,
  TextProps,
} from 'react-native';
import { SvgProps } from 'react-native-svg';

import { Theme, useRestyleTheme } from '../style/theme';

import { Box, PressableBox } from './Box';

type Props = React.ComponentProps<typeof PressableBox> & {
  isLoading?: boolean;
  disabled?: boolean;
  icon?: FC<SvgProps>;
  title?: string;
  variant?: keyof Theme[BUTTON_THEME.VARIANTS_THEME];
  variantDisabled?: keyof Theme[BUTTON_THEME.VARIANTS_DISABLED_THEME];
};

enum BUTTON_THEME {
  VARIANTS_THEME = 'buttonVariants',
  VARIANTS_DISABLED_THEME = 'buttonVariantsDisabled',
  VARIANTS_PRESSED_THEME = 'buttonVariantsPressed',
  VARIANTS_TEXT_THEME = 'buttonTextVariants',
  VARIANT = 'variant',
  VARIANT_DISABLED = 'variantDisabled',
  VARIANT_PRESSED = 'variantPressed',
}

const BaseButton = createBox<Theme, PressableProps>(Pressable);
const BaseButtonText = createBox<Theme, TextProps>(Text);

const ButtonVariant = createVariant<
  Theme,
  BUTTON_THEME.VARIANTS_THEME,
  BUTTON_THEME.VARIANT
>({
  property: BUTTON_THEME.VARIANT,
  themeKey: BUTTON_THEME.VARIANTS_THEME,
  defaults: {
    flexDirection: 'row',
    borderRadius: 'm',
    paddingVertical: 'm',
    paddingHorizontal: 'l',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 's',
  },
});

const ButtonVariantDisabled = createVariant<
  Theme,
  BUTTON_THEME.VARIANTS_DISABLED_THEME,
  BUTTON_THEME.VARIANT_DISABLED
>({
  property: BUTTON_THEME.VARIANT_DISABLED,
  themeKey: BUTTON_THEME.VARIANTS_DISABLED_THEME,
  defaults: {},
});

const ButtonTextVariant = createVariant<
  Theme,
  BUTTON_THEME.VARIANTS_TEXT_THEME
>({
  themeKey: BUTTON_THEME.VARIANTS_TEXT_THEME,
  defaults: {},
});

const ButtonPrimitive = createRestyleComponent<
  VariantProps<Theme, BUTTON_THEME.VARIANTS_THEME, BUTTON_THEME.VARIANT> &
    VariantProps<
      Theme,
      BUTTON_THEME.VARIANTS_DISABLED_THEME,
      BUTTON_THEME.VARIANT_DISABLED
    > &
    React.ComponentProps<typeof BaseButton>,
  Theme
>([ButtonVariant, ButtonVariantDisabled], BaseButton);

const ButtonText = createRestyleComponent<
  VariantProps<Theme, BUTTON_THEME.VARIANTS_TEXT_THEME> &
    React.ComponentProps<typeof BaseButtonText>,
  Theme
>([ButtonTextVariant], BaseButtonText);

export function Button({
  variant = 'primary',
  isLoading,
  disabled = false,
  icon,
  title,
  ...props
}: Props) {
  const { buttonVariantsPressed, buttonTextVariants, colors } =
    useRestyleTheme();
  const titleColor =
    colors[buttonTextVariants[variant].color as keyof Theme['colors']];
  return (
    <ButtonPrimitive
      {...props}
      disabled={disabled}
      variant={variant}
      variantDisabled={disabled ? variant : undefined}
      style={({ pressed }) =>
        pressed && !isLoading ? buttonVariantsPressed[variant] : {}
      }>
      {icon &&
        createElement(icon, { width: 24, height: 24, color: titleColor })}
      <ButtonText variant={disabled ? 'disabled' : variant}>
        {isLoading ? <ActivityIndicator color={titleColor} /> : title}
      </ButtonText>
    </ButtonPrimitive>
  );
}

export function ButtonDock({ children }: PropsWithChildren) {
  return (
    <Box
      paddingHorizontal={'m'}
      paddingVertical="l"
      gap="m"
      borderTopWidth={1}
      borderTopColor="gray200">
      {children}
    </Box>
  );
}
