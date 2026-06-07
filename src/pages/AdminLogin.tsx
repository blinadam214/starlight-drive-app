import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";
 
// Hook qui gère la session + vérifie si l'utilisateur est admin
export const useAdmin = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
 
  const checkAdmin = async (userId: string) => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    return !!data;
  };
 
  useEffect(() => {
    let mounted = true;
 
    // Session initiale
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!mounted) return;
      setSession(session);
      if (session?.user) {
        const admin = await checkAdmin(session.user.id);
        if (mounted) setIsAdmin(admin);
      }
      if (mounted) setLoading(false);
    });
 
    // Écoute les changements (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return;
      setSession(session);
      if (session?.user) {
        const admin = await checkAdmin(session.user.id);
        if (mounted) setIsAdmin(admin);
      } else {
        setIsAdmin(false);
      }
    });
 
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);
 
  return { session, isAdmin, loading };
};
  return { session, isAdmin, loading };
};
