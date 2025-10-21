// ==================== src/stores/useStudioStore.ts ====================
import { create } from "zustand";

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
  paths: string[]; // SVG or serialized Skia paths
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
  exportAssets?: (options: { size: number }) => Promise<{
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
 * Default project template
 */
const defaultProject: Project = {
  id: "default",
  name: "Untitled Canvas",
  description: "",
  assets: {},
  layers: [{ id: "layer1", name: "Base Layer", paths: [] }],
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

/**
 * Zustand store definition
 */
const useStudioStore = create<StudioStore>((set) => ({
  project: defaultProject,
  canvasRef: undefined,

  // Merge new values into existing project safely
  setProject: (project: Partial<Project> | null) =>
    set((state: StudioStore) => {
      if (!project) return { project: null };
      return {
        project: {
          ...state.project!,
          ...project,
          updatedAt: Date.now(),
        },
      };
    }),

  // Update only a specific layer’s path array
  updateLayerPaths: (layerId: string, paths: string[]) =>
    set((state: StudioStore) => {
      if (!state.project) return state;
      const updatedLayers = state.project.layers.map((layer) =>
        layer.id === layerId ? { ...layer, paths } : layer
      );
      return {
        project: {
          ...state.project,
          layers: updatedLayers,
          updatedAt: Date.now(),
        },
      };
    }),

  // Reset everything to default
  resetProject: () =>
    set(() => ({
      project: defaultProject,
      canvasRef: undefined,
    })),

  // Reference to Skia Canvas (for export, etc.)
  setCanvasRef: (ref: CanvasRef) => set(() => ({ canvasRef: ref })),
}));

export default useStudioStore;
