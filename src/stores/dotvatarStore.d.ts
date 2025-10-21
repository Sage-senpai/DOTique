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
export declare const useDotvatarStore: import("zustand").UseBoundStore<import("zustand").StoreApi<DotvatarStore>>;
export {};
//# sourceMappingURL=dotvatarStore.d.ts.map