import create from "zustand";
import { persist, devtools } from "zustand/middleware";

interface UserState {
  user: object;
  setUser: (user: object) => void;
  resetUser: () => void;
}

export const useStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: {},
        setUser: (user) => set(() => ({ user: user })),
        resetUser: () => set({ user: {} }),
      }),
      { name: "user-data" }
    )
  )
);
