import { StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';
import {
  Box,
  Button,
  CountdownTimer,
  StyledText,
} from '../../../../components';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useRestyleTheme } from '../../../../style/theme';
import { useVerifyMutation } from '../../hooks/useVerifyMutation';
import { showMessage } from 'react-native-flash-message';
import { useUserStore } from '../../../../store/authStore';
import { useResendCodeMutation } from '../../hooks/useResendCode';
import { ButtonDock } from '../../../../components/Button';
import { useAuthRoute } from '../../navigation';
import { useMainNavigation } from '../../../../navigation/RootNavigation';

const CELL_COUNT = 4;

const OtpScreen = () => {
  const navigation = useMainNavigation();
  const { params } = useAuthRoute('Otp');
  const user = params!;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const { colors } = useRestyleTheme();

  const { setUser } = useUserStore();

  const { isPending, mutate: verify } = useVerifyMutation({
    async onSuccess(data) {
      if (data.success) {
        showMessage({
          message: data.message,
          type: 'success',
        });
        setUser({ ...user, email_verified_at: new Date() });
        navigation.navigate('main', { screen: 'Courses' });
      } else {
        showMessage({
          message: data.message,
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

  const { isPending: resendLoading, mutate: resend } = useResendCodeMutation({
    async onSuccess(data) {
      if (data.success) {
        showMessage({
          message: data.message,
          type: 'success',
        });
      } else {
        showMessage({
          message: data.message,
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

  console.log(value);

  const handleOnSubmit = () => {
    verify({ code: value });
  };

  return (
    <Box flex={1} backgroundColor="mainBackground" paddingTop="l">
      <StyledText
        variant="headingM"
        color="black"
        textAlign="center"
        marginHorizontal="m">
        تم ارسال الكود الي {'\n'} {'\n'}{' '}
        <StyledText color="primaryBackground"> {user.email}</StyledText>
      </StyledText>
      <Box flex={1} justifyContent="center" paddingHorizontal="l">
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[
                styles.cell,
                symbol || isFocused
                  ? {
                      borderColor: colors.primaryBackground,
                      color: colors.primaryBackground,
                    }
                  : {},
              ]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />

        <CountdownTimer duration={30} onResendCode={resend} />
      </Box>
      <ButtonDock>
        <Button isLoading={isPending} title="تم" onPress={handleOnSubmit} />
      </ButtonDock>
    </Box>
  );
};

export { OtpScreen };

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    borderRadius: 5,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
});
