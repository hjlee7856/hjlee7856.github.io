import { create } from 'zustand';

type CategoryStore = {
  selectCategory: string;
  selectIdx: number;
  setCategory: (category: string) => void;
  setIndex: (index: number) => void;
};

const useCategoryStore = create<CategoryStore>((set) => ({
  selectCategory: '전체',
  selectIdx: 0,
  setCategory: (category) => set({ selectCategory: category }),
  setIndex: (index) => set({ selectIdx: index }),
}));

export default useCategoryStore;
