import { create } from "zustand";

export const useAssetLayerVisibility = create((set) => ({
  assetLayerVisibility: true,
  setAssetLayerVisibility: (assetLayerVisibility) =>
    set({ assetLayerVisibility }),
}));

export const useAssetLayerToggle = create((set) => ({
  assetLayerToggle: true,
  setAssetLayerToggle: (assetLayerToggle) => set({ assetLayerToggle }),
}));

export const useAssetLabelVisibility = create((set) => ({
  assetLabelVisibility: true,
  setAssetLabelVisibility: (assetLabelVisibility) =>
    set({ assetLabelVisibility }),
}));

export const useAssetVisibility = create((set) => ({
  assetVisibility: true,
  setAssetVisibility: (assetVisibility) => set({ assetVisibility }),
}));

export const useAssetToggle = create((set) => ({
  assetToggle: false,
  setAssetToggle: (assetToggle) => set({ assetToggle }),
}));


export const useAssetOperatingMinesVisibility = create((set) => ({
  assetOperatingMinesVisibility: true,
  setAssetOperatingMinesVisibility: (assetOperatingMinesVisibility) =>
    set({ assetOperatingMinesVisibility }),
}));

export const useAssetHistoricalMinesVisibility = create((set) => ({
  assetHistoricalMinesVisibility: true,
  setAssetHistoricalMinesVisibility: (assetHistoricalMinesVisibility) =>
    set({ assetHistoricalMinesVisibility }),
}));

export const useAssetDepositVisibility = create((set) => ({
  assetDepositVisibility: true,
  setAssetDepositVisibility: (assetDepositVisibility) =>
    set({ assetDepositVisibility }),
}));


export const useAssetZoneVisibility = create((set) => ({
  assetZoneVisibility: true,
  setAssetZoneVisibility: (assetZoneVisibility) =>
    set({ assetZoneVisibility }),
}));

export const useAssetOccurrenceVisibility = create((set) => ({
  assetOccurrenceVisibility: true,
  setAssetOccurrenceVisibility: (assetOccurrenceVisibility) =>
    set({ assetOccurrenceVisibility }),
}));

export const useAssetsPointVisibility = create((set) => ({
  assetsPointVisibility: true,
  setAssetsPointVisibility: (assetsPointVisibility) =>
    set({ assetsPointVisibility }),
}));
