import { create } from 'zustand';

type Aturan = {
  counter: number;
  plus: () => void;
  min: () => void;
};

export const test2 = create<Aturan>((set) => ({
  counter: 0,
  plus: () => set((state) => ({ counter: state.counter + 1 })),
  min: () => set((state) => ({ counter: state.counter - 1 })),
}));
