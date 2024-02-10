import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { PressableProps } from 'react-native';
import { Icons, PressableBox, StyledText } from '../../components';
import { useRestyleTheme } from '../../style/theme';
import { ICONS } from '../../constants';

function HeaderIconBox({
  children,
  ...rest
}: React.PropsWithChildren<PressableProps>) {
  return (
    <PressableBox
      flex={1}
      backgroundColor="mainBackground"
      borderRadius="xl"
      marginHorizontal="m"
      marginVertical="m"
      alignItems="center"
      flexDirection="row"
      gap="s"
      {...rest}>
      {children}
    </PressableBox>
  );
}

type Props = {
  title?: string;
  icon: keyof typeof ICONS;
};




function BackHeaderIcon({ title, icon }: Props) {
  const { goBack } = useNavigation();
  const { colors } = useRestyleTheme();
  return (
    <HeaderIconBox onPress={goBack}>
      <Icons icon={icon} height={20} width={20} color={colors.gray900} />
      {title && (
        <StyledText variant="headingM" color="black">
          {title}
        </StyledText>
      )}
    </HeaderIconBox>
  );
}

export { BackHeaderIcon };
