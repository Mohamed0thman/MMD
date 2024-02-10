import React from 'react';
import { Box, Icons, PressableBox, StyledText } from '../../../../components';
import { LessonItemProps } from '../../types';
import { useRestyleTheme } from '../../../../style/theme';
import DropShadow from 'react-native-drop-shadow';

const LessonItem = ({ lesson, isEven, onPress }: LessonItemProps) => {
  const { colors, spacing } = useRestyleTheme();
  return (
    <PressableBox
      onPress={onPress}
      alignSelf={isEven ? 'flex-end' : 'flex-start'}
      style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}>
      <DropShadow
        style={{
          shadowColor: colors.black,
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.5,
          shadowRadius: 5,
        }}>
        <Box
          padding="l"
          backgroundColor="orange"
          alignSelf="center"
          style={{ borderRadius: 1000 }}
          marginBottom="s">
          <DropShadow
            style={{
              shadowColor: colors.black,
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.3,
              shadowRadius: 5,
            }}>
            <Box
              padding="m"
              backgroundColor="yellow"
              style={{ borderRadius: 1000 }}
              justifyContent="center"
              alignItems="center">
              <Box flexDirection="row">
                <Icons icon="star" />
                <Icons icon="star" transform={[{ translateY: -spacing.s }]} />
                <Icons icon="star" />
              </Box>
              <Icons icon="back-hand" />
            </Box>
          </DropShadow>
        </Box>
      </DropShadow>
      <StyledText
        textAlign="center"
        color="primaryBackground"
        variant="headingL">
        {lesson.title}
      </StyledText>
    </PressableBox>
  );
};

export { LessonItem };
