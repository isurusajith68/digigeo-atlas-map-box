import { create } from "zustand";

export const useSearchClick = create((set) => ({
  isSearchBtnClick: false,
  setIsSearchBtnClick: (isSearchBtnClick) => set({ isSearchBtnClick }),
}));
