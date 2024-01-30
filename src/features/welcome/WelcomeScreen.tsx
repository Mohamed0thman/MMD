import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RootScreen} from '../../layout';
import {COLORS, IMAGES, SCALE, FONTS} from '../../constants';
import {Button, Icons} from '../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {UnAuthStackParamList} from '../../navigation/UnAuthStack';
import {useTranslation} from 'react-i18next';

type Props = NativeStackScreenProps<UnAuthStackParamList, 'Welcome'> & {};

const WelcomeScreen = ({navigation}: Props) => {
  const {t} = useTranslation();
  return (
    <RootScreen
      statusBarConfig={{
        translucent: true,
        backgroundColor: 'transparent',
        barStyle: 'light-content',
      }}>
      <View style={styles.imageContainer}>
        <Image
          source={IMAGES.whiteLogo}
          resizeMode="contain"
          style={{
            width: 190,
            height: 190,
          }}
        />
      </View>
      <View style={{flex: 0.6}}>
        <Text>{t('app.')}</Text>
        <Text>مرحباااا, هيا نبدأ</Text>
        <Text>أختر شخصية</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          {[
            {id: 1, title: 'فتاه', icon: 'girl-head'},
            {id: 2, title: 'صبي', icon: 'boy-head'},
          ].map(item => (
            <View key={item.id}>
              <View
                style={{
                  padding: 30,
                  borderColor: COLORS.darkGrey,
                  borderWidth: 1,
                }}>
                <Icons varinat={item.icon} width={72} height={72} />
              </View>
              <Text style={{textAlign: 'center', marginTop: 10}}>
                {item.title}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <Button
        title={'أبدأ'}
        onPress={() => navigation.navigate('Onboarding')}
      />
    </RootScreen>
  );
};

export {WelcomeScreen};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 0.4,
    backgroundColor: COLORS.primary,
    borderBottomStartRadius: 50,
    borderBottomEndRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
