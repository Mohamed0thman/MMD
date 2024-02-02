import React from 'react';
import { SvgProps } from 'react-native-svg';
import { ICONS } from '../constants';
import { Box } from '.';

type Props = SvgProps & {
  varinat: keyof typeof ICONS | string;
};

const Icons = ({ varinat, ...reset }: Props) => {
  return (
    <Box>
      {React.createElement(ICONS[varinat as keyof typeof ICONS], reset)}
    </Box>
  );
};

export { Icons };
