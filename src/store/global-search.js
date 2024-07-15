import { create } from "zustand";

export const useGlobalSearchCompanyId = create((set) => ({
  globalSearchCompanyId: "",
  setGlobalSearchCompanyId: (globalSearchCompanyId) =>
    set({ globalSearchCompanyId }),
}));

export const useSelectedCheckboxes = create((set) => ({
  selectedCheckboxes: [
    "Property Point Layer",
    "Property OutLine Layer",
    "Assets layer",
  ],
  setSelectedCheckboxes: (selectedCheckboxes) => set({ selectedCheckboxes }),
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

export const useSearchTablePopUp = create((set) => ({
  searchTablePopUp: false,
  setSearchTablePopUp: (searchTablePopUp) => set({ searchTablePopUp }),
}));

export const useSearchText = create((set) => ({
  searchText: "",
  setSearchText: (searchText) => set({ searchText }),
}));

export const useClickPropertyTab = create((set) => ({
  clickPropertyTab: true,
  setClickPropertyTab: (clickPropertyTab) => set({ clickPropertyTab }),
}));

export const useClickAssetTab = create((set) => ({
  clickAssetTab: false,
  setClickAssetTab: (clickAssetTab) => set({ clickAssetTab }),
}));

export const useClickClaimLinkTab = create((set) => ({
  clickClaimLinkTab: false,
  setClickClaimLinkTab: (clickClaimLinkTab) => set({ clickClaimLinkTab }),
}));

export const useLoadingPropertyTable = create((set) => ({
  loadingPropertyTable: false,
  setLoadingPropertyTable: (loadingPropertyTable) =>
    set({ loadingPropertyTable }),
}));

export const useLoadingAssetTable = create((set) => ({
  loadingAssetTable: false,
  setLoadingAssetTable: (loadingAssetTable) => set({ loadingAssetTable }),
}));

export const useLoadingClaimLinkTable = create((set) => ({
  loadingClaimLinkTable: false,
  setLoadingClaimLinkTable: (loadingClaimLinkTable) =>
    set({ loadingClaimLinkTable }),
}));

export const useMinimizeSearchTablePopUp = create((set) => ({
  minimizeSearchTablePopUp: false,
  setMinimizeSearchTablePopUp: (minimizeSearchTablePopUp) =>
    set({ minimizeSearchTablePopUp }),
}));
