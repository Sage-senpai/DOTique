// src/utils/secureStore.ts
/**
 * 🗝️ Secure Storage Utility — Web (Vite + React + TS)
 *
 * - Uses localStorage by default
 * - Optional AES-GCM encryption for sensitive data
 */

const ENCRYPTION_KEY = "dotique_secure_key_v1"; // change in production or derive per-user

async function getCryptoKey() {
  const enc = new TextEncoder();
  return await crypto.subtle.importKey(
    "raw",
    enc.encode(ENCRYPTION_KEY),
    "AES-GCM",
    false,
    ["encrypt", "decrypt"]
  );
}

async function encrypt(value: string) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await getCryptoKey();
  const encoded = new TextEncoder().encode(value);
  const cipher = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoded);
  return JSON.stringify({
    iv: Array.from(iv),
    data: Array.from(new Uint8Array(cipher)),
  });
}

async function decrypt(cipherJson: string) {
  try {
    const { iv, data } = JSON.parse(cipherJson);
    const key = await getCryptoKey();
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: new Uint8Array(iv) },
      key,
      new Uint8Array(data)
    );
    return new TextDecoder().decode(decrypted);
  } catch {
    return null;
  }
}

export async function saveItem(key: string, value: string, encrypted = false) {
  const store = localStorage;
  const data = encrypted ? await encrypt(value) : value;
  store.setItem(key, data);
}

export async function getItem(key: string, encrypted = false) {
  const store = localStorage;
  const data = store.getItem(key);
  if (!data) return null;
  return encrypted ? await decrypt(data) : data;
}

export async function deleteItem(key: string) {
  localStorage.removeItem(key);
}
