import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

// Read from environment variables (local .env via app.config.js → Constants.expoConfig.extra)
const SUPABASE_URL =
  process.env.SUPABASE_URL ?? (Constants.expoConfig?.extra?.SUPABASE_URL as string);

const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY ?? (Constants.expoConfig?.extra?.SUPABASE_ANON_KEY as string);

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('⚠️ Supabase credentials not set in env');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
