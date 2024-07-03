import { create } from "zustand";

export const usePropertyLabelVisibility = create((set) => ({
  propertyLabelVisibility: true,
  setPropertyLabelVisibility: (propertyLabelVisibility) =>
    set({ propertyLabelVisibility }),
}));

export const usePropertyPointsVisibility = create((set) => ({
  propertyPointsVisibility: true,
  setPropertyPointsVisibility: (propertyPointsVisibility) =>
    set({ propertyPointsVisibility }),
}));

export const usePropertyOutlinesVisibility = create((set) => ({
  propertyOutlinesVisibility: true,
  setPropertyOutlinesVisibility: (propertyOutlinesVisibility) =>
    set({ propertyOutlinesVisibility }),
}));
