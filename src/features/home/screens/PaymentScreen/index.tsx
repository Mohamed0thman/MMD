import React from 'react';
import WebView from 'react-native-webview';
import { Box } from '../../../../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  HomeNavigationScreenParamsList,
  useHomeNavigation,
} from '../../navigation';
import { useAuthStore } from '../../../../store/authStore';

type Props = NativeStackScreenProps<HomeNavigationScreenParamsList, 'Payment'>;

export const PaymentScreen = ({ route }: Props) => {
  const { url } = route.params;
  const { token } = useAuthStore();
  const { navigate } = useHomeNavigation();

  return (
    <Box flex={1} backgroundColor="white">
      <WebView
        textZoom={100}
        source={{
          uri: url,
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }}
        style={{ flex: 1 }}
        scalesPageToFit={false}
        onNavigationStateChange={navState => {
          console.log('navState.url ', navState);

          const containsApproved = navState.url.includes('APPROVED');
          const containsFailed = navState.url.includes('failed');

          if (containsApproved) {
            setTimeout(() => {
              navigate('Home');
            }, 2000);
          } else if (containsFailed) {
            setTimeout(() => {
              navigate('Select');
            }, 2000);
          }
        }}
      />
    </Box>
  );
};
