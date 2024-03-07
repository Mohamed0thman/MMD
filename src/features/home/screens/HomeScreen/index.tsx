import React from 'react';
import { Box, Button, StyledText } from '../../../../components';
import Carousel from '../../../../components/Carousel';
import { FlatList } from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import { COLORS } from '../../../../constants';

const meza = [
  'توفير حزمة شاملة للتعلم الذهني تشمل موارد متعددة ومتنوعة',
  'تقديم خطة دراسية مُنظمة ومرتبة لتسهيل عملية التعلم',
  'تقديم محتوى تعليمي ذكي ومتقدم يتناسب مع احتياجات الطلاب',
  'توفير دعم فني فعّال للمشتركين في الدورة لحل أي مشكلات تقنية أو تعليمية',
];

const HomeScreen = () => {
  const renderItem = (item: any) => (
    <Box
      backgroundColor="primaryBackground"
      paddingVertical="m"
      paddingHorizontal="m"
      gap="m"
      borderRadius="m">
      <StyledText variant="headingM" color="white">
        أهلا بك في تطبيق MMD لتعليم الحساب الذهني
      </StyledText>
      <StyledText variant="labelL" color="white">
        ابدا الان في تعلم الحساب الذهني
      </StyledText>
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
          backgroundColor="mainBackground"
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
      <Carousel
        data={[
          {
            id: 1,
            title: 'أهلا بك في تطبيق MMD لتعليم الحساب الذهني',
            subtitle: 'ابدا الان في تعلم الحساب الذهني',
          },
          {
            id: 1,
            title: 'أهلا بك في تطبيق MMD لتعليم الحساب الذهني',
            subtitle: 'ابدا الان في تعلم الحساب الذهني',
          },
        ]}
        carouselItem={renderItem}
      />

      <Box flex={1}>
        <StyledText
          marginHorizontal="m"
          marginTop="l"
          color="black"
          variant="headingL">
          منصة MMD تضمن لك
        </StyledText>

        <FlatList
          data={meza}
          renderItem={renderMezaItem}
          contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 12 }}
          ItemSeparatorComponent={() => <Box marginTop="l" />}
          ListFooterComponent={() => (
            <Button title="اشترك الان" marginTop="l" />
          )}
        />
      </Box>
    </Box>
  );
};

export { HomeScreen };
