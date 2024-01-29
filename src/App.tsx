/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Button, SafeAreaView, StatusBar, StyleSheet, Text} from 'react-native';
import {useStore} from 'zustand';
import {useBoundStore} from './store';
import './localization';
import {useTranslation} from 'react-i18next';

function App(): React.JSX.Element {
  const bears = useBoundStore(state => state.bears);
  const fishes = useBoundStore(state => state.fishes);
  const addBear = useBoundStore(state => state.addBear);

  const {t} = useTranslation();
  return (
    <SafeAreaView>
      <StatusBar />

      <Text>{bears}</Text>
      <Text>{fishes}</Text>
      <Text>{t('translation:name')}</Text>

      <Button title="one up" onPress={addBear} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;
