import create from "zustand";

interface UnReadState {
  unRead: number;
  setUnRead: (value: number) => void;
}

export const useUnReadStore = create<UnReadState>()((set) => ({
  unRead: 0,
  setUnRead: (unRead: number) => set(() => ({ unRead })),
}));
