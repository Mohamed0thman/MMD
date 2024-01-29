import AsyncStorage from '@react-native-async-storage/async-storage';
import {createJSONStorage, persist} from 'zustand/middleware';
import {StateCreator, create} from 'zustand';

interface BearSlice {
  bears: number;
  addBear: () => void;
  eatFish: () => void;
}

interface FishSlice {
  fishes: number;
  addFish: () => void;
}

export const createFishSlice: StateCreator<
  BearSlice & FishSlice,
  [],
  [],
  FishSlice
> = set => ({
  fishes: 0,
  addFish: () => set(state => ({fishes: state.fishes + 1})),
});

export const createBearSlice: StateCreator<
  BearSlice & FishSlice,
  [],
  [],
  BearSlice
> = set => ({
  bears: 0,
  addBear: () => set(state => ({bears: state.bears + 1})),
  eatFish: () => set(state => ({fishes: state.fishes - 1})),
});

export const useBoundStore = create<BearSlice & FishSlice>()(
  persist(
    (...a) => ({
      ...createBearSlice(...a),
      ...createFishSlice(...a),
    }),
    {name: 'bound-store', storage: createJSONStorage(() => AsyncStorage)},
  ),
);
