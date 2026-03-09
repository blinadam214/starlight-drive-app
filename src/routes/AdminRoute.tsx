import * as React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

function AdminGateLoading() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="glass-panel rounded-2xl px-6 py-5">
        <p className="text-sm font-medium tracking-wide">Vérification des accès…</p>
      </div>
    </div>
  );
}

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin, adminLoading, refreshAdmin } = useAuth();
  const location = useLocation();
  const [checkedAdmin, setCheckedAdmin] = React.useState(false);

  React.useEffect(() => {
    if (loading) return;
    if (!user) return;

    // If role was updated while the session stayed the same, re-check once.
    if (!isAdmin && !adminLoading && !checkedAdmin) {
      setCheckedAdmin(true);
      void refreshAdmin();
    }
  }, [loading, user, isAdmin, adminLoading, checkedAdmin, refreshAdmin]);

  if (loading || adminLoading || (user && !isAdmin && !checkedAdmin)) return <AdminGateLoading />;

  if (!user) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname, reason: "login_required" }} />;
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace state={{ reason: "access_denied" }} />;
  }

  return <>{children}</>;
}
