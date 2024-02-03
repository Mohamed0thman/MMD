import React from 'react';
import { Box, Button, StyledText } from '../../../../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../navigation/RootNavigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'> & {};

const OnboardingScreen = ({ navigation }: Props) => {
  return (
    <Box flex={1} paddingHorizontal="m" backgroundColor="mainBackground">
      <Box flex={1} justifyContent="center">
        <StyledText
          variant="headingL"
          textAlign="center"
          color="primaryBackground">
          أنشئ حسابا لحفظ نتائج اختبارك
        </StyledText>
        <StyledText
          variant="headingM"
          textAlign="center"
          color="secondaryBackground">
          عمليه سريعه تمكنك {'\n'}استخدام جميع الدروس
        </StyledText>
      </Box>

      <Box
        style={{ marginTop: 'auto' }}
        borderTopColor="grey200"
        borderTopWidth={1}
        paddingVertical="l"
        paddingHorizontal="l"
        gap="l">
        <Button
          label="انشاء حساب"
          onPress={() => navigation.navigate('PresonalInfo')}
        />
        <Button
          label="لدي حساب بالفعل"
          onPress={() => navigation.navigate('Login')}
        />
      </Box>
    </Box>
  );
};

export { OnboardingScreen };
