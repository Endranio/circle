import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

type User = {
  fullname: string;
  username: string;
  followersCount: number;
  followingsCount: number;
  avatarUrl: string;
  background: string;
  bio?: string;
};

type useAuthStore = {
  user: User;
  setUser: (payload: User) => void;
};

export const useAuthStore = create<useAuthStore>()(
  devtools(
    persist(
      (set) => ({
        user: {} as User,
        setUser: (payload: User) =>
          set((state) => ({ user: { ...state.user, ...payload } })),
      }),
      {
        name: 'auth-storage',
      }
    )
  )
);
