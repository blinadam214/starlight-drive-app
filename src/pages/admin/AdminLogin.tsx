import { z } from "zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "Mot de passe requis"),
});

type FormValues = z.infer<typeof schema>;

type LocationState = { from?: string; reason?: "login_required" | "access_denied" };

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state ?? {}) as LocationState;

  const { user, isAdmin, signInWithPassword, signOut, refreshAdmin } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [isSignupMode, setIsSignupMode] = useState(false);

  const defaultEmail = useMemo(() => "", []);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: defaultEmail, password: "" },
  });

  useEffect(() => {
    if (state.reason === "access_denied") {
      toast.error("Accès refusé", { description: "Ce centre est réservé à l'administrateur." });
    }
  }, [state.reason]);

  useEffect(() => {
    if (user && isAdmin) {
      navigate("/admin", { replace: true });
    }
  }, [user, isAdmin, navigate]);

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      if (isSignupMode) {
        // Mode inscription
        const { error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
        });
        
        if (error) {
          toast.error("Inscription impossible", { description: error.message });
          return;
        }
        
        toast.success("Compte créé !", { 
          description: "Vous pouvez maintenant vous connecter." 
        });
        setIsSignupMode(false);
        return;
      }

      // Mode connexion
      const { error } = await signInWithPassword(values.email, values.password);
      if (error) {
        toast.error("Connexion impossible", { description: error });
        return;
      }

      const ok = await refreshAdmin();
      if (!ok) {
        await signOut();
        toast.error("Accès refusé", { description: "Votre compte n'a pas le rôle ADMIN." });
        return;
      }

      navigate("/admin", { replace: true });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 starlight-dots opacity-60" />
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[hsl(var(--neon-cyan)/0.06)] blur-[110px]" />
      <div className="absolute -bottom-28 -right-24 h-96 w-96 rounded-full bg-[hsl(var(--neon-gold)/0.05)] blur-[120px]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-16">
        <div className="w-full max-w-md glass-panel rounded-2xl border border-[hsl(var(--border))] p-6 sm:p-8">
          <div className="mb-7">
            <h1 className="font-syne text-3xl font-extrabold tracking-tight">Centre de Contrôle</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {isSignupMode 
                ? "Créer un compte administrateur."
                : "Accès strictement réservé à l'administrateur."
              }
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        autoComplete="email"
                        placeholder={isSignupMode ? "blinadam2@gmail.com" : "adam@bline26.com"}
                        className="glass"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        autoComplete="current-password"
                        placeholder="••••••••"
                        className="glass"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={submitting} className="btn-neon w-full">
                {submitting 
                  ? "Vérification…" 
                  : isSignupMode 
                    ? "Créer le compte admin"
                    : "Accéder au Centre de Contrôle"
                }
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsSignupMode(!isSignupMode)}
                  className="text-xs text-[hsl(var(--neon-cyan))] hover:underline"
                >
                  {isSignupMode 
                    ? "← Retour à la connexion"
                    : "Créer un compte admin →"
                  }
                </button>
              </div>

              {user && !isAdmin && (
                <div className="rounded-lg border border-[hsl(var(--neon-gold)/0.25)] bg-[hsl(var(--neon-gold)/0.08)] p-3">
                  <p className="text-xs font-semibold text-[hsl(var(--neon-gold))]">Accès refusé</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Votre session a été fermée automatiquement.
                  </p>
                </div>
              )}

              {state.reason === "login_required" && (
                <p className="text-xs text-muted-foreground">
                  Vous devez vous connecter pour accéder au dashboard.
                </p>
              )}
            </form>
          </Form>

          <div className="mt-8 text-xs text-muted-foreground">
            <p className="font-semibold tracking-wide">Instructions</p>
            <p className="mt-1">
              1. Cliquez "Créer un compte admin" <br/>
              2. Utilisez : <strong>blinadam2@gmail.com</strong> <br/>
              3. Mot de passe : <strong>Fatiha123</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}