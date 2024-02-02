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
  firstName: '',
  lastName: '',
};

const FORM_VALUES = convertObjectToObjectWithKeys(FormValues);

const LoginScreen = ({ navigation }: Props) => {
  const formMethods = useForm({
    defaultValues: FormValues,
  });

  return (
    <RootScreen>
      <FormProvider {...formMethods}>
        <Box flex={1} justifyContent="center" backgroundColor="mainBackground">
          <ControlledInput fieldName={FORM_VALUES.firstName} />
          <ControlledInput fieldName={FORM_VALUES.lastName} />

          <Button
            label="انشاء حساب"
            onPress={() => navigation.navigate('Welcome')}
          />
        </Box>
      </FormProvider>
    </RootScreen>
  );
};

export { LoginScreen };

const styles = StyleSheet.create({});
