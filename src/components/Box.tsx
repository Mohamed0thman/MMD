import { createBox } from '@shopify/restyle';

import { Theme } from '../style/theme';
import { Pressable, PressableProps } from 'react-native';

const Box = createBox<Theme>();
const PressableBox = createBox<Theme, PressableProps>(Pressable);

export { Box, PressableBox };
