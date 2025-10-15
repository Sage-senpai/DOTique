// src/services/supabase.ts
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL: string =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://ludauconawmrsgvyeaix.supabase.co";

const SUPABASE_ANON_KEY: string =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1ZGF1Y29uYXdtcnNndnllYWl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzMTgxODMsImV4cCI6MjA3NDg5NDE4M30._2COrcrGamnIinjjup1uqoiOpOY4gjwI13d32wroup4";

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

if (import.meta.env.DEV) {
  console.log("Supabase URL:", SUPABASE_URL);
  console.log("Supabase Key:", SUPABASE_ANON_KEY ? "Loaded ✅" : "Missing ❌");
}
