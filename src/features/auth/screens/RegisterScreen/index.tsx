import { ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Button } from '../../../../components';
import { ControlledInput } from '../../../../components/Input';
import { convertObjectToObjectWithKeys } from '../../../../utils/Formats';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../navigation/RootNavigation';
import { useRegisterMutation } from '../../hooks/useRegisterMutation';
import * as Keychain from 'react-native-keychain';
import {
  PresonalInfoValid,
  RegisterValid,
} from '../../../../utils/validations';
import { yupResolver } from '@hookform/resolvers/yup';
import { string } from 'yup';
import axios from 'axios';

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
  const formMethods = useForm({
    defaultValues: FormValues,
    resolver: yupResolver(RegisterValid),
  });

  const { isPending, mutate: register } = useRegisterMutation({
    onSuccess(data) {
      Keychain.setGenericPassword(data.data.name, data.token);
      navigation.navigate('Otp');
    },
    onError(error) {
      console.log('err', error);
    },
  });

  const handleOnSubmit = (data: typeof FormValues) => {
    register({ ...data, first_name, last_name });
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled">
      <Box flex={1} backgroundColor="mainBackground">
        <FormProvider {...formMethods}>
          <Box flex={1} justifyContent="center" paddingHorizontal="l">
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

          <Box
            style={{ marginTop: 'auto' }}
            borderTopColor="grey200"
            borderTopWidth={1}
            paddingVertical="l"
            paddingHorizontal="l">
            <Button
              label="تم"
              loading={isPending}
              onPress={formMethods.handleSubmit(handleOnSubmit)}
            />
          </Box>
        </FormProvider>
      </Box>
    </ScrollView>
  );
};

export { RegisterScreen };

const styles = StyleSheet.create({});
