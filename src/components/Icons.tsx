import React, { ReactSVG } from 'react';
import { SvgProps } from 'react-native-svg';
import { ICONS } from '../constants';
import { Box } from '.';
import {
  VariantProps,
  createRestyleComponent,
  createVariant,
} from '@shopify/restyle';
import { Theme } from '../style/theme';

type IconVariants = VariantProps<Theme, 'iconVariants'>;
type IconVariant = IconVariants['variant'];

type IconProps = SvgProps & {
  icon: keyof typeof ICONS | string;
  IconVariant?: IconVariant;
};

const Icons = ({ icon, ...reset }: IconProps) => {
  return (
    <Box>{React.createElement(ICONS[icon as keyof typeof ICONS], reset)}</Box>
  );
};

export { Icons };
