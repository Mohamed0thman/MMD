import { ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Button, StyledText } from '../../../../components';
import { ControlledInput } from '../../../../components/Input';
import { convertObjectToObjectWithKeys } from '../../../../utils/Formats';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../navigation/RootNavigation';
import { useRegisterMutation } from '../../hooks/useRegisterMutation';
import * as Keychain from 'react-native-keychain';
import { RegisterValid } from '../../../../utils/validations';
import { yupResolver } from '@hookform/resolvers/yup';
import { ButtonDock } from '../../../../components/Button';
import { showMessage } from 'react-native-flash-message';
import { useAuthStore } from '../../../../store/authSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'> & {};

const FormValues = {
  email: '',
  password: '',
  password_confirmation: '',
};

const FORM_VALUES = convertObjectToObjectWithKeys(FormValues);

const RegisterScreen = ({ navigation, route }: Props) => {
  const { first_name, last_name } = route.params as {
    first_name: string;
    last_name: string;
  };

  const { setToken } = useAuthStore();

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
    register({ ...data, first_name, last_name });
  };

  return (
    <Box flex={1} backgroundColor="mainBackground">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled">
        <StyledText
          variant="headingL"
          color="black"
          marginHorizontal="m"
          mt="m">
          أهلا بك {first_name} {'\n'} في منصة MMD
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
            />
            <ControlledInput
              label="تأكيد كلمة السر"
              fieldName={FORM_VALUES.password_confirmation}
            />
          </Box>
          <ButtonDock>
            <Button
              title="تم"
              isLoading={isPending}
              onPress={formMethods.handleSubmit(handleOnSubmit)}
            />
          </ButtonDock>
        </FormProvider>
      </ScrollView>
    </Box>
  );
};

export { RegisterScreen };

const styles = StyleSheet.create({});
