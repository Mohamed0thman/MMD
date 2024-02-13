import React from 'react';
import { Box, StyledText } from '../../../../components';
import Carousel from '../../../../components/Carousel';

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

      <StyledText marginTop="l" color="mainBackground">
        هذا الجزء مخص بالعروض والاشتراكات
      </StyledText>
    </Box>
  );
};

export { HomeScreen };
