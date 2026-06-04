import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Diagnostic — affiche dans la console si les variables manquent
if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  console.error(
    "🚨 ERREUR CONFIG SUPABASE :\n" +
    `VITE_SUPABASE_URL = ${SUPABASE_URL || "MANQUANTE ❌"}\n` +
    `VITE_SUPABASE_PUBLISHABLE_KEY = ${SUPABASE_PUBLISHABLE_KEY ? "présente ✅" : "MANQUANTE ❌"}\n` +
    "→ Ajoute ces variables dans Vercel : Settings > Environment Variables, puis redéploie."
  );
}

export const supabase = createClient<Database>(
  SUPABASE_URL || "",
  SUPABASE_PUBLISHABLE_KEY || "",
  {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
    }
  }
);
