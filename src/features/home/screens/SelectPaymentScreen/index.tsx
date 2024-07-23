import React from 'react';
import { Box, Button, StyledText } from '../../../../components';
import { useHomeNavigation } from '../../navigation';
import { API_URL } from '@env';

export const SelectPaymentScreen = () => {
  const { navigate } = useHomeNavigation();

  return (
    <Box
      flex={1}
      backgroundColor="white"
      justifyContent="center"
      alignItems="center"
      paddingHorizontal="l">
      <Box
        borderWidth={1}
        borderColor="black"
        width={'100%'}
        padding="l"
        justifyContent="center"
        alignItems="center"
        marginBottom="l"
        borderRadius="l">
        <StyledText
          textAlign="center"
          color="black"
          variant="headingL"
          marginBottom="l">
          الآشتراك الشهري بمبلغ {'\n'} 49 ريال
        </StyledText>
        <Button
          title="آشترك الآن"
          onPress={() =>
            navigate('Payment', {
              url: `${API_URL}/payment/checkout?subscription_type=monthly`,
            })
          }
        />
      </Box>

      <Box
        borderWidth={1}
        borderColor="black"
        width={'100%'}
        padding="l"
        justifyContent="center"
        alignItems="center"
        marginBottom="l"
        borderRadius="l">
        <StyledText
          textAlign="center"
          color="black"
          variant="headingL"
          marginBottom="l">
          الآشتراك السنوي بمبلغ {'\n'} 499 ريال
        </StyledText>
        <Button
          title="آشترك الآن"
          onPress={() =>
            navigate('Payment', {
              url: `${API_URL}/payment/checkout?subscription_type=annually`,
            })
          }
        />
      </Box>
    </Box>
  );
};
