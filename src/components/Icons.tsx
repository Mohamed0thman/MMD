import {View} from 'react-native';
import React from 'react';
import {SvgProps} from 'react-native-svg';
import {ICONS} from '../constants';

type Props = SvgProps & {
  varinat: keyof typeof ICONS | string;
};

const Icons = ({varinat, ...reset}: Props) => {
  return (
    <View>
      {React.createElement(ICONS[varinat as keyof typeof ICONS], reset)}
    </View>
  );
};

export {Icons};
