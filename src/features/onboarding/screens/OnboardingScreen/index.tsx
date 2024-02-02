import React from 'react';
import { Box, Button, StyledText } from '../../../../components';
import { RootScreen } from '../../../../layout';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../navigation/RootNavigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'> & {};

const OnboardingScreen = ({ navigation }: Props) => {
  return (
    <RootScreen>
      <Box flex={1} justifyContent="center" paddingHorizontal="m">
        <StyledText>أنشئ حسابا لحفظ نتائج اختبارك</StyledText>
        <StyledText>عمليه سريعه تمكنك استخدام جميع الدروس</StyledText>
        <Button
          label="انشاء حساب"
          onPress={() => navigation.navigate('PresonalInfo')}
        />
        <Button
          label="لدي حساب بالفعل"
          onPress={() => navigation.navigate('Login')}
        />
      </Box>
    </RootScreen>
  );
};

export { OnboardingScreen };
