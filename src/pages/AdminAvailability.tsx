import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { LogOut, Check, X as XIcon, Loader2, ShieldCheck } from "lucide-react";
import { useAdmin } from "@/hooks/useAdmin";
import { vehicles } from "@/data/vehicles";

// Format YYYY-MM-DD en heure locale (évite le décalage UTC)
const fmt = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const AdminAvailability = () => {
  const navigate = useNavigate();
  const { session, isAdmin, loading } = useAdmin();

  const [vehicleId, setVehicleId] = useState(vehicles[0].id);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [unavailableDates, setUnavailableDates] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  // Protection : si pas admin, redirige vers login
  useEffect(() => {
    if (!loading && (!session || !isAdmin)) {
      navigate("/admin");
    }
  }, [loading, session, isAdmin, navigate]);

  // Charge les dates indisponibles du véhicule sélectionné
  const loadAvailability = useCallback(async () => {
    const { data } = await supabase
      .from("vehicle_availability")
      .select("date, is_available")
      .eq("vehicle_id", vehicleId);

    const unavail = new Set<string>();
    (data || []).forEach((row) => {
      if (!row.is_available) unavail.add(row.date);
    });
    setUnavailableDates(unavail);
  }, [vehicleId]);

  useEffect(() => {
    if (isAdmin) loadAvailability();
  }, [isAdmin, loadAvailability]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  // Bascule la disponibilité de la date sélectionnée
  const toggleDate = async (makeAvailable: boolean) => {
    if (!selectedDate) return;
    setBusy(true);
    setMessage("");

    const dateStr = fmt(selectedDate);

    const { error } = await supabase
      .from("vehicle_availability")
      .upsert(
        { vehicle_id: vehicleId, date: dateStr, is_available: makeAvailable, updated_at: new Date().toISOString() },
        { onConflict: "vehicle_id,date" }
      );

    if (error) {
      setMessage("Erreur : " + error.message);
    } else {
      setMessage(makeAvailable ? "Date marquée disponible ✓" : "Date marquée indisponible ✓");
      await loadAvailability();
    }
    setBusy(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!session || !isAdmin) return null;

  const selectedStr = selectedDate ? fmt(selectedDate) : null;
  const selectedIsUnavailable = selectedStr ? unavailableDates.has(selectedStr) : false;

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-neon flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-serif">Gestion des disponibilités</h1>
              <p className="text-xs text-muted-foreground">Kech Night Drive — Admin</p>
            </div>
          </div>
          <button onClick={handleLogout} className="btn-glass !px-4 !py-2 text-sm flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>

        {/* Sélecteur de véhicule */}
        <div className="glass rounded-2xl p-5 mb-6">
          <label className="text-sm font-semibold text-foreground mb-3 block">Véhicule</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {vehicles.map((v) => (
              <button
                key={v.id}
                onClick={() => { setVehicleId(v.id); setSelectedDate(undefined); setMessage(""); }}
                className={cn(
                  "px-3 py-2.5 rounded-xl text-sm font-medium transition-all border",
                  vehicleId === v.id
                    ? "bg-primary/15 text-primary border-primary/40"
                    : "glass text-muted-foreground border-border/30 hover:text-foreground"
                )}
              >
                {v.id.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Calendrier */}
        <div className="glass rounded-2xl p-5 mb-6">
          <label className="text-sm font-semibold text-foreground mb-3 block">
            Sélectionnez une date
          </label>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className={cn("p-3 pointer-events-auto")}
            modifiers={{ unavailable: (date) => unavailableDates.has(fmt(date)) }}
            modifiersStyles={{
              unavailable: { backgroundColor: "rgba(239,68,68,0.2)", color: "#EF4444", borderRadius: "8px" },
            }}
          />
          <p className="text-xs text-muted-foreground mt-2">
            Les dates en rouge sont marquées indisponibles.
          </p>
        </div>

        {/* Actions */}
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-strong rounded-2xl p-5"
          >
            <p className="text-sm text-foreground mb-1">
              Date sélectionnée : <span className="font-semibold text-primary">{selectedDate.toLocaleDateString("fr-FR")}</span>
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              Statut actuel : {selectedIsUnavailable ? "Indisponible" : "Disponible"}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => toggleDate(true)}
                disabled={busy}
                className="flex-1 btn-neon !py-2.5 text-sm flex items-center justify-center gap-2 disabled:opacity-40"
              >
                <Check className="w-4 h-4" />
                Disponible
              </button>
              <button
                onClick={() => toggleDate(false)}
                disabled={busy}
                className="flex-1 !py-2.5 text-sm flex items-center justify-center gap-2 rounded-xl border border-red-500/40 text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-40"
              >
                <XIcon className="w-4 h-4" />
                Indisponible
              </button>
            </div>
            {message && (
              <p className="text-xs text-center mt-3 text-muted-foreground">{message}</p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminAvailability;
