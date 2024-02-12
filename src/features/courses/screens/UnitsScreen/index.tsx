import { ActivityIndicator, SectionList, SectionListData } from 'react-native';
import React from 'react';
import { useCoursesNavigation, useRouteNavigation } from '../../navigation';
import { useUnitsQuery } from '../../hooks/useUnitsQuery';
import { Box, Icons, StyledText } from '../../../../components';
import { Lesson } from '../../types';
import { useRestyleTheme } from '../../../../style/theme';
import { LessonItem } from '../../components/LessonItem';
import { isEven } from '../../../../utils/helpers';

const UnitsScreen = () => {
  const { levelId } = useRouteNavigation('Units').params;

  const { colors, spacing } = useRestyleTheme();
  const navigation = useCoursesNavigation();

  const { data, isLoading, refetch, isRefetching } = useUnitsQuery(levelId);

  const sectionData = data?.data.map(item => {
    return {
      title: item.title,
      data: item.lessons,
    };
  });

  const renderSectionHeader = ({
    section: { title },
  }: {
    section: SectionListData<Lesson>;
  }) => (
    <Box
      bg="mainBackground"
      paddingVertical="xs"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      alignSelf="center"
      gap="m"
      borderColor="primaryBackground"
      borderRadius="l"
      padding="l"
      borderWidth={1}
      marginBottom="l">
      <Box
        padding="l"
        backgroundColor="secondaryBackground"
        alignSelf="center"
        borderRadius="xl">
        <Icons icon="brain" />
      </Box>
      <StyledText variant="headingL" color="black">
        {title}
      </StyledText>
    </Box>
  );
  const renderItem = ({ item, index }: { item: Lesson; index: number }) => (
    <LessonItem
      lesson={item}
      onPress={() => navigation.navigate('Lesson', { lesson: item })}
      isEven={isEven(index)}
    />
  );

  return (
    <Box flex={1} backgroundColor="mainBackground">
      <Box
        backgroundColor="secondaryBackground"
        paddingVertical="s"
        paddingHorizontal="m"
        flexDirection="row"
        alignItems="center"
        gap="s">
        <Icons icon="book" stroke={colors.white} width={25} />
        <StyledText color="white" variant="headingL">
          المبتدئ
        </StyledText>
      </Box>
      <SectionList
        sections={sectionData || []}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ItemSeparatorComponent={() => <Box height={25} />}
        contentContainerStyle={{
          paddingVertical: spacing.m,
          paddingBottom: 150,
          paddingHorizontal: spacing.m,
        }}
        showsVerticalScrollIndicator={false}
        refreshing={isLoading || isRefetching}
        onRefresh={refetch}
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

export { UnitsScreen };
