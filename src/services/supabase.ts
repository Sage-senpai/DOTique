// src/services/supabase.ts
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://ludauconawmrsgvyeaix.supabase.co";

const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1ZGF1Y29uYXdtcnNndnllYWl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzMTgxODMsImV4cCI6MjA3NDg5NDE4M30._2COrcrGamnIinjjup1uqoiOpOY4gjwI13d32wroup4";

// ✅ Create a client that persists user sessions and refreshes tokens
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// 🧩 Optional: helpful logs in dev
if (import.meta.env.DEV) {
  console.log("✅ Supabase client initialized");
}

// Expose supabase globally for debugging
if (typeof window !== "undefined") {
  (window as any).supabase = supabase;
}

