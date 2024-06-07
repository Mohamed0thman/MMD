/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { RootNavigation } from './navigation/RootNavigation';

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
import SplashScreen from 'react-native-splash-screen';

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

  const [loading, setLoading] = useState(true);

  const { user, hasHydrated } = useUserStore();
  const { fetchToken } = useAuthStore();

  const getToken = async () => await fetchToken(user?.name || '');

  useEffect(() => {
    if (hasHydrated) {
      SplashScreen.hide();
      getToken();
      setLoading(false);
    }
  }, [hasHydrated]);

  if (loading) return <></>;

  return (
    <ThemeProvider theme={themes[themeName as keyof typeof themes]}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <QueryClientProvider client={queryClient}>
              <FlashMessage
                style={{
                  paddingVertical: 20,
                }}
              />
              <RootScreen>
                <RootNavigation />
              </RootScreen>
            </QueryClientProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({});

export default App;
