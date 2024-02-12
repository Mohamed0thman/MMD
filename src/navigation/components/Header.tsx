import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { PressableProps } from 'react-native';
import { Icons, PressableBox, StyledText } from '../../components';
import { useRestyleTheme } from '../../style/theme';
import { ICONS } from '../../constants';
import { HeaderBackButtonProps } from '@react-navigation/native-stack/lib/typescript/src/types';

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

// function MainHeaderIcon({ title }: Props) {
//   const { goBack, navigate } = useNavigation();
//   const { colors } = useRestyleTheme();
//   return (
//     <HeaderIconBox onPress={() => navigate('profile')}>
//       <Icons icon={'boy-head'} height={20} width={20} color={colors.gray900} />
//       {title && (
//         <StyledText variant="headingM" color="black">
//           {title}
//         </StyledText>
//       )}
//     </HeaderIconBox>
//   );
// }

export { BackHeaderIcon };
