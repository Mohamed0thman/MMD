import { create } from 'zustand';

type AppState = {
  hideTabBar: boolean;
  toggleTabBar: (hide: boolean) => void;
};

export const useAppStore = create<AppState>(set => ({
  hideTabBar: false,
  toggleTabBar: (hide: boolean) => set({ hideTabBar: hide }),
}));
