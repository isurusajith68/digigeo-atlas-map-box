import { create } from "zustand";

export const usetoggeleLegend = create((set) => ({
  toggleLegendOpen: false,
  setToggleLegend: (toggleLegendOpen) => set({ toggleLegendOpen }),
}));

export const useClaimLinkLayerVisibility = create((set) => ({
  claimLinkLayerVisibility: false,
  setClaimLinkLayerVisibility: (claimLinkLayerVisibility) =>
    set({ claimLinkLayerVisibility }),
}));

export const useAssetsLayerVisibility = create((set) => ({
  assetsLayerVisibility: false,
  setAssetsLayerVisibility: (assetsLayerVisibility) =>
    set({ assetsLayerVisibility }),
}));

export const useClaimVectorLayerVisibility = create((set) => ({
  claimVectorLayerVisibility: false,
  setClaimVectorLayerVisibility: (claimVectorLayerVisibility) =>
    set({ claimVectorLayerVisibility }),
}));

export const useSyncPropertyLayerVisibility = create((set) => ({
  syncPropertyLayerVisibility: true,
  setSyncPropertyLayerVisibility: (syncPropertyLayerVisibility) =>
    set({ syncPropertyLayerVisibility }),
}));
