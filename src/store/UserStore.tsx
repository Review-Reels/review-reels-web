import create from "zustand";
import { persist, devtools } from "zustand/middleware";

interface UserState {
  user: User | null | undefined;
  setUser: (user: User) => void;
  resetUser: () => void;
}

interface User {
  Authorization?: string;
  authType: string;
  createdAt: string;
  email: string;
  id: string;
  merchantName: string;
  name: string;
  picture?: string;
  username: string;
  emailVerified?: boolean;
}

export const useStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user: User) => set(() => ({ user: user })),
        resetUser: () => set({ user: null }),
      }),
      { name: "user-data" }
    )
  )
);
