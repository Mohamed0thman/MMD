import { FlatList, ActivityIndicator } from 'react-native';
import React, { useCallback } from 'react';
import { Box, StyledText } from '../../../../components';
import { useLevelsQuery } from '../../hooks/useLevelsQuery';
import { LevelItem } from '../../components/LevelItem';
import { Level } from '../../types';
import { useCoursesNavigation } from '../../navigation';
import { useRestyleTheme } from '../../../../style/theme';
import { useUserStore } from '../../../../store/authStore';
import { isSubscriptionActive } from '../../../../utils/Formats';
import { showMessage } from 'react-native-flash-message';

const LevelsScreen = () => {
  const { data, isLoading, refetch, isRefetching } = useLevelsQuery();

  const navigation = useCoursesNavigation();
  const { user } = useUserStore();

  const renderItem = useCallback(
    ({ item }: { item: Level }) => (
      <LevelItem
        level={item}
        onPress={() => {
          const isActive = isSubscriptionActive(
            user?.subscription_expires_at as string,
          );

          if (isActive) {
            navigation.navigate('Units', { levelId: item.id });
          } else {
            showMessage({ message: 'انتهي مده الاشتراك', type: 'danger' });
          }
        }}
      />
    ),
    [],
  );

  return (
    <Box flex={1} backgroundColor="mainBackground" paddingVertical="l">
      <StyledText
        variant="headingL"
        color="black"
        marginBottom="m"
        marginHorizontal="l">
        مستويات الدراسة
      </StyledText>

      <FlatList
        keyExtractor={item => `levels- ${item.id}`}
        data={data?.data || []}
        style={{ flex: 1 }}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 12 }}
        refreshing={isLoading || isRefetching}
        onRefresh={refetch}
        ItemSeparatorComponent={() => <Box marginBottom="l" />}
        ListEmptyComponent={() =>
          isLoading || isRefetching ? (
            <></>
          ) : (
            <Box
              padding="l"
              backgroundColor="primaryBackground"
              borderRadius="l">
              <StyledText variant="headingM" color="white">
                سوف يتم رفع الدروس قريبا
              </StyledText>
            </Box>
          )
        }
      />
    </Box>
  );
};

export { LevelsScreen };
