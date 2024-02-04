import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ControlledInput } from '../../../../components/Input';
import { convertObjectToObjectWithKeys } from '../../../../utils/Formats';
import { Box, Button } from '../../../../components';
import { RootScreen } from '../../../../layout';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../navigation/RootNavigation';

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

          <Box
            style={{ marginTop: 'auto' }}
            borderTopColor="grey200"
            borderTopWidth={1}
            paddingVertical="l"
            paddingHorizontal="l"
            gap="l">
            <Button
              label="انشاء حساب"
              onPress={() => navigation.navigate('main')}
            />
          </Box>
        </Box>
      </FormProvider>
    </ScrollView>
  );
};

export { LoginScreen };

const styles = StyleSheet.create({});
