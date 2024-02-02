/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StyleSheet } from 'react-native';

import RootNavigation from './navigation/RootNavigation';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '@shopify/restyle';
import { theme } from './style/theme';

import './localization';

export const queryClient = new QueryClient();

if (__DEV__) {
  // @ts-ignore
  import('./reactotronConfig').then(() => console.log('Reactotron Configured'));
}

function App(): React.JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RootNavigation />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({});

export default App;
