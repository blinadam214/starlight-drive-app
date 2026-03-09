import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  adminLoading: boolean;
  isAdmin: boolean;
  signInWithPassword: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  refreshAdmin: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [adminLoading, setAdminLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // IMPORTANT: listener before getSession()
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      if (!nextSession?.user) {
        setIsAdmin(false);
      }
    });

    supabase.auth
      .getSession()
      .then(({ data: { session: initialSession } }) => {
        setSession(initialSession);
        setUser(initialSession?.user ?? null);
      })
      .finally(() => setLoading(false));

    return () => data.subscription.unsubscribe();
  }, []);

  const refreshAdmin = useCallback(async () => {
    if (!session?.user) {
      setIsAdmin(false);
      return false;
    }

    setAdminLoading(true);
    try {
      // Ensure profile + baseline role exist (server-side guarded)
      await supabase.rpc("bootstrap_user");

      const { data, error } = await supabase.rpc("has_role", {
        _user_id: session.user.id,
        _role: "admin",
      });

      if (error) {
        setIsAdmin(false);
        return false;
      }

      const nextIsAdmin = Boolean(data);
      setIsAdmin(nextIsAdmin);
      return nextIsAdmin;
    } finally {
      setAdminLoading(false);
    }
  }, [session?.user]);

  useEffect(() => {
    void refreshAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.id]);

  const signInWithPassword = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return {};
  }, []);

  const signOut = useCallback(async () => {
    setIsAdmin(false);
    await supabase.auth.signOut();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user,
      loading,
      adminLoading,
      isAdmin,
      signInWithPassword,
      signOut,
      refreshAdmin,
    }),
    [session, user, loading, adminLoading, isAdmin, signInWithPassword, signOut, refreshAdmin],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
