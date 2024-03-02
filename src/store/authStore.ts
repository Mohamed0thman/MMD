import { create } from 'zustand';
import { getToken } from '../utils/protectedStore';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FetchTokenFunction = (username: string) => Promise<void>;

type UserSliced = {
  user: User | null;
  hasHydrated: boolean;

  setUser: (user: User) => void;
  logout: () => void;
};

type AuthSlice = {
  token: string | null;
  setToken: (token: string) => void;
  fetchToken: FetchTokenFunction;
};

export const useUserStore = create<
  UserSliced,
  [['zustand/persist', UserSliced & AuthSlice]]
>(
  persist(
    set => ({
      user: null,
      hasHydrated: false,
      setUser: (user: User) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => () => {
        useUserStore.setState({ hasHydrated: true });
      },
    },
  ),
);

export const useAuthStore = create<AuthSlice>(set => ({
  token: null,
  setToken: (token: string) => set({ token }),
  fetchToken: async (username: string) =>
    set({ token: await getToken(username || '') }),
}));
