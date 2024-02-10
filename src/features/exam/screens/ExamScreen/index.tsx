import React, { useCallback, useRef, useState } from 'react';
import {
  Box,
  CustomBottomSheet,
  Icons,
  PressableBox,
  StyledText,
} from '../../../../components';
import { useRestyleTheme } from '../../../../style/theme';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Keyboard, Switch } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useForm } from 'react-hook-form';
import {
  ExamSettingDataKey,
  ExamSettingKey,
  examSettingData,
  examSittings,
} from '../../examSettingData';

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
  const { colors } = useRestyleTheme();
  const [selectedOption, setSelectedOtion] =
    useState<null | ExamSettingDataKey>(null);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { setValue, getValues } = useForm({
    defaultValues: FormValues,
  });
  const handlePresentModalPress = useCallback((key: ExamSettingDataKey) => {
    setSelectedOtion(key);
    Keyboard.dismiss();
    bottomSheetModalRef.current?.present();
  }, []);

  const selectOption = (name: keyof typeof FormValues, value: any) => {
    setValue(name, value);
    bottomSheetModalRef.current?.dismiss();
  };

  const renderItem = ({ item }: { item: (typeof examSittings)[0] }) => {
    return (
      <Box>
        {item.type === 'options' ? (
          <PressableBox
            onPress={() =>
              handlePresentModalPress(item.name as ExamSettingDataKey)
            }
            style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}>
            <StyledText></StyledText>
          </PressableBox>
        ) : (
          <Switch
            value={getValues(item.name as keyof typeof FormValues) as boolean}
            onValueChange={value =>
              selectOption(item.name as keyof typeof FormValues, value)
            }
          />
        )}
        <StyledText>{item.title}</StyledText>
      </Box>
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
      />

      <CustomBottomSheet ref={bottomSheetModalRef}>
        <FlatList
          data={
            examSettingData[selectedOption as keyof typeof examSettingData] ||
            []
          }
          renderItem={() => <></>}
        />
      </CustomBottomSheet>
    </Box>
  );
};

export { ExamScreen };
