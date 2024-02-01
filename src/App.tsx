/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet} from 'react-native';

// i18next
import './localization';
import RootNavigation from './navigation/RootNavigation';
import Message from './components/Message';

function App(): React.JSX.Element {
  return (
    <>
      <Message />
      <RootNavigation />
    </>
  );
}

const styles = StyleSheet.create({});

export default App;
