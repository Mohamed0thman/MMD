import { ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ControlledInput } from '../../../../components/Input';
import { convertObjectToObjectWithKeys } from '../../../../utils/Formats';
import { Box, Button } from '../../../../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../navigation/RootNavigation';
import { ButtonDock } from '../../../../components/Button';
import { useLoginMutation } from '../../hooks/useLoginMutation';
import { useAuthStore, useUserStore } from '../../../../store/authStore';
import * as Keychain from 'react-native-keychain';
import { showMessage } from 'react-native-flash-message';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'> & {};

const FormValues = {
  email: '',
  password: '',
};

const FORM_VALUES = convertObjectToObjectWithKeys(FormValues);

const LoginScreen = ({ navigation }: Props) => {
  const formMethods = useForm({
    defaultValues: FormValues,
  });
  const { setToken } = useAuthStore();
  const { setUser } = useUserStore();

  const { isPending, mutate: login } = useLoginMutation({
    async onSuccess(data) {
      if (data.success) {
        await Keychain.setGenericPassword(data.data.name, data.token);

        setToken(data.token);

        if (!data.data.email_verified_at)
          return navigation.navigate('Otp', { ...data.data });

        setUser(data.data);

        navigation.navigate('main');
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
    login(data);
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled">
      <FormProvider {...formMethods}>
        <Box flex={1} backgroundColor="mainBackground">
          <Box flex={1} justifyContent="center" paddingHorizontal="l">
            <ControlledInput
              label="البريد الالكتروني"
              fieldName={FORM_VALUES.email}
            />
            <ControlledInput
              label="كلمة السر"
              fieldName={FORM_VALUES.password}
            />
          </Box>

          <ButtonDock>
            <Button
              title="تسجيل الدخول"
              onPress={formMethods.handleSubmit(handleOnSubmit)}
              isLoading={isPending}
            />
          </ButtonDock>
        </Box>
      </FormProvider>
    </ScrollView>
  );
};

export { LoginScreen };

const styles = StyleSheet.create({});
