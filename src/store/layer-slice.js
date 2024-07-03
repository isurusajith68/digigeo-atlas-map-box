import { create } from "zustand";

export const usetoggeleLegend = create((set) => ({
  toggleLegendOpen: true,
  setToggleLegend: (toggleLegendOpen) => set({ toggleLegendOpen }),
}));

export const useClaimLinkLayerVisibility = create((set) => ({
  claimLinkLayerVisibility: true,
  setClaimLinkLayerVisibility: (claimLinkLayerVisibility) =>
    set({ claimLinkLayerVisibility }),
}));

export const useAssetsLayerVisibility = create((set) => ({
  assetsLayerVisibility: true,
  setAssetsLayerVisibility: (assetsLayerVisibility) =>
    set({ assetsLayerVisibility }),
}));

export const useClaimVectorLayerVisibility = create((set) => ({
  claimVectorLayerVisibility: true,
  setClaimVectorLayerVisibility: (claimVectorLayerVisibility) =>
    set({ claimVectorLayerVisibility }),
}));

export const useSyncPropertyLayerVisibility = create((set) => ({
  syncPropertyLayerVisibility: true,
  setSyncPropertyLayerVisibility: (syncPropertyLayerVisibility) =>
    set({ syncPropertyLayerVisibility }),
}));
