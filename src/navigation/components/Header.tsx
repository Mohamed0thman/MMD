import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { PressableProps } from 'react-native';
import { Icons, PressableBox, StyledText } from '../../components';
import { useRestyleTheme } from '../../style/theme';

function HeaderIconBox({
  children,
  ...rest
}: React.PropsWithChildren<PressableProps>) {
  return (
    <PressableBox
      backgroundColor="mainBackground"
      borderRadius="xl"
      marginHorizontal="m"
      marginVertical="m"
      alignItems="center"
      justifyContent="center"
      height={40}
      width={40}
      {...rest}>
      {children}
    </PressableBox>
  );
}

function BackHeaderIcon() {
  const { goBack } = useNavigation();
  const { colors } = useRestyleTheme();
  return (
    <HeaderIconBox onPress={goBack}>
      <Icons icon="back" height={20} width={20} color={colors.gray900} />
    </HeaderIconBox>
  );
}

export { BackHeaderIcon };
