import { create } from "zustand";

export const usePropertyLabelVisibility = create((set) => ({
  propertyLabelVisibility: false,
  setPropertyLabelVisibility: (propertyLabelVisibility) =>
    set({ propertyLabelVisibility }),
}));

export const usePropertyPointsVisibility = create((set) => ({
  propertyPointsVisibility: false,
  setPropertyPointsVisibility: (propertyPointsVisibility) =>
    set({ propertyPointsVisibility }),
}));

export const usePropertyOutlinesVisibility = create((set) => ({
  propertyOutlinesVisibility: false,
  setPropertyOutlinesVisibility: (propertyOutlinesVisibility) =>
    set({ propertyOutlinesVisibility }),
}));
