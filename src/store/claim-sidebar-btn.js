import { create } from "zustand";

export const useClaimLayerVisibility = create((set) => ({
  claimLayerVisibility: true,
  setClaimLayerVisibility: (claimLayerVisibility) =>
    set({ claimLayerVisibility }),
}));

export const useClaimLabelVisibility = create((set) => ({
  claimLabelVisibility: true,
  setClaimLabelVisibility: (claimLabelVisibility) =>
    set({ claimLabelVisibility }),
}));

export const useClaimLayerToggle = create((set) => ({
  claimLayerToggle: true,
  setClaimLayerToggle: (claimLayerToggle) => set({ claimLayerToggle }),
}));

export const useClaimLabel = create((set) => ({
  claimLabel: true,
  setClaimLabel: (claimLabel) => set({ claimLabel }),
}));

export const useClaimOutline = create((set) => ({
  claimOutline: true,
  setClaimOutline: (claimOutline) => set({ claimOutline }),
}));