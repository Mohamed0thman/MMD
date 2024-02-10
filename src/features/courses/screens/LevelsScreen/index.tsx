import { FlatList } from 'react-native';
import React, { useCallback } from 'react';
import { Box, StyledText } from '../../../../components';
import { useLevelsQuery } from '../../hooks/useLevelsQuery';
import { LevelItem } from '../../components/LevelItem';
import { Level } from '../../types';
import { useCoursesNavigation } from '../../navigation';

const LevelsScreen = () => {
  const { data, isLoading, refetch, isRefetching } = useLevelsQuery();

  const navigation = useCoursesNavigation();

  const renderItem = useCallback(
    ({ item }: { item: Level }) => (
      <LevelItem
        level={item}
        onPress={() => navigation.navigate('Units', { levelId: item.id })}
      />
    ),
    [],
  );

  if (isLoading || isRefetching) return <StyledText>...loading</StyledText>;

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
        data={data.data || []}
        style={{ flex: 1 }}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 12 }}
        refreshing={isLoading}
        onRefresh={refetch}
        ItemSeparatorComponent={() => <Box marginBottom="l" />}
      />
    </Box>
  );
};

export { LevelsScreen };
