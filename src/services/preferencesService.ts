import { deleteItem, getItem, saveItem } from "../utils/secureStore";

export type ThemePreference = "light" | "dark" | "system";

const THEME_PREFERENCE_KEY = "theme-preference";
const ONBOARDING_KEY = "hasSeenOnboarding";
const SESSION_KEYS = ["supabase_session", "wallet-session"];
const CACHE_KEYS = [
  "userStore",
  "nft-favorites",
  "polkadot:selected-account",
  "user_wardrobe",
];

export async function getThemePreference(): Promise<ThemePreference> {
  const stored = await getItem(THEME_PREFERENCE_KEY);
  if (stored === "light" || stored === "dark" || stored === "system") {
    return stored;
  }
  return "system";
}

export async function setThemePreference(theme: ThemePreference): Promise<void> {
  await saveItem(THEME_PREFERENCE_KEY, theme);
}

export async function getHasSeenOnboarding(): Promise<boolean> {
  return (await getItem(ONBOARDING_KEY)) === "true";
}

export async function setHasSeenOnboarding(seen: boolean): Promise<void> {
  await saveItem(ONBOARDING_KEY, seen ? "true" : "false");
}

export async function clearAuthArtifacts(): Promise<void> {
  await Promise.all(SESSION_KEYS.map((key) => deleteItem(key)));
}

export async function clearClientCache(): Promise<void> {
  await Promise.all([
    ...SESSION_KEYS.map((key) => deleteItem(key)),
    ...CACHE_KEYS.map((key) => deleteItem(key)),
    deleteItem(ONBOARDING_KEY),
    deleteItem(THEME_PREFERENCE_KEY),
  ]);
}
