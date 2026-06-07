import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Lock, Mail, LogIn, AlertCircle } from "lucide-react";
import { useAdmin } from "@/hooks/useAdmin";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { session, isAdmin, loading } = useAdmin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!loading && session && isAdmin) {
      navigate("/admin/disponibilites");
    }
  }, [loading, session, isAdmin, navigate]);

  const handleLogin = async () => {
    setError("");
    setSubmitting(true);

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError) {
      setError("Email ou mot de passe incorrect.");
      setSubmitting(false);
      return;
    }

    await supabase.rpc("bootstrap_user");

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      setError("Accès refusé : ce compte n'est pas administrateur.");
      await supabase.auth.signOut();
      setSubmitting(false);
      return;
    }

    navigate("/admin/disponibilites");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-strong rounded-2xl p-8 max-w-md w-full"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl gradient-neon flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold font-serif">Espace Administrateur</h1>
          <p className="text-muted-foreground text-sm mt-1">Kech Night Drive</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 mb-4">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span className="text-sm text-red-400">{error}</span>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full glass rounded-xl pl-10 pr-4 py-3 text-foreground outline-none focus:border-primary/50 border border-border/30"
                placeholder="votre@email.com"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">Mot de passe</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="w-full glass rounded-xl pl-10 pr-4 py-3 text-foreground outline-none focus:border-primary/50 border border-border/30"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={submitting || !email || !password}
            className="btn-neon w-full flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <LogIn className="w-4 h-4" />
            {submitting ? "Connexion..." : "Se connecter"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
