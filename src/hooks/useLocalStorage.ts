import { useEffect, useState } from "react";
import { getItem, saveItem } from "../utils/secureStore";

const STORAGE_SYNC_EVENT = "dotique:secure-storage-updated";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const item = await getItem(key);
        if (!item || !mounted) return;
        setStoredValue(JSON.parse(item) as T);
      } catch (error) {
        console.error("Error reading from secure storage:", error);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [key]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      saveItem(key, JSON.stringify(valueToStore)).catch((error) => {
        console.error("Error writing to secure storage:", error);
      });

      window.dispatchEvent(
        new CustomEvent(STORAGE_SYNC_EVENT, {
          detail: { key, value: valueToStore },
        })
      );
    } catch (error) {
      console.error("Error writing to secure storage:", error);
    }
  };

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== key || !event.newValue) return;

      try {
        setStoredValue(JSON.parse(event.newValue) as T);
      } catch (error) {
        console.error("Error syncing secure storage:", error);
      }
    };

    const handleCustomStorage = (event: Event) => {
      const customEvent = event as CustomEvent<{ key: string; value: T }>;
      if (customEvent.detail?.key === key) {
        setStoredValue(customEvent.detail.value);
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(STORAGE_SYNC_EVENT, handleCustomStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(STORAGE_SYNC_EVENT, handleCustomStorage);
    };
  }, [key]);

  return [storedValue, setValue] as const;
}
