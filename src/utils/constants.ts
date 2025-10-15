// src/utils/constants.ts
/**
 * ⚙️ Global Constants — Environment-based config
 */

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
export const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY || "";
export const SUPABASE_BUCKET = "dotique-files";

export const POLKADOT_WS = "wss://rpc.polkadot.io";
export const CRUST_GATEWAY = "https://crustipfs.xyz";
export const PINATA_GATEWAY = "https://gateway.pinata.cloud/ipfs/";

export const DEFAULT_AVATAR = "/assets/default-avatar.png";
export const APP_NAME = "DOTique Web App";
export const APP_VERSION = "1.0.0";

export const ROYALTY_DEFAULT = 5;
export const MAX_NFT_EDITIONS = 50;

export const DATE_FORMAT = "YYYY-MM-DD";
export const DATETIME_FORMAT = "YYYY-MM-DD HH:mm:ss";