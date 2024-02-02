import { Image, Text } from 'react-native';
import React from 'react';

import { RootScreen } from '../../../../layout';
import { Box, Button, Icons, StyledText } from '../../../../components';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingNavigationScreenParamsList } from '../../navigation';

import { useTranslation } from 'react-i18next';

import { COLORS, IMAGES } from '../../../../constants';

type Props = NativeStackScreenProps<
  OnboardingNavigationScreenParamsList,
  'Welcome'
> & {};

const WelcomeScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();
  return (
    <RootScreen
      statusBarConfig={{
        translucent: true,
        backgroundColor: 'transparent',
        barStyle: 'light-content',
      }}>
      <Box
        justifyContent="center"
        alignItems="center"
        flex={0.4}
        backgroundColor="primary">
        <Image
          source={IMAGES.whiteLogo}
          resizeMode="contain"
          style={{
            width: 190,
            height: 190,
          }}
        />
      </Box>
      <Box style={{ flex: 0.6 }}>
        <Text>{t('')}</Text>
        <StyledText>مرحباااا, هيا نبدأ</StyledText>
        <StyledText>أختر شخصية</StyledText>
        <Box style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          {[
            { id: 1, title: 'فتاه', icon: 'girl-head' },
            { id: 2, title: 'صبي', icon: 'boy-head' },
          ].map(item => (
            <Box key={item.id}>
              <Box
                style={{
                  padding: 30,
                  borderColor: COLORS.darkGrey,
                  borderWidth: 1,
                }}>
                <Icons varinat={item.icon} width={72} height={72} />
              </Box>
              <StyledText style={{ textAlign: 'center', marginTop: 10 }}>
                {item.title}
              </StyledText>
            </Box>
          ))}
        </Box>
      </Box>

      <Button
        title={'أبدأ'}
        onPress={() => navigation.navigate('Onboarding')}
      />
    </RootScreen>
  );
};

export { WelcomeScreen };
