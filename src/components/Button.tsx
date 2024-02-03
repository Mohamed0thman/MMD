import { ActivityIndicator, Pressable } from 'react-native';
import {
  useRestyle,
  spacing,
  border,
  backgroundColor,
  SpacingProps,
  BorderProps,
  BackgroundColorProps,
  composeRestyleFunctions,
} from '@shopify/restyle';
import { Theme } from '../style/theme';
import { Box, Icons, StyledText } from '.';
import { ICONS } from '../constants';

type RestyleProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme>;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  border,
  backgroundColor,
]);

type Props = RestyleProps & {
  onPress: () => void;
  label: string;
  icon?: keyof typeof ICONS;
  loading?: boolean;
};

const Button = ({ onPress, label, icon, loading, ...rest }: Props) => {
  const props = useRestyle(restyleFunctions, rest);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}>
      <Box
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        backgroundColor="primaryBackground"
        borderRadius="m"
        {...props}>
        {loading ? (
          <ActivityIndicator size={'small'} color={'#fff'} />
        ) : (
          <>
            {icon && <Icons icon={icon} />}
            {label && (
              <StyledText color="white" variant="headingM" paddingVertical="m">
                {label}
              </StyledText>
            )}
          </>
        )}
      </Box>
    </Pressable>
  );
};

export { Button };
