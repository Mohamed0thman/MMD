import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Share from 'react-native-share';
import { Button } from '../../../../components';

const HomeScreen = () => {
  const shareURL = async () => {
    try {
      const result = await Share.open({});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="dssad" onPress={shareURL} />
    </View>
  );
};

export { HomeScreen };
