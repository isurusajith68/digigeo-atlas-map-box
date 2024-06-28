import { create } from "zustand";

export const SearchClick = create((set) => ({
  isSearchBtnClick: false,
  setIsSearchBtnClick: (isSearchBtnClick) => set({ isSearchBtnClick }),
}));
