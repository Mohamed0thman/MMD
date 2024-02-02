/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StyleSheet } from 'react-native';

import RootNavigation from './navigation/RootNavigation';
import Message from './components/Message';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './localization';

export const queryClient = new QueryClient();

if (__DEV__) {
  // @ts-ignore
  import('./reactotron');
}

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Message />
      <RootNavigation />
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({});

export default App;
