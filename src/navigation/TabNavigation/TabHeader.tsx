import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { Box, Icons } from '../../components';

const TabHeader = ({}: BottomTabHeaderProps) => {
  return (
    <Pressable style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <Text>TabHeader</Text>
        <Box borderRadius="l">
          <Icons icon="boy-head" width={55} height={55} />
        </Box>
      </Box>
    </Pressable>
  );
};

export { TabHeader };
