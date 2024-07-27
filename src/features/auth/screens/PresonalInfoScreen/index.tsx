import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Button, StyledText } from '../../../../components';
import { ControlledInput } from '../../../../components/Input';
import {
  convertObjectToObjectWithKeys,
  openURL,
} from '../../../../utils/Formats';
import { ScrollView } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { PresonalInfoValid } from '../../../../utils/validations';
import { ButtonDock } from '../../../../components/Button';
import { useAuthNavigation } from '../../navigation';

const FormValues = {
  first_name: '',
  last_name: '',
};

const FORM_VALUES = convertObjectToObjectWithKeys(FormValues);

const PresonalInfoScreen = () => {
  const navigation = useAuthNavigation();
  const formMethods = useForm({
    defaultValues: FormValues,
    resolver: yupResolver(PresonalInfoValid),
  });

  const handleOnSubmit = (data: typeof FormValues) => {
    navigation.navigate('Register', { ...data });
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled">
      <FormProvider {...formMethods}>
        <Box flex={1} backgroundColor="mainBackground">
          <Box flex={1} justifyContent="center" paddingHorizontal="l">
            <ControlledInput
              label="الأسم الأول"
              fieldName={FORM_VALUES.first_name}
              // error={formMethods.formState.errors.firstName?.message}
            />
            <ControlledInput
              label="أسم العائلة"
              fieldName={FORM_VALUES.last_name}
              // error={formMethods.formState.errors.lastName?.message}
            />
          </Box>

          <Box justifyContent="center" alignItems="center" marginBottom="l">
            <StyledText variant="paragraphsL">
              باستخدامك هذا التطبيق فانك توافق علي{' '}
            </StyledText>

            <Box flexDirection="row">
              <StyledText
                color="bluePrimary"
                variant="headingM"
                onPress={() =>
                  openURL('http://mmdoaa.com/terms-and-conditions')
                }>
                شروط الاستخدام و{' '}
              </StyledText>
              <StyledText
                color="bluePrimary"
                variant="headingM"
                onPress={() => openURL('https://mmdoaa.com/privacy')}>
                اتفاقيه الخصوصيه{' '}
              </StyledText>
            </Box>
          </Box>
          <ButtonDock>
            <Button
              title="التالي"
              onPress={formMethods.handleSubmit(handleOnSubmit)}
            />
          </ButtonDock>
        </Box>
      </FormProvider>
    </ScrollView>
  );
};

export { PresonalInfoScreen };
