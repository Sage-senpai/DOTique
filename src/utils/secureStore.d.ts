/**
 * 🗝️ Secure Storage Utility — Web (Vite + React + TS)
 *
 * - Uses localStorage by default
 * - Optional AES-GCM encryption for sensitive data
 */
export declare function saveItem(key: string, value: string, encrypted?: boolean): Promise<void>;
export declare function getItem(key: string, encrypted?: boolean): Promise<string | null>;
export declare function deleteItem(key: string): Promise<void>;
//# sourceMappingURL=secureStore.d.ts.map