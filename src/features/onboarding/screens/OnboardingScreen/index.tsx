import React from 'react';
import { Box, Button, StyledText } from '../../../../components';
import { useMainNavigation } from '../../../../navigation/RootNavigation';
import { ButtonDock } from '../../../../components/Button';

const OnboardingScreen = () => {
  const { navigate } = useMainNavigation();

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
          onPress={() =>
            navigate('Auth', {
              screen: 'PresonalInfo',
            })
          }
        />
        <Button
          title="لدي حساب بالفعل"
          onPress={() =>
            navigate('Auth', {
              screen: 'Login',
            })
          }
          variant="secondary"
        />
      </ButtonDock>
    </Box>
  );
};

export { OnboardingScreen };
