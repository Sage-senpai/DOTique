// src/stores/dotvatarStore.ts
import { create } from "zustand";

export interface DOTvatar {
  skin: string;
  outfit: string;
  accessory: string;
  hair: string;
}

interface DotvatarStore {
  dotvatar: DOTvatar;
  availableSkins: string[];
  availableOutfits: string[];
  availableAccessories: string[];
  availableHair: string[];

  setDotvatar: (newData: Partial<DOTvatar>) => void;
  resetDotvatar: () => void;
}

export const useDotvatarStore = create<DotvatarStore>((set) => ({
  dotvatar: {
    skin: "default",
    outfit: "classic",
    accessory: "none",
    hair: "short",
  },
  availableSkins: ["default", "tan", "dark", "pale"],
  availableOutfits: ["classic", "streetwear", "futuristic", "elegant"],
  availableAccessories: ["none", "glasses", "earrings", "necklace"],
  availableHair: ["short", "long", "braided", "curly"],

  setDotvatar: (newData) =>
    set((state) => ({ dotvatar: { ...state.dotvatar, ...newData } })),
  resetDotvatar: () =>
    set({
      dotvatar: {
        skin: "default",
        outfit: "classic",
        accessory: "none",
        hair: "short",
      },
    }),
}));
