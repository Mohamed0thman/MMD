import { ScrollView } from 'react-native';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { showMessage } from 'react-native-flash-message';
import { Box, ButtonDock, Button } from '../../../components';
import { ControlledInput } from '../../../components/Input';
import { useMainNavigation } from '../../../navigation/RootNavigation';
import { convertObjectToObjectWithKeys } from '../../../utils/Formats';
import { useForgetRoute } from '../navigation';
import { useResetMutation } from '../hooks/useResetMutation';

const FormValues = {
  password: '',
  password_confirmation: '',
};

const FORM_VALUES = convertObjectToObjectWithKeys(FormValues);

export const ResetPassowrdScreen = () => {
  const navigation = useMainNavigation();
  const { params } = useForgetRoute('Reset');

  const formMethods = useForm({
    defaultValues: FormValues,
  });

  const { isPending, mutate: resetPassword } = useResetMutation({
    async onSuccess(data) {
      if (data.success) {
        showMessage({
          message: data.message,
          type: 'success',
        });
        return navigation.navigate('Auth', { screen: 'Login' });
      } else {
        showMessage({
          message: 'حصل خطا ما',
          type: 'danger',
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
    resetPassword({ email: params.email, code: params.code, ...data });
  };
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled">
      <FormProvider {...formMethods}>
        <Box flex={1} backgroundColor="mainBackground">
          <Box flex={1} justifyContent="center" paddingHorizontal="l">
            <ControlledInput
              label="كلمة السر الجديدة"
              fieldName={FORM_VALUES.password}
              secureTextEntry
            />
            <ControlledInput
              label="تآكيد كلمة السر الجديدة"
              fieldName={FORM_VALUES.password_confirmation}
              secureTextEntry
            />
          </Box>

          <ButtonDock>
            <Button
              title="تم"
              onPress={formMethods.handleSubmit(handleOnSubmit)}
              isLoading={isPending}
            />
          </ButtonDock>
        </Box>
      </FormProvider>
    </ScrollView>
  );
};
