import { ScrollView } from 'react-native';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { convertObjectToObjectWithKeys } from '../../../utils/Formats';
import { yupResolver } from '@hookform/resolvers/yup';
import { RequestValid } from '../../../utils/validations';
import { useRequestChangePasswordMutation } from '../hooks/RequestChangePasswordMutation';
import { showMessage } from 'react-native-flash-message';
import { useForgetNavigation } from '../navigation';
import { Box, ButtonDock, StyledText } from '../../../components';
import { Button } from '../../../components';
import { ControlledInput } from '../../../components/Input';

const FormValues = {
  email: '',
};
const FORM_VALUES = convertObjectToObjectWithKeys(FormValues);

export const RequestChangePasswordScreen = () => {
  const { navigate } = useForgetNavigation();
  const formMethods = useForm({
    defaultValues: FormValues,
    resolver: yupResolver(RequestValid),
  });

  const { isPending, mutate: requestCahnge } = useRequestChangePasswordMutation(
    {
      async onSuccess(data) {
        if (data.success) {
          showMessage({
            message: data.message,
            type: 'success',
          });
          navigate('Check', { email: formMethods.getValues('email') });
        } else {
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
    },
  );

  const handleOnSubmit = (data: typeof FormValues) => {
    requestCahnge(data);
  };

  return (
    <Box backgroundColor="mainBackground" flex={1}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <FormProvider {...formMethods}>
          <Box
            flex={1}
            justifyContent="center"
            paddingHorizontal="m"
            marginBottom="xl">
            <ControlledInput
              label="البريد الالكتروني"
              fieldName={FORM_VALUES.email}
            />
          </Box>
        </FormProvider>
      </ScrollView>
      <ButtonDock>
        <Button
          title="التالي"
          isLoading={isPending}
          disabled={!formMethods.formState.isValid}
          onPress={formMethods.handleSubmit(handleOnSubmit)}
        />
      </ButtonDock>
    </Box>
  );
};
