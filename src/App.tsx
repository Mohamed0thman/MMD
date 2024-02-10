/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import RootNavigation from './navigation/RootNavigation';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '@shopify/restyle';
import { theme, pinkTheme } from './style/theme';

import { useSettingStore } from './store/settingStore';

import './localization';
import { RootScreen } from './layout';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
import { useAuthStore, useUserStore } from './store/authStore';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

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

  const { user } = useUserStore();
  const { fetchToken } = useAuthStore();

  useEffect(() => {
    fetchToken(user?.name || '');
  }, [user]);

  return (
    <ThemeProvider theme={themes[themeName as keyof typeof themes]}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <BottomSheetModalProvider>
            <QueryClientProvider client={queryClient}>
              <RootScreen>
                <RootNavigation />
                <FlashMessage />
              </RootScreen>
            </QueryClientProvider>
          </BottomSheetModalProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({});

export default App;
