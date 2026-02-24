import { getItem, saveItem } from "../utils/secureStore";

const WARDROBE_STORAGE_KEY = "user_wardrobe";
const WARDROBE_UPDATED_EVENT = "dotique:wardrobe-updated";

type WardrobeItem = Record<string, unknown>;

function normalizeWardrobe(raw: string | null): WardrobeItem[] {
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter(
        (item): item is WardrobeItem => item !== null && typeof item === "object"
      );
    }
  } catch (error) {
    console.warn("Failed to parse wardrobe cache:", error);
  }

  return [];
}

export async function getWardrobeItems(): Promise<WardrobeItem[]> {
  const stored = await getItem(WARDROBE_STORAGE_KEY);
  return normalizeWardrobe(stored);
}

export async function setWardrobeItems(items: WardrobeItem[]): Promise<void> {
  await saveItem(WARDROBE_STORAGE_KEY, JSON.stringify(items));

  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent(WARDROBE_UPDATED_EVENT, {
        detail: items,
      })
    );
  }
}

export function subscribeToWardrobeChanges(
  onChange: (items: WardrobeItem[]) => void
): () => void {
  if (typeof window === "undefined") return () => undefined;

  const handleStorage = async (event: StorageEvent) => {
    if (event.key !== WARDROBE_STORAGE_KEY) return;
    const items = await getWardrobeItems();
    onChange(items);
  };

  const handleWardrobeUpdate = (event: Event) => {
    const customEvent = event as CustomEvent<WardrobeItem[]>;
    onChange(Array.isArray(customEvent.detail) ? customEvent.detail : []);
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(WARDROBE_UPDATED_EVENT, handleWardrobeUpdate);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(WARDROBE_UPDATED_EVENT, handleWardrobeUpdate);
  };
}

