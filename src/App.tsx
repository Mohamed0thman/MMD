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
import { theme, pinkTheme } from './style/theme';

import { useSettingStore } from './store';

import './localization';
import { RootScreen } from './layout';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const queryClient = new QueryClient();

if (__DEV__) {
  // @ts-ignore
  import('./reactotronConfig').then(() => console.log('Reactotron Configured'));
}

const themes = {
  blue: theme,
  pink: pinkTheme,
};

function App(): React.JSX.Element {
  const { themeName } = useSettingStore();

  return (
    <ThemeProvider theme={themes[themeName as keyof typeof themes]}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <RootScreen>
            <RootNavigation />
          </RootScreen>
        </QueryClientProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({});

export default App;
