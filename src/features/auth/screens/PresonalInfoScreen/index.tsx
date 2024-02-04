import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { RootScreen } from '../../../../layout';
import { Box, Button } from '../../../../components';
import { ControlledInput } from '../../../../components/Input';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../navigation/RootNavigation';
import { convertObjectToObjectWithKeys } from '../../../../utils/Formats';
import { ScrollView } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { PresonalInfoValid } from '../../../../utils/validations';

type Props = NativeStackScreenProps<RootStackParamList, 'PresonalInfo'> & {};

const FormValues = {
  first_name: '',
  last_name: '',
};

const FORM_VALUES = convertObjectToObjectWithKeys(FormValues);

const PresonalInfoScreen = ({ navigation }: Props) => {
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
          <Box
            style={{ marginTop: 'auto' }}
            borderTopColor="grey200"
            borderTopWidth={1}
            paddingVertical="l"
            paddingHorizontal="l">
            <Button
              label="تم"
              onPress={formMethods.handleSubmit(handleOnSubmit)}
            />
          </Box>
        </Box>
      </FormProvider>
    </ScrollView>
  );
};

export { PresonalInfoScreen };
