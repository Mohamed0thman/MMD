import React from 'react';
import { Box, Button, StyledText } from '../../../../components';
import Carousel from '../../../../components/Carousel';
import { FlatList, Image } from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import { COLORS, IMAGES } from '../../../../constants';
import { useHomeNavigation } from '../../navigation';

import { API_URL } from '@env';

const meza = [
  'توفير حزمة شاملة للتعلم الذهني تشمل موارد متعددة ومتنوعة',
  'تقديم خطة دراسية مُنظمة ومرتبة لتسهيل عملية التعلم',
  'تقديم محتوى تعليمي ذكي ومتقدم يتناسب مع احتياجات الطلاب',
  'توفير دعم فني فعّال للمشتركين في الدورة لحل أي مشكلات تقنية أو تعليمية',
];

const HomeScreen = () => {
  const { navigate } = useHomeNavigation();
  const renderItem = (item: any) => (
    <Box backgroundColor="primaryBackground" borderRadius="m" overflow="hidden">
      <Image
        source={item.image}
        style={{ height: 200, width: '100%' }}
        resizeMode="cover"
      />
      <Box paddingVertical="m" paddingHorizontal="m" gap="m">
        <StyledText variant="headingM" color="white">
          أهلا بك في تطبيق MMD لتعليم الحساب الذهني
        </StyledText>
        <StyledText variant="labelL" color="white">
          ابدا الان في تعلم الحساب الذهني
        </StyledText>
      </Box>
    </Box>
  );

  const renderMezaItem = ({ item }: { item: string }) => {
    return (
      <DropShadow
        style={[
          {
            shadowColor: COLORS.black,
            shadowOffset: {
              width: 0,
              height: -3,
            },
            shadowOpacity: 0.2,
            shadowRadius: 4,
          },
        ]}>
        <Box
          paddingVertical="m"
          backgroundColor="success300"
          paddingHorizontal="s"
          borderRadius="l">
          <StyledText variant="headingM" color="black">
            {item}
          </StyledText>
        </Box>
      </DropShadow>
    );
  };

  return (
    <Box flex={1} backgroundColor="mainBackground">
      <Box flex={1}>
        <FlatList
          data={meza}
          showsVerticalScrollIndicator={false}
          renderItem={renderMezaItem}
          ListHeaderComponent={() => (
            <>
              <Carousel
                data={[
                  {
                    id: 1,
                    title: 'أهلا بك في تطبيق MMD لتعليم الحساب الذهني',
                    subtitle: 'ابدا الان في تعلم الحساب الذهني',
                    image: IMAGES.boyPuzzles,
                  },
                  {
                    id: 2,
                    title: 'أهلا بك في تطبيق MMD لتعليم الحساب الذهني',
                    subtitle: 'ابدا الان في تعلم الحساب الذهني',
                    image: IMAGES.boyToys,
                  },
                  {
                    id: 3,
                    title: 'أهلا بك في تطبيق MMD لتعليم الحساب الذهني',
                    subtitle: 'ابدا الان في تعلم الحساب الذهني',
                    image: IMAGES.shcoolGirl,
                  },
                ]}
                carouselItem={renderItem}
              />
              <StyledText
                marginHorizontal="m"
                marginVertical="l"
                color="black"
                variant="headingL">
                منصة MMD تضمن لك
              </StyledText>
            </>
          )}
          contentContainerStyle={{
            paddingHorizontal: 15,
            paddingVertical: 12,
            paddingBottom: 200,
          }}
          ItemSeparatorComponent={() => <Box marginTop="l" />}
          ListFooterComponent={() => (
            <>
              <Button
                title="اشترك الان"
                marginTop="l"
                onPress={() => navigate('Select')}
              />
            </>
          )}
        />
      </Box>
    </Box>
  );
};

export { HomeScreen };
