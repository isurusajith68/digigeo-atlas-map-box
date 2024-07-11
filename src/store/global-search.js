import { create } from "zustand";

export const useGlobalSearchCompanyId = create((set) => ({
  globalSearchCompanyId: "",
  setGlobalSearchCompanyId: (globalSearchCompanyId) =>
    set({ globalSearchCompanyId }),
}));

export const useShowAllAssets = create((set) => ({
  showAssets: null,
  setShowAssets: (showAssets) => set({ showAssets }),
}));

export const useShowAllPropertiesPoints = create((set) => ({
  showPropertiesPoints: null,
  setShowPropertiesPoints: (showPropertiesPoints) =>
    set({ showPropertiesPoints }),
}));

export const useShowAllPropertiesOutlines = create((set) => ({
  showPropertiesOutlines: null,
  setShowPropertiesOutlines: (showPropertiesOutlines) =>
    set({ showPropertiesOutlines }),
}));
