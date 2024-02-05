import React from 'react';
import { Image, Pressable, StatusBar } from 'react-native';

import { RootScreen } from '../../../../layout';
import {
  Box,
  Button,
  Icons,
  MappingList,
  StyledText,
} from '../../../../components';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useTranslation } from 'react-i18next';

import { IMAGES } from '../../../../constants';
import { useSettingStore } from '../../../../store';
import { useRestyleTheme } from '../../../../style/theme';
import { RootStackParamList } from '../../../../navigation/RootNavigation';
import { ButtonDock } from '../../../../components/Button';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'> & {};

const WelcomeScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const { colors } = useRestyleTheme();

  const { changeTheme, themeName } = useSettingStore();

  const options = [
    {
      id: 1,
      title: 'فتاه',
      icon: 'girl-head',
      theme: 'pink',
      fouce: colors.pinkPrimary,
      blur: colors.pinkSecondary,
    },
    {
      id: 2,
      title: 'صبي',
      icon: 'boy-head',
      theme: 'blue',
      fouce: colors.bluePrimary,
      blur: colors.blueSecondary,
    },
  ];

  const renderOptionItem = (item: any) => (
    <Pressable
      style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
      onPress={() => changeTheme(item.theme)}>
      <Box>
        <Box
          justifyContent="center"
          alignItems="center"
          p="xl"
          borderWidth={1}
          borderRadius="m"
          style={{
            borderColor: themeName === item.theme ? item.fouce : item.blur,
          }}>
          <Icons
            icon={item.icon}
            width={72}
            height={72}
            fill={themeName === item.theme ? item.fouce : item.blur}
          />
        </Box>
        <StyledText
          marginTop="m"
          textAlign="center"
          style={{ color: themeName === item.theme ? item.fouce : item.blur }}
          variant="headingL">
          {item.title}
        </StyledText>
      </Box>
    </Pressable>
  );

  return (
    <>
      <StatusBar
        translucent
        backgroundColor={
          themeName === 'blue' ? colors.bluePrimary : colors.pinkPrimary
        }
        barStyle={'light-content'}
      />
      <Box flex={1} backgroundColor="primaryBackground">
        <Box
          justifyContent="center"
          alignItems="center"
          flex={0.4}
          backgroundColor="transparent">
          <Image
            source={IMAGES.whiteLogo}
            resizeMode="contain"
            style={{
              width: 190,
              height: 190,
            }}
          />
        </Box>
        <Box
          flex={0.6}
          borderTopLeftRadius="xl"
          borderTopRightRadius="xl"
          backgroundColor="mainBackground"
          justifyContent="space-between">
          <Box paddingHorizontal="m" paddingTop="m">
            <StyledText
              variant="headingL"
              color="primaryBackground"
              textAlign="center">
              مرحباااا, هيا نبدأ
            </StyledText>
            <StyledText
              variant="headingL"
              color="primaryBackground"
              marginVertical="l">
              أختر شخصية
            </StyledText>
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center">
              <MappingList data={options} renderItem={renderOptionItem} />
            </Box>
          </Box>

          <ButtonDock>
            <Button
              title="أبدا"
              onPress={() => navigation.navigate('Onboarding')}
            />
          </ButtonDock>
        </Box>
      </Box>
    </>
  );
};

export { WelcomeScreen };
