import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';
import { StateCreator, create } from 'zustand';

type SettingState = {
  themeName: string;
};

type SettingActions = {
  changeTheme: (theme: string) => void;
};

const settingSlice: StateCreator<
  SettingState & SettingActions,
  [['zustand/persist', unknown]]
> = set => ({
  themeName: 'blue',
  changeTheme: (themeName: string) => set({ themeName }),
});

export const useSettingStore = create<SettingState & SettingActions>()(
  persist(settingSlice, {
    name: 'setting-store',
    storage: createJSONStorage(() => AsyncStorage),
  }),
);
