import React from 'react';
import { Box } from '../../components';
import LottieView from 'lottie-react-native';
import { useMainNavigation } from '../../navigation/RootNavigation';
import { useAuthStore, useUserStore } from '../../store/authStore';

export const SplashScreen = () => {
  const { reset } = useMainNavigation();
  const { token } = useAuthStore();
  const { user } = useUserStore();

  return (
    <Box flex={1} backgroundColor="white">
      <LottieView
        style={{ flex: 1 }}
        source={require('../../assets/images/logoAnimation.json')}
        autoPlay
        loop={false}
        onAnimationFinish={() => {
          if (!token || !user?.email_verified_at) {
            reset({
              index: 0,
              routes: [{ name: 'Onboarding' }],
            });
          } else {
            reset({
              index: 0,
              routes: [{ name: 'main' }],
            });
          }
        }}
      />
    </Box>
  );
};
