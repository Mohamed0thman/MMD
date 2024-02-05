import { create } from 'zustand';
import { getToken } from '../utils/protectedStore';

type AuthState = {
  user: User | null;
  token: string | null;
};

type AuthActions = {
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  fetchToken: () => void;
};

export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  user: null,
  token: null,
  setUser: (user: User) => set({ user }),
  setToken: (token: string) => set({ token }),
  fetchToken: async () => await getToken(get().user?.name as string),
}));
