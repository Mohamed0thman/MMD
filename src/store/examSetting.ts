import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type ExamSettingType = {
  digits: number;
  showDelay: number;
  clearDelay: number;
  numOfOperations: number;
  level: number;
  subtraction: boolean;
  sound: boolean;
  showKeboard: boolean;
};

type ExamSettingState = {
  examSettings: ExamSettingType;
  changeExamSettings: (newSetting: { [x: string]: any }) => void;
};

const useExamSettingStore = create<
  ExamSettingState,
  [['zustand/persist', ExamSettingState]]
>(
  persist(
    (set, get) => ({
      examSettings: {
        digits: 1,
        showDelay: 15,
        clearDelay: 15,
        numOfOperations: 2,
        level: 0,
        subtraction: true,
        sound: false,
        showKeboard: true,
      },
      changeExamSettings: (newSetting: { [x: string]: any }) =>
        set({ examSettings: { ...get().examSettings, ...newSetting } }),
    }),
    {
      name: 'exam-settings-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export { useExamSettingStore, type ExamSettingType };
