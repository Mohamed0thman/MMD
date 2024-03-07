import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Button, StyledText } from '../../../../components';
import { ControlledInput } from '../../../../components/Input';
import { convertObjectToObjectWithKeys } from '../../../../utils/Formats';
import { useRegisterMutation } from '../../hooks/useRegisterMutation';
import * as Keychain from 'react-native-keychain';
import { RegisterValid } from '../../../../utils/validations';
import { yupResolver } from '@hookform/resolvers/yup';
import { ButtonDock } from '../../../../components/Button';
import { showMessage } from 'react-native-flash-message';
import { useAuthStore } from '../../../../store/authStore';
import { useAuthNavigation, useAuthRoute } from '../../navigation';
import { useSettingStore } from '../../../../store/settingStore';

const FormValues = {
  email: '',
  password: '',
  password_confirmation: '',
};

const FORM_VALUES = convertObjectToObjectWithKeys(FormValues);

const RegisterScreen = () => {
  const navigation = useAuthNavigation();

  const { params } = useAuthRoute('Register');
  const { first_name, last_name } = params!;

  const { setToken } = useAuthStore();

  const { themeName } = useSettingStore();

  const formMethods = useForm({
    defaultValues: FormValues,
    resolver: yupResolver(RegisterValid),
  });

  const { isPending, mutate: register } = useRegisterMutation({
    async onSuccess(data) {
      if (data.success) {
        await Keychain.setGenericPassword(data.data.name, data.token);
        setToken(data.token);
        navigation.navigate('Otp', { ...data.data });
      } else {
        console.log(data.errors);

        Object.entries(data.errors).map(([key, value]) => {
          formMethods.setError(key as keyof typeof FormValues, {
            message: value as string,
          });
        });
      }
    },
    onError(error) {
      showMessage({
        message: error.response?.data.message as string,
        type: 'danger',
      });
    },
  });

  const handleOnSubmit = (data: typeof FormValues) => {
    register({
      ...data,
      first_name,
      last_name,
      gender: themeName === 'blue' ? 'male' : 'female',
    });
  };

  return (
    <Box backgroundColor="mainBackground" flex={1}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box gap="xl">
          <StyledText
            variant="headingL"
            color="black"
            marginHorizontal="m"
            mt="m">
            أهلا بك {first_name} {'\n'} في منصة{' '}
            <StyledText color="primaryBackground">MMD</StyledText>
          </StyledText>
          <FormProvider {...formMethods}>
            <Box flex={1} justifyContent="center" paddingHorizontal="m">
              <ControlledInput
                label="البريد الالكتروني"
                fieldName={FORM_VALUES.email}
              />
              <ControlledInput
                label="كلمة السر"
                fieldName={FORM_VALUES.password}
                secureTextEntry
              />
              <ControlledInput
                label="تأكيد كلمة السر"
                fieldName={FORM_VALUES.password_confirmation}
                secureTextEntry
              />
            </Box>
          </FormProvider>
        </Box>
      </ScrollView>
      <ButtonDock>
        <Button
          title="تم"
          isLoading={isPending}
          onPress={formMethods.handleSubmit(handleOnSubmit)}
        />
      </ButtonDock>
    </Box>
  );
};

export { RegisterScreen };

const styles = StyleSheet.create({});
