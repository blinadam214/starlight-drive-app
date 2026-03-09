import { useMemo } from "react";
import { toast } from "sonner";
import { Menu, LogOut, Search } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

function LogoMark() {
  return (
    <svg viewBox="0 0 320 100" className="w-40" aria-label="B-LINE 26">
      <g transform="translate(10, 20)">
        <path
          d="M15,60 L20,35 A25,25 0 1,1 60,35 L65,60"
          fill="none"
          stroke="hsl(var(--neon-gold))"
          strokeWidth="3"
        />
        <path
          d="M40,12 L42,19 L49,21 L42,23 L40,30 L38,23 L31,21 L38,19 Z"
          fill="hsl(var(--neon-cyan))"
        />
        <path
          d="M28,48 L52,48 L48,38 L32,38 Z"
          fill="none"
          stroke="hsl(var(--neon-gold))"
          strokeWidth="2"
        />
        <line x1="22" y1="54" x2="58" y2="54" stroke="hsl(var(--neon-gold))" strokeWidth="2" />
      </g>
      <text
        x="95"
        y="58"
        fontFamily="Syne, ui-sans-serif, system-ui"
        fontWeight="800"
        fontSize="34"
        fill="hsl(var(--foreground))"
        letterSpacing="1"
      >
        B-LINE
      </text>
    </svg>
  );
}

function SidebarContent({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="h-full flex flex-col">
      <div className="h-24 flex items-center justify-center border-b border-[hsl(var(--foreground)/0.06)]">
        <LogoMark />
      </div>

      <nav className="flex-1 overflow-y-auto py-6 flex flex-col gap-2 px-4 admin-scroll">
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 bg-[hsl(var(--foreground)/0.04)] rounded-lg border border-[hsl(var(--neon-gold)/0.30)] text-[hsl(var(--neon-gold))] font-bold text-sm"
        >
          <span className="grid place-items-center h-5 w-5">⧉</span>
          Vue d'ensemble
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 hover:bg-[hsl(var(--foreground)/0.04)] rounded-lg text-muted-foreground hover:text-foreground transition-colors font-bold text-sm"
        >
          <span className="grid place-items-center h-5 w-5">▦</span>
          Réservations
          <span className="ml-auto bg-[hsl(var(--neon-cyan))] text-[hsl(var(--background))] text-[10px] px-2 py-0.5 rounded-full font-black">
            2
          </span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 hover:bg-[hsl(var(--foreground)/0.04)] rounded-lg text-muted-foreground hover:text-foreground transition-colors font-bold text-sm"
        >
          <span className="grid place-items-center h-5 w-5">➔</span>
          Flotte 26
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 hover:bg-[hsl(var(--foreground)/0.04)] rounded-lg text-muted-foreground hover:text-foreground transition-colors font-bold text-sm"
        >
          <span className="grid place-items-center h-5 w-5">⌁</span>
          Fast-Track (Dossiers)
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 hover:bg-[hsl(var(--foreground)/0.04)] rounded-lg text-muted-foreground hover:text-foreground transition-colors font-bold text-sm"
        >
          <span className="grid place-items-center h-5 w-5">☺</span>
          Clients
        </a>
      </nav>

      <div className="p-4 border-t border-[hsl(var(--foreground)/0.06)]">
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[hsl(var(--foreground)/0.04)] border border-[hsl(var(--foreground)/0.10)]">
          <div className="w-8 h-8 rounded bg-[hsl(var(--neon-gold))] flex items-center justify-center text-[hsl(var(--background))] font-black text-xs">
            AB
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-foreground truncate">Adam Blin</p>
            <p className="text-[10px] text-[hsl(var(--neon-gold))] uppercase tracking-widest">Directeur</p>
          </div>
          <button
            onClick={onLogout}
            className="ml-auto inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Déco
          </button>
        </div>
      </div>
    </div>
  );
}

function KpiCard({
  title,
  value,
  subtitle,
  accent,
}: {
  title: string;
  value: string;
  subtitle?: string;
  accent: "gold" | "cyan" | "violet" | "neutral";
}) {
  const accentStyle =
    accent === "gold"
      ? "border-[hsl(var(--neon-gold)/0.22)] hover:shadow-[0_0_20px_hsl(var(--neon-gold)/0.10)]"
      : accent === "cyan"
        ? "border-[hsl(var(--neon-cyan)/0.22)] hover:shadow-[0_0_24px_hsl(var(--neon-cyan)/0.14)]"
        : accent === "violet"
          ? "border-[hsl(var(--neon-violet)/0.28)] hover:shadow-[0_0_22px_hsl(var(--neon-violet)/0.14)]"
          : "border-[hsl(var(--foreground)/0.10)]";

  const labelColor =
    accent === "gold"
      ? "text-[hsl(var(--neon-gold))]"
      : accent === "cyan"
        ? "text-[hsl(var(--neon-cyan))]"
        : accent === "violet"
          ? "text-[hsl(var(--neon-violet))]"
          : "text-muted-foreground";

  return (
    <div
      className={`glass-panel p-6 rounded-xl border transition-all duration-300 hover:-translate-y-0.5 ${accentStyle}`}
    >
      <h3 className="text-muted-foreground text-xs font-bold uppercase tracking-widest mb-1">{title}</h3>
      <p className={`font-syne text-3xl font-extrabold tracking-tight ${labelColor}`}>{value}</p>
      {subtitle ? <p className="mt-2 text-xs text-muted-foreground font-bold uppercase tracking-widest">{subtitle}</p> : null}
    </div>
  );
}

export default function AdminDashboard() {
  const { signOut } = useAuth();

  const nowLabel = useMemo(() => {
    const d = new Date();
    const time = d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
    return `Marrakech, Aujourd'hui ${time}`;
  }, []);

  const logout = async () => {
    await signOut();
    toast.success("Déconnecté");
  };

  return (
    <div className="min-h-screen flex bg-[hsl(var(--background))] text-foreground antialiased overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="w-64 flex-shrink-0 glass-panel border-r border-[hsl(var(--foreground)/0.06)] flex-col hidden md:flex z-20">
        <SidebarContent onLogout={logout} />
      </aside>

      {/* Mobile Sidebar */}
      <div className="md:hidden fixed left-4 top-5 z-30">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="glass border-[hsl(var(--foreground)/0.10)]">
              <Menu className="h-4 w-4" />
              Menu
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 glass-panel border-[hsl(var(--foreground)/0.06)] w-[320px]">
            <SidebarContent onLogout={logout} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main */}
      <main className="flex-1 flex flex-col relative h-screen overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[hsl(var(--neon-cyan)/0.06)] blur-[110px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[hsl(var(--neon-gold)/0.06)] blur-[120px] rounded-full pointer-events-none" />

        <header className="h-24 glass-panel border-b border-[hsl(var(--foreground)/0.06)] flex items-center justify-between px-6 md:px-8 z-10 shrink-0">
          <div className="pl-14 md:pl-0">
            <h1 className="font-syne text-2xl font-extrabold tracking-tight">Tableau de Bord</h1>
            <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{nowLabel}</p>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="relative hidden lg:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher (Client, Immat...)"
                className="bg-[hsl(var(--card))] border border-[hsl(var(--foreground)/0.10)] text-sm rounded-md pl-10 pr-4 py-2 w-64 focus-visible:ring-0 focus:border-[hsl(var(--neon-gold)/0.6)] transition-colors text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <Button variant="ghost" onClick={logout} className="text-muted-foreground hover:text-foreground">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Déconnexion</span>
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 z-10 admin-scroll">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* KPI grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KpiCard title="Chiffre d'Affaires" value="42,500 MAD" subtitle="+12% cette sem." accent="gold" />
              <KpiCard title="Véhicules Sortis" value="4 EN COURS" subtitle="8/12 dispo" accent="cyan" />
              <KpiCard title="Dossiers Fast-Track" value="2 À VALIDER" subtitle="Urgent" accent="violet" />
              <KpiCard title="Retours Prévus (Auj.)" value="1 à 18:00" accent="neutral" />
            </div>

            {/* Main grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <section className="lg:col-span-1 glass-panel rounded-xl border border-[hsl(var(--foreground)/0.10)] flex flex-col overflow-hidden">
                <div className="p-6 border-b border-[hsl(var(--foreground)/0.06)] flex justify-between items-center">
                  <h2 className="font-syne font-extrabold text-lg">Check-in Express</h2>
                  <span className="text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-widest bg-[hsl(var(--neon-gold)/0.10)] text-[hsl(var(--neon-gold))] border border-[hsl(var(--neon-gold)/0.25)]">
                    En attente
                  </span>
                </div>

                <div className="p-6 space-y-4 flex-1">
                  <div className="bg-[hsl(var(--card))] border border-[hsl(var(--foreground)/0.06)] rounded-lg p-4 transition-all duration-300 hover:border-[hsl(var(--neon-gold)/0.35)] hover:shadow-[0_0_18px_hsl(var(--neon-gold)/0.10)]">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-sm text-[hsl(var(--neon-gold))]">Karim B.</h3>
                      <span className="text-[10px] text-muted-foreground font-bold">Il y a 10 min</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Demande: <span className="text-foreground font-bold">Clio 5 Starlight</span>
                    </p>
                    <div className="flex gap-2 mb-4">
                      <span className="text-[10px] border border-[hsl(var(--neon-cyan)/0.30)] text-[hsl(var(--neon-cyan))] px-2 py-1 rounded bg-[hsl(var(--neon-cyan)/0.10)] font-bold uppercase tracking-widest">
                        Permis ✓
                      </span>
                      <span className="text-[10px] border border-[hsl(var(--neon-cyan)/0.30)] text-[hsl(var(--neon-cyan))] px-2 py-1 rounded bg-[hsl(var(--neon-cyan)/0.10)] font-bold uppercase tracking-widest">
                        Passeport ✓
                      </span>
                    </div>
                    <button className="w-full bg-[hsl(var(--neon-gold))] text-[hsl(var(--background))] text-xs font-black uppercase py-2 rounded hover:bg-[hsl(var(--foreground))] transition-colors">
                      Générer contrat
                    </button>
                  </div>

                  <div className="bg-[hsl(var(--card))] border border-[hsl(var(--foreground)/0.06)] rounded-lg p-4 transition-all duration-300 hover:border-[hsl(var(--neon-cyan)/0.35)] hover:shadow-[0_0_18px_hsl(var(--neon-cyan)/0.12)]">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-sm text-[hsl(var(--neon-cyan))]">Sophie T.</h3>
                      <span className="text-[10px] text-muted-foreground font-bold">Il y a 1h</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Demande: <span className="text-foreground font-bold">Peugeot 208 Neo</span>
                    </p>
                    <div className="flex gap-2 mb-4">
                      <span className="text-[10px] border border-[hsl(var(--neon-cyan)/0.30)] text-[hsl(var(--neon-cyan))] px-2 py-1 rounded bg-[hsl(var(--neon-cyan)/0.10)] font-bold uppercase tracking-widest">
                        Permis ✓
                      </span>
                      <span className="text-[10px] border border-[hsl(var(--destructive)/0.35)] text-[hsl(var(--destructive))] px-2 py-1 rounded bg-[hsl(var(--destructive)/0.12)] font-bold uppercase tracking-widest">
                        Carte ID ✕
                      </span>
                    </div>
                    <button className="w-full bg-transparent border border-[hsl(var(--foreground)/0.20)] text-foreground text-xs font-black uppercase py-2 rounded hover:bg-[hsl(var(--foreground)/0.06)] transition-colors">
                      Relancer client
                    </button>
                  </div>
                </div>
              </section>

              <section className="lg:col-span-2 glass-panel rounded-xl border border-[hsl(var(--foreground)/0.10)] overflow-hidden flex flex-col">
                <div className="p-6 border-b border-[hsl(var(--foreground)/0.06)] flex justify-between items-center">
                  <h2 className="font-syne font-extrabold text-lg">État de la Flotte 26</h2>
                  <a href="#" className="text-xs font-bold text-[hsl(var(--neon-cyan))] hover:underline">
                    Voir tout
                  </a>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[hsl(var(--foreground)/0.04)] text-[10px] uppercase tracking-widest text-muted-foreground border-b border-[hsl(var(--foreground)/0.06)]">
                        <th className="p-4 font-bold">Véhicule</th>
                        <th className="p-4 font-bold">Immatriculation</th>
                        <th className="p-4 font-bold">Statut</th>
                        <th className="p-4 font-bold">Client / Retour</th>
                        <th className="p-4 font-bold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b border-[hsl(var(--foreground)/0.06)] hover:bg-[hsl(var(--foreground)/0.04)] transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded bg-[hsl(var(--card))] border border-[hsl(var(--foreground)/0.10)] flex items-center justify-center font-bold text-xs">
                              C5
                            </div>
                            <div>
                              <p className="font-bold text-foreground">Clio 5 Nightline</p>
                              <p className="text-[10px] text-[hsl(var(--neon-gold))] uppercase font-bold tracking-widest">Starlight Ed.</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 font-mono text-xs text-muted-foreground">26-A-12345</td>
                        <td className="p-4">
                          <span className="text-[10px] px-2 py-1 rounded uppercase font-bold tracking-widest inline-flex items-center gap-2 bg-[hsl(var(--neon-cyan)/0.10)] text-[hsl(var(--neon-cyan))] border border-[hsl(var(--neon-cyan)/0.30)]">
                            <span className="w-1.5 h-1.5 bg-[hsl(var(--neon-cyan))] rounded-full" /> Sortie
                          </span>
                        </td>
                        <td className="p-4">
                          <p className="text-xs font-bold">Yassine M.</p>
                          <p className="text-[10px] text-muted-foreground">Auj. 18:00 (Aéroport)</p>
                        </td>
                        <td className="p-4 text-right">
                          <button className="text-muted-foreground hover:text-foreground">•••</button>
                        </td>
                      </tr>

                      <tr className="border-b border-[hsl(var(--foreground)/0.06)] hover:bg-[hsl(var(--foreground)/0.04)] transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded bg-[hsl(var(--card))] border border-[hsl(var(--neon-cyan)/0.30)] flex items-center justify-center font-bold text-xs text-[hsl(var(--neon-cyan))]">
                              208
                            </div>
                            <div>
                              <p className="font-bold text-foreground">Peugeot 208 Neo</p>
                              <p className="text-[10px] text-[hsl(var(--neon-cyan))] uppercase font-bold tracking-widest">Neon Ambiance</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 font-mono text-xs text-muted-foreground">26-B-98765</td>
                        <td className="p-4">
                          <span className="text-[10px] px-2 py-1 rounded uppercase font-bold tracking-widest inline-flex items-center gap-2 bg-[hsl(var(--muted))] text-muted-foreground border border-[hsl(var(--border))]">
                            Dispo. Garage
                          </span>
                        </td>
                        <td className="p-4">
                          <p className="text-xs font-bold text-muted-foreground">-</p>
                        </td>
                        <td className="p-4 text-right">
                          <button className="text-muted-foreground hover:text-foreground">•••</button>
                        </td>
                      </tr>

                      <tr className="border-b border-[hsl(var(--foreground)/0.06)] hover:bg-[hsl(var(--foreground)/0.04)] transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded bg-[hsl(var(--card))] border border-[hsl(var(--foreground)/0.10)] flex items-center justify-center font-bold text-xs">
                              LOG
                            </div>
                            <div>
                              <p className="font-bold text-foreground">Dacia Logan</p>
                              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Classic</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 font-mono text-xs text-muted-foreground">26-D-11223</td>
                        <td className="p-4">
                          <span className="text-[10px] px-2 py-1 rounded uppercase font-bold tracking-widest inline-flex items-center gap-2 bg-[hsl(var(--neon-violet)/0.10)] text-[hsl(var(--neon-violet))] border border-[hsl(var(--neon-violet)/0.30)]">
                            Lavage
                          </span>
                        </td>
                        <td className="p-4">
                          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Prête à 16:00</p>
                        </td>
                        <td className="p-4 text-right">
                          <button className="text-muted-foreground hover:text-foreground">•••</button>
                        </td>
                      </tr>

                      <tr className="hover:bg-[hsl(var(--foreground)/0.04)] transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded bg-[hsl(var(--card))] border border-[hsl(var(--neon-violet)/0.30)] flex items-center justify-center font-bold text-xs text-[hsl(var(--neon-violet))]">
                              TMX
                            </div>
                            <div>
                              <p className="font-bold text-foreground">Yamaha TMAX 560</p>
                              <p className="text-[10px] text-[hsl(var(--neon-violet))] uppercase font-bold tracking-widest">Adrénaline</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 font-mono text-xs text-muted-foreground">26-M-55667</td>
                        <td className="p-4">
                          <span className="text-[10px] px-2 py-1 rounded uppercase font-bold tracking-widest inline-flex items-center gap-2 bg-[hsl(var(--neon-cyan)/0.10)] text-[hsl(var(--neon-cyan))] border border-[hsl(var(--neon-cyan)/0.30)]">
                            <span className="w-1.5 h-1.5 bg-[hsl(var(--neon-cyan))] rounded-full" /> Sortie
                          </span>
                        </td>
                        <td className="p-4">
                          <p className="text-xs font-bold">Amine K.</p>
                          <p className="text-[10px] text-muted-foreground">Demain 10:00 (Guéliz)</p>
                        </td>
                        <td className="p-4 text-right">
                          <button className="text-muted-foreground hover:text-foreground">•••</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
