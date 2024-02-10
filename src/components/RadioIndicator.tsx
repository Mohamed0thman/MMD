import React from 'react';
import {
  VariantProps,
  createBox,
  createRestyleComponent,
  createVariant,
} from '@shopify/restyle';

import { Theme } from '../style/theme';

enum RADIO_THEME {
  VARIANTS_THEME = 'radioIndicatorVariants',
}

const BaseRadioIndicator = createBox<Theme>();
const variant = createVariant<Theme, RADIO_THEME.VARIANTS_THEME>({
  themeKey: RADIO_THEME.VARIANTS_THEME,
  defaults: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 'xl',
    borderColor: 'gray200',
  },
});

const RadioIndicatorPrimitive = createRestyleComponent<
  VariantProps<Theme, RADIO_THEME.VARIANTS_THEME> &
    React.ComponentProps<typeof BaseRadioIndicator>,
  Theme
>([variant]);

export function RadioIndicator({ status }: { status: 'active' | 'inactive' }) {
  return <RadioIndicatorPrimitive variant={status} />;
}
