import React from 'react';
import { Box, Button, StyledText } from '../../../../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../navigation/RootNavigation';
import { ButtonDock } from '../../../../components/Button';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'> & {};

const OnboardingScreen = ({ navigation }: Props) => {
  return (
    <Box flex={1} backgroundColor="mainBackground">
      <Box flex={1} paddingHorizontal="m" justifyContent="center">
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
      <ButtonDock>
        <Button
          title="انشاء حساب"
          onPress={() => navigation.navigate('PresonalInfo')}
        />
        <Button
          title="لدي حساب بالفعل"
          onPress={() => navigation.navigate('Login')}
          variant="secondary"
        />
      </ButtonDock>
      {/* <Box
        style={{ marginTop: 'auto' }}
        borderTopColor="gray200"
        borderTopWidth={1}
        paddingVertical="l"
        paddingHorizontal="l"
        gap="l"></Box> */}
    </Box>
  );
};

export { OnboardingScreen };
