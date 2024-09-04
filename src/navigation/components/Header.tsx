import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { PressableProps } from 'react-native';
import { Box, Icons, PressableBox, StyledText } from '../../components';
import { useRestyleTheme } from '../../style/theme';
import { useUserStore } from '../../store/authStore';
import { useSettingStore } from '../../store/settingStore';
import { useMainNavigation } from '../RootNavigation';

function HeaderIconBox({
  children,
  ...rest
}: React.PropsWithChildren<PressableProps>) {
  return (
    <PressableBox
      backgroundColor="white"
      alignItems="center"
      justifyContent="flex-start"
      flexDirection="row"
      paddingHorizontal="m"
      paddingVertical="m"
      gap="s"
      {...rest}>
      {children}
    </PressableBox>
  );
}

type Props = {
  title?: string;
};

function BackHeaderIcon({ title }: Props) {
  const { goBack } = useNavigation();
  const { colors } = useRestyleTheme();
  return (
    <HeaderIconBox onPress={goBack}>
      <Icons icon={'back'} height={20} width={20} color={colors.gray900} />
      {title && (
        <StyledText variant="headingL" color="black">
          {title}
        </StyledText>
      )}
    </HeaderIconBox>
  );
}

function MainHeaderIcon() {
  const { navigate } = useMainNavigation();
  const { colors } = useRestyleTheme();
  const { user } = useUserStore();
  const { themeName } = useSettingStore();

  return (
    <HeaderIconBox onPress={() => navigate('user', { screen: 'Profile' })}>
      <Box
        backgroundColor="secondaryBackground"
        borderRadius="xl"
        width={40}
        height={40}
        justifyContent="center"
        alignItems="center">
        <Icons
          icon={themeName === 'blue' ? 'boy-head' : 'girl-head'}
          height={20}
          width={20}
          fill={colors.white}
        />
      </Box>

      <StyledText variant="headingM" color="black">
        مرحبا {user?.name}
      </StyledText>
    </HeaderIconBox>
  );
}

export { BackHeaderIcon, MainHeaderIcon };
