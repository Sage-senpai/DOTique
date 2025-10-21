/**
 * Extended asset map to support PNG, SVG, GLB (3D), etc.
 */
export type AssetMap = {
    png?: string;
    svg?: string;
    glb?: string;
};
/**
 * Represents an individual drawing or layer in the project
 */
export type ProjectLayer = {
    id: string;
    name: string;
    paths: string[];
};
/**
 * Full project data structure
 */
export type Project = {
    id: string;
    name: string;
    description?: string;
    assets?: AssetMap;
    layers: ProjectLayer[];
    createdAt: number;
    updatedAt: number;
};
/**
 * Skia Canvas reference type
 */
export interface CanvasRef {
    exportAssets?: (options: {
        size: number;
    }) => Promise<{
        pngBase64: string;
        svgString: string;
    }>;
}
/**
 * Zustand global store type
 */
interface StudioStore {
    project: Project | null;
    canvasRef?: CanvasRef;
    setProject: (project: Partial<Project> | null) => void;
    updateLayerPaths: (layerId: string, paths: string[]) => void;
    resetProject: () => void;
    setCanvasRef: (ref: CanvasRef) => void;
}
/**
 * Zustand store definition
 */
declare const useStudioStore: import("zustand").UseBoundStore<import("zustand").StoreApi<StudioStore>>;
export default useStudioStore;
//# sourceMappingURL=useStudioStore.d.ts.map