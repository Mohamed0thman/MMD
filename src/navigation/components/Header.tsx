import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { PressableProps } from 'react-native';
import { Box, Icons, PressableBox, StyledText } from '../../components';
import { useRestyleTheme } from '../../style/theme';
import { ICONS } from '../../constants';
import { HeaderBackButtonProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import { useProfileNavigation } from '../../features/user/navigation';
import { useUserStore } from '../../store/authStore';
import { useSettingStore } from '../../store/settingStore';
import { useMainNavigation } from '../RootNavigation';

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
      paddingHorizontal="m"
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
        padding="m"
        style={{ borderRadius: 10000 }}>
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
