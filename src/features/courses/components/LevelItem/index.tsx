import React from 'react';
import { Box, PressableBox, StyledText } from '../../../../components';
import { LevelItemProps } from '../../types';
import DropShadow from 'react-native-drop-shadow';

const LevelItem = ({ level, onPress }: LevelItemProps) => {
  return (
    <DropShadow
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      }}>
      <PressableBox
        flexDirection="row"
        backgroundColor="mainBackground"
        borderRadius="l"
        overflow="hidden"
        onPress={onPress}>
        <Box
          flex={4}
          justifyContent="center"
          borderRadius="l"
          alignItems="center"
          backgroundColor="primaryBackground">
          <StyledText color="white" variant="headingM">
            {level.title}
          </StyledText>
        </Box>
        <Box
          flex={6}
          paddingHorizontal="m"
          paddingVertical="l"
          borderRadius="l">
          <StyledText
            color="black"
            textAlign="center"
            variant="headingL"
            marginBottom="s">
            {level.subtitle}
          </StyledText>
          <Box
            flexDirection="row"
            marginBottom="s"
            justifyContent="space-between">
            <StyledText color="black" variant="headingS">
              عدد الوحدات
            </StyledText>
            <StyledText color="black" variant="headingS">
              {level.units_count}
            </StyledText>
          </Box>
          <Box flexDirection="row" justifyContent="space-between">
            <StyledText color="black" variant="headingS">
              عدد الدروس
            </StyledText>
            <StyledText color="black" variant="headingS">
              {level.user_lesson_reads} / {level.lessons_count}
            </StyledText>
          </Box>
        </Box>
      </PressableBox>
    </DropShadow>
  );
};

export { LevelItem };
