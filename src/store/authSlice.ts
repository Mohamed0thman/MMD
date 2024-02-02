import { create } from 'zustand';

type AuthState = {
  token: string | null;
};

type AuthActions = {
  setUser: (user: any) => void;
};

export const useAuthStore = create<AuthState & AuthActions>(set => ({
  token: null,
  setUser: (user: any) => set({ ...user }),
}));
