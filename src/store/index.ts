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

// interface BearSlice {
//   bears: number;
//   addBear: () => void;
//   eatFish: () => void;
// }

// interface FishSlice {
//   fishes: number;
//   addFish: () => void;
// }

// export const createFishSlice: StateCreator<
//   BearSlice & FishSlice,
//   [],
//   [],
//   FishSlice
// > = set => ({
//   fishes: 0,
//   addFish: () => set(state => ({ fishes: state.fishes + 1 })),
// });

// export const createBearSlice: StateCreator<
//   BearSlice & FishSlice,
//   [],
//   [],
//   BearSlice
// > = set => ({
//   bears: 0,
//   addBear: () => set(state => ({ bears: state.bears + 1 })),
//   eatFish: () => set(state => ({ fishes: state.fishes - 1 })),
// });

// export const useBoundStore = create<BearSlice & FishSlice>()(
// persist(
//   (...a) => ({
//     ...createBearSlice(...a),
//     ...createFishSlice(...a),
//   }),
//   { name: 'bound-store', storage: createJSONStorage(() => AsyncStorage) },
// ),
// );
