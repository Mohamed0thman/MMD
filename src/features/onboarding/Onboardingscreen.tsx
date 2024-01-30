import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RootScreen} from '../../layout';
import {Button} from '../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {COLORS} from '../../constants';
import {UnAuthStackParamList} from '../../navigation/UnAuthStack';

type Props = NativeStackScreenProps<UnAuthStackParamList, 'Onboarding'> & {};

const Onboardingscreen = ({navigation}: Props) => {
  return (
    <RootScreen>
      <Text>أنشئ حسابا لحفظ نتائج اختبارك</Text>
      <Text>عمليه سريعه تمكنك استخدام جميع الدروس</Text>

      <View
        style={{
          marginTop: 'auto',
          borderWidth: 1,
          borderTopColor: COLORS.darkGrey,
          paddingVertical: 20,
        }}>
        <Button
          title={'انشاء حساب'}
          onPress={() => navigation.navigate('PresonalInfo')}
        />
        <Button
          title={'لدي حساب بالفعل'}
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </RootScreen>
  );
};

export {Onboardingscreen};

const styles = StyleSheet.create({});
