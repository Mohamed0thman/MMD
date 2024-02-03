import { Pressable } from 'react-native';
import React from 'react';
import { Box, Icons, StyledText } from '../../../components';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

const Header = ({ navigation, options }: NativeStackHeaderProps) => {
  return (
    <Box
      flexDirection="row"
      alignItems="center"
      gap="m"
      justifyContent="flex-end"
      paddingVertical="m"
      paddingHorizontal="l">
      <StyledText variant="headingL" color="black">
        {options.title}
      </StyledText>
      <Pressable
        style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
        onPress={() => navigation.goBack()}>
        <Box
          width={42}
          height={42}
          backgroundColor="secondaryBackground"
          justifyContent="center"
          alignItems="center"
          style={{ borderRadius: 24 }}>
          <Icons icon="back" fill={'#fff'} />
        </Box>
      </Pressable>
    </Box>
  );
};

export { Header };
