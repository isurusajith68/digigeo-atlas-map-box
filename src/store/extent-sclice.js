import { create } from "zustand";

export const useBoundingBox = create((set) => ({
  boundingBox: [],
  setBoundingBox: (boundingBox) => set({ boundingBox }),
}));
