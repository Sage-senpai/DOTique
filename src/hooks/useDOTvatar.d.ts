export declare const useDOTvatar: () => {
    dotvatar: import("../stores/dotvatarStore").DOTvatar;
    setDotvatar: (newData: Partial<import("../stores/dotvatarStore").DOTvatar>) => void;
    resetDotvatar: () => void;
    saveDOTvatar: () => Promise<boolean | undefined>;
    loading: boolean;
};
export default useDOTvatar;
//# sourceMappingURL=useDOTvatar.d.ts.map