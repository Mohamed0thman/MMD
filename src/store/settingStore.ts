import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';
import { StateCreator, create } from 'zustand';

export type Lang = 'en' | 'ar' | null;

type SettingState = {
  themeName: string;
  lang: Lang;
};

type SettingActions = {
  changeTheme: (theme: string) => void;
  changeLang: (lang: Lang) => void;
};

const settingSlice: StateCreator<
  SettingState & SettingActions,
  [['zustand/persist', unknown]]
> = set => ({
  themeName: 'blue',
  lang: null,
  changeTheme: themeName => set({ themeName }),
  changeLang: lang => set({ lang }),
});

export const useSettingStore = create<SettingState & SettingActions>()(
  persist(settingSlice, {
    name: 'setting-store',
    storage: createJSONStorage(() => AsyncStorage),
  }),
);
