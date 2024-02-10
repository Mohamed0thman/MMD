import React, { useCallback, useRef, useState } from 'react';
import {
  Box,
  Button,
  CustomBottomSheet,
  Icons,
  PressableBox,
  RadioIndicator,
  StyledText,
} from '../../../../components';
import { useRestyleTheme } from '../../../../style/theme';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Keyboard, Switch } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useForm } from 'react-hook-form';
import {
  ExamSettingDataKey,
  examSettingData,
  examSittings,
} from '../../examSettingData';
import { useExamSettingStore } from '../../../../store/examSetting';

const FormValues = {
  digits: 1,
  showDelay: 15,
  clearDelay: 15,
  numOfOperations: 1,
  level: 0,
  subtraction: false,
  sound: false,
  showKeboard: false,
};

const ExamScreen = () => {
  const { colors, spacing } = useRestyleTheme();
  const [selectedOption, setSelectedOtion] =
    useState<ExamSettingDataKey>('digits');

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const { changeExamSettings, examSettings } = useExamSettingStore();

  const { control } = useForm({
    defaultValues: examSettings,
  });
  const handlePresentModalPress = useCallback((key: ExamSettingDataKey) => {
    setSelectedOtion(key);
    Keyboard.dismiss();
    bottomSheetModalRef.current?.present();
  }, []);

  console.log('examSettings', examSettings);

  const renderItem = ({ item }: { item: (typeof examSittings)[0] }) => {
    return (
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <Box flex={0.8}>
          <StyledText variant="headingL" color="black">
            {item.title}
          </StyledText>
        </Box>

        {item.type === 'options' ? (
          <PressableBox
            borderWidth={1}
            borderColor="primaryBackground"
            padding="m"
            flex={0.2}
            justifyContent="center"
            alignItems="center"
            onPress={() => {
              handlePresentModalPress(item.name as ExamSettingDataKey);
            }}
            style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}>
            <StyledText variant="headingM" color="primaryBackground">
              {examSettings[item.name as keyof typeof examSettings]}
            </StyledText>
          </PressableBox>
        ) : (
          <Switch
            value={
              examSettings[item.name as keyof typeof examSettings] as boolean
            }
            onValueChange={switchValue => {
              changeExamSettings({
                [item.name]: switchValue,
              });
            }}
            thumbColor={
              examSettings[item.name as keyof typeof examSettings]
                ? colors.primaryBackground
                : colors.white
            }
          />
        )}
      </Box>
    );
  };

  const renderSelection = (
    item: { label: string; value: number },
    selectedSetting: string,
  ) => {
    return (
      <PressableBox
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        onPress={() => {
          changeExamSettings({
            [selectedSetting]: item.value,
          });

          bottomSheetModalRef.current?.dismiss();
        }}>
        <StyledText variant="headingM" color="black">
          {item.label}
        </StyledText>
        <RadioIndicator
          status={
            examSettings[selectedSetting as keyof typeof examSettings] ==
            item.value
              ? 'active'
              : 'inactive'
          }
        />
      </PressableBox>
    );
  };

  return (
    <Box flex={1} backgroundColor="mainBackground">
      <Box
        backgroundColor="secondaryBackground"
        paddingVertical="s"
        alignItems="center"
        flexDirection="row"
        paddingHorizontal="m"
        gap="s">
        <Icons icon="calculator" width={24} height={24} fill={colors.white} />
        <StyledText color="white" variant="headingL">
          أختبار الحساب السريع
        </StyledText>
      </Box>

      <FlatList
        keyExtractor={item => `exam-setting-${item.id}`}
        data={examSittings}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: spacing.m,
          paddingTop: spacing.l,
          paddingBottom: 200,
        }}
        ItemSeparatorComponent={() => <Box mb="l" />}
        ListFooterComponent={() => <Button title="أبدأ" mt="l" />}
        showsVerticalScrollIndicator={false}
      />

      <CustomBottomSheet ref={bottomSheetModalRef}>
        <FlatList
          keyExtractor={(_item, index) => `setting-selection${index}`}
          data={
            examSettingData[selectedOption as keyof typeof examSettingData] ||
            []
          }
          renderItem={({ item }) => renderSelection(item, selectedOption)}
          contentContainerStyle={{
            paddingHorizontal: spacing.m,
            paddingBottom: 100,
          }}
          ItemSeparatorComponent={() => <Box mb="l" />}
        />
      </CustomBottomSheet>
    </Box>
  );
};

export { ExamScreen };
