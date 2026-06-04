import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { format, differenceInDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import {
  LayoutDashboard, CalendarDays, Users, Car, LogOut,
  Plus, X, Check, Pencil, Shield, FileText, Wrench,
  DollarSign, TrendingUp, ChevronRight, Bell, Search,
  Bike, AlertCircle, CheckCircle2, Clock, XCircle
} from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────
interface Vehicle {
  id: string; name: string; type: 'car' | 'motorcycle';
  daily_rate: number; is_available: boolean;
  image_url: string | null; description: string | null;
}
interface Reservation {
  id: string; vehicle_id: string; customer_name: string;
  customer_email: string; customer_phone: string | null;
  start_date: string; end_date: string;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  total_amount: number; notes: string | null; created_at: string;
  vehicles?: { name: string; type: string };
}
interface KPI { activeReservations: number; monthlyRevenue: number; totalRevenue: number; }
interface ChargeItem { id: string; label: string; amount: number; }

type ViewType = 'dashboard' | 'reservations' | 'fleet' | 'finance';

// ── Desktop Block Screen ───────────────────────────────────────────────────
const DesktopBlock = () => (
  <div style={{
    minHeight: '100vh', background: 'linear-gradient(135deg, #050A14 0%, #0A1628 50%, #050A14 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: "'Georgia', serif", position: 'relative', overflow: 'hidden'
  }}>
    {/* Background effects */}
    <div style={{
      position: 'absolute', top: '20%', left: '10%', width: '400px', height: '400px',
      background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
      borderRadius: '50%', filter: 'blur(40px)'
    }} />
    <div style={{
      position: 'absolute', bottom: '20%', right: '10%', width: '300px', height: '300px',
      background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)',
      borderRadius: '50%', filter: 'blur(40px)'
    }} />
    <div style={{
      textAlign: 'center', padding: '3rem',
      border: '1px solid rgba(201,168,76,0.2)',
      borderRadius: '24px',
      background: 'rgba(201,168,76,0.03)',
      backdropFilter: 'blur(20px)',
      maxWidth: '520px',
      boxShadow: '0 0 60px rgba(201,168,76,0.05), inset 0 1px 0 rgba(201,168,76,0.1)'
    }}>
      <div style={{
        width: '72px', height: '72px', borderRadius: '50%',
        border: '2px solid rgba(201,168,76,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 2rem',
        boxShadow: '0 0 30px rgba(201,168,76,0.15)'
      }}>
        <Shield size={32} color="#C9A84C" />
      </div>
      <div style={{
        fontSize: '10px', letterSpacing: '4px', color: '#C9A84C',
        marginBottom: '1rem', textTransform: 'uppercase', opacity: 0.7
      }}>Accès Restreint</div>
      <h1 style={{
        fontSize: '1.6rem', color: '#E8D5A3', fontWeight: '600',
        lineHeight: 1.4, marginBottom: '1.5rem', letterSpacing: '0.5px'
      }}>
        Espace Réservé<br />Administration Mobile
      </h1>
      <div style={{
        width: '40px', height: '1px',
        background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)',
        margin: '0 auto 1.5rem'
      }} />
      <p style={{
        color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem',
        lineHeight: 1.7, letterSpacing: '0.3px'
      }}>
        Cet espace de contrôle est strictement réservé aux administrateurs sur interface mobile.
      </p>
      <p style={{
        color: 'rgba(201,168,76,0.6)', fontSize: '0.8rem',
        marginTop: '1.5rem', letterSpacing: '1px'
      }}>
        Veuillez vous connecter depuis votre smartphone.
      </p>
    </div>
  </div>
);

// ── Status Badge ───────────────────────────────────────────────────────────
const StatusBadge = ({ status }: { status: string }) => {
  const cfg: Record<string, { label: string; color: string; bg: string; icon: React.ElementType }> = {
    pending:   { label: 'En attente', color: '#F59E0B', bg: 'rgba(245,158,11,0.12)', icon: Clock },
    confirmed: { label: 'Confirmée',  color: '#C9A84C', bg: 'rgba(201,168,76,0.12)', icon: CheckCircle2 },
    active:    { label: 'En cours',   color: '#22D3EE', bg: 'rgba(34,211,238,0.12)', icon: TrendingUp },
    completed: { label: 'Terminée',   color: '#10B981', bg: 'rgba(16,185,129,0.12)', icon: Check },
    cancelled: { label: 'Annulée',    color: '#EF4444', bg: 'rgba(239,68,68,0.12)',  icon: XCircle },
  };
  const c = cfg[status] || cfg.pending;
  const Icon = c.icon;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      padding: '3px 10px', borderRadius: '20px',
      background: c.bg, color: c.color,
      fontSize: '11px', fontWeight: '600', letterSpacing: '0.3px',
      border: `1px solid ${c.color}30`
    }}>
      <Icon size={10} />
      {c.label}
    </span>
  );
};

// ── KPI Card ───────────────────────────────────────────────────────────────
const KPICard = ({ title, value, sub, accent, icon: Icon }: {
  title: string; value: string; sub?: string;
  accent: string; icon: React.ElementType;
}) => (
  <div style={{
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '16px', padding: '1.1rem 1.2rem',
    display: 'flex', alignItems: 'center', gap: '1rem'
  }}>
    <div style={{
      width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
      background: `${accent}18`, border: `1px solid ${accent}30`,
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <Icon size={20} color={accent} />
    </div>
    <div>
      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.5px', marginBottom: '2px' }}>{title}</div>
      <div style={{ fontSize: '1.4rem', fontWeight: '700', color: accent, fontFamily: "'Georgia', serif" }}>{value}</div>
      {sub && <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginTop: '1px' }}>{sub}</div>}
    </div>
  </div>
);

// ── Charges Card ───────────────────────────────────────────────────────────
const ChargesCard = ({ monthlyRevenue }: { monthlyRevenue: number }) => {
  const INITIAL: ChargeItem[] = [
    { id: 'insurance', label: '🛡️ Assurance', amount: 0 },
    { id: 'registration', label: '📄 Carte Grise', amount: 0 },
    { id: 'maintenance', label: '🔧 Entretien', amount: 0 },
  ];
  const [charges, setCharges] = useState<ChargeItem[]>(() => {
    try {
      const s = localStorage.getItem('knd-charges');
      if (s) { const p = JSON.parse(s); return INITIAL.map(c => ({ ...c, amount: p[c.id] ?? 0 })); }
    } catch {}
    return INITIAL;
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [editVal, setEditVal] = useState('');
  const totalCharges = charges.reduce((s, c) => s + c.amount, 0);
  const net = monthlyRevenue - totalCharges;

  const save = (id: string) => {
    const updated = charges.map(c => c.id === id ? { ...c, amount: parseFloat(editVal) || 0 } : c);
    setCharges(updated);
    const obj: Record<string, number> = {};
    updated.forEach(c => { obj[c.id] = c.amount; });
    localStorage.setItem('knd-charges', JSON.stringify(obj));
    setEditId(null);
  };

  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '16px', padding: '1.2rem', marginTop: '1rem'
    }}>
      <div style={{ fontSize: '12px', color: '#C9A84C', fontWeight: '600', letterSpacing: '1px', marginBottom: '1rem', textTransform: 'uppercase' }}>
        Charges & Bénéfice Net
      </div>
      {charges.map(c => (
        <div key={c.id} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}>
          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>{c.label}</span>
          {editId === c.id ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <input
                type="number" value={editVal}
                onChange={e => setEditVal(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') save(c.id); if (e.key === 'Escape') setEditId(null); }}
                autoFocus
                style={{
                  width: '72px', background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(201,168,76,0.4)', borderRadius: '8px',
                  color: 'white', fontSize: '13px', padding: '4px 8px', textAlign: 'right'
                }}
              />
              <button onClick={() => save(c.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#10B981', padding: '2px' }}><Check size={14} /></button>
              <button onClick={() => setEditId(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', padding: '2px' }}><X size={14} /></button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'white' }}>{c.amount}€</span>
              <button onClick={() => { setEditId(c.id); setEditVal(String(c.amount)); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', padding: '2px' }}>
                <Pencil size={12} />
              </button>
            </div>
          )}
        </div>
      ))}
      <div style={{ marginTop: '1rem', padding: '12px', background: 'rgba(201,168,76,0.06)', borderRadius: '12px', border: '1px solid rgba(201,168,76,0.15)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>Total charges</span>
          <span style={{ fontSize: '12px', color: '#EF4444', fontWeight: '600' }}>-{totalCharges}€</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>CA mensuel</span>
          <span style={{ fontSize: '12px', color: '#22D3EE', fontWeight: '600' }}>+{monthlyRevenue}€</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', color: 'white' }}>Bénéfice Net</span>
          <span style={{ fontSize: '16px', fontWeight: '800', color: net >= 0 ? '#10B981' : '#EF4444', fontFamily: "'Georgia', serif" }}>
            {net >= 0 ? '+' : ''}{net}€
          </span>
        </div>
      </div>
    </div>
  );
};

// ── New Reservation Bottom Sheet ───────────────────────────────────────────
const NewReservationSheet = ({ vehicles, onCreated, onClose }: {
  vehicles: Vehicle[]; onCreated: () => void; onClose: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    vehicle_id: '', customer_name: '', customer_email: '',
    customer_phone: '', start_date: '', end_date: '', notes: ''
  });

  const vehicle = vehicles.find(v => v.id === form.vehicle_id);
  const days = form.start_date && form.end_date
    ? Math.max(1, differenceInDays(new Date(form.end_date), new Date(form.start_date)) + 1) : 0;
  const total = days * (vehicle?.daily_rate || 0);

  const handleSubmit = async () => {
    if (!form.vehicle_id || !form.customer_name || !form.customer_email || !form.start_date || !form.end_date) return;
    setLoading(true);
    try {
      await supabase.from('reservations').insert({
        vehicle_id: form.vehicle_id, customer_name: form.customer_name,
        customer_email: form.customer_email, customer_phone: form.customer_phone || null,
        start_date: form.start_date, end_date: form.end_date,
        total_amount: total, status: 'confirmed', notes: form.notes || null
      });
      onCreated(); onClose();
    } finally { setLoading(false); }
  };

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px',
    color: 'white', fontSize: '14px', padding: '12px 14px',
    boxSizing: 'border-box' as const, outline: 'none',
    WebkitAppearance: 'none' as const
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'flex-end'
    }} onClick={onClose}>
      <div style={{
        width: '100%', background: '#0D1B2A',
        borderRadius: '24px 24px 0 0', padding: '1.5rem',
        border: '1px solid rgba(201,168,76,0.2)',
        maxHeight: '90vh', overflowY: 'auto'
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <span style={{ color: '#C9A84C', fontWeight: '700', fontSize: '16px', letterSpacing: '0.5px' }}>Nouvelle Réservation</span>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}><X size={16} /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <select value={form.vehicle_id} onChange={e => setForm(p => ({ ...p, vehicle_id: e.target.value }))} style={{ ...inputStyle, background: 'rgba(255,255,255,0.06)' }}>
            <option value="" style={{ background: '#0D1B2A' }}>Choisir un véhicule</option>
            {vehicles.filter(v => v.is_available).map(v => (
              <option key={v.id} value={v.id} style={{ background: '#0D1B2A' }}>{v.name} — {v.daily_rate}€/j</option>
            ))}
          </select>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <input type="date" value={form.start_date} onChange={e => setForm(p => ({ ...p, start_date: e.target.value }))} style={inputStyle} />
            <input type="date" value={form.end_date} onChange={e => setForm(p => ({ ...p, end_date: e.target.value }))} style={inputStyle} />
          </div>
          <input type="text" placeholder="Nom du client *" value={form.customer_name} onChange={e => setForm(p => ({ ...p, customer_name: e.target.value }))} style={inputStyle} />
          <input type="email" placeholder="Email *" value={form.customer_email} onChange={e => setForm(p => ({ ...p, customer_email: e.target.value }))} style={inputStyle} />
          <input type="tel" placeholder="Téléphone" value={form.customer_phone} onChange={e => setForm(p => ({ ...p, customer_phone: e.target.value }))} style={inputStyle} />
          <textarea placeholder="Notes" value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} rows={2} style={{ ...inputStyle, resize: 'none' }} />

          {days > 0 && (
            <div style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '12px', padding: '12px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>{days} jour{days > 1 ? 's' : ''} × {vehicle?.daily_rate}€</span>
              <span style={{ color: '#C9A84C', fontWeight: '700', fontSize: '16px' }}>{total}€</span>
            </div>
          )}

          <button onClick={handleSubmit} disabled={loading || !form.vehicle_id || !form.customer_name} style={{
            width: '100%', padding: '15px', borderRadius: '14px',
            background: loading ? 'rgba(201,168,76,0.3)' : 'linear-gradient(135deg, #C9A84C, #A0782A)',
            border: 'none', color: '#050A14', fontWeight: '800', fontSize: '15px',
            cursor: loading ? 'not-allowed' : 'pointer', letterSpacing: '0.5px',
            boxShadow: '0 4px 20px rgba(201,168,76,0.3)'
          }}>
            {loading ? 'Création...' : 'Créer la réservation'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Main Dashboard ─────────────────────────────────────────────────────────
const AdminDashboard: React.FC = () => {
  const { signOut } = useAuth();
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [view, setView] = useState<ViewType>('dashboard');
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [kpi, setKpi] = useState<KPI>({ activeReservations: 0, monthlyRevenue: 0, totalRevenue: 0 });
  const [loading, setLoading] = useState(true);
  const [showNewRes, setShowNewRes] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [{ data: v }, { data: r }] = await Promise.all([
        supabase.from('vehicles').select('*').order('name'),
        supabase.from('reservations').select('*, vehicles(name, type)').order('created_at', { ascending: false })
      ]);
      setVehicles(v || []);
      setReservations(r || []);
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      const [{ data: monthly }, { data: active }] = await Promise.all([
        supabase.rpc('calculate_monthly_revenue', { _month: month, _year: year }),
        supabase.rpc('get_active_reservations_count')
      ]);
      const total = (r || []).filter(x => ['confirmed', 'active', 'completed'].includes(x.status)).reduce((s, x) => s + Number(x.total_amount), 0);
      setKpi({ activeReservations: active || 0, monthlyRevenue: monthly || 0, totalRevenue: total });
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filteredReservations = useMemo(() =>
    reservations.filter(r =>
      r.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.customer_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.vehicles?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    ), [reservations, searchQuery]);

  if (isMobile === null) return null;
  if (!isMobile) return <DesktopBlock />;

  const s = {
    screen: { minHeight: '100vh', background: '#050A14', color: 'white', fontFamily: "'Montserrat', sans-serif", paddingBottom: '80px' } as React.CSSProperties,
    header: { padding: '1.2rem 1.2rem 0.8rem', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } as React.CSSProperties,
    content: { padding: '1.2rem' } as React.CSSProperties,
    sectionTitle: { fontSize: '11px', color: '#C9A84C', letterSpacing: '2px', textTransform: 'uppercase' as const, fontWeight: '700', marginBottom: '1rem' },
    card: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '1rem' } as React.CSSProperties,
    bottomNav: {
      position: 'fixed' as const, bottom: 0, left: 0, right: 0,
      background: 'rgba(5,10,20,0.95)', backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(201,168,76,0.15)',
      display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
      padding: '8px 0 max(8px, env(safe-area-inset-bottom))',
      zIndex: 50
    } as React.CSSProperties,
  };

  const navItems: { view: ViewType; icon: React.ElementType; label: string }[] = [
    { view: 'dashboard', icon: LayoutDashboard, label: 'Accueil' },
    { view: 'reservations', icon: CalendarDays, label: 'Réservations' },
    { view: 'fleet', icon: Car, label: 'Flotte' },
    { view: 'finance', icon: DollarSign, label: 'Finances' },
  ];

  // ── VIEWS ────────────────────────────────────────────────────────────────
  const renderDashboard = () => (
    <div style={s.content}>
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={s.sectionTitle}>Vue d'ensemble</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <KPICard title="Réservations actives" value={String(kpi.activeReservations)} sub="Véhicules en location" accent="#C9A84C" icon={Users} />
          <KPICard title="CA ce mois" value={`${kpi.monthlyRevenue}€`} sub={format(new Date(), 'MMMM yyyy', { locale: fr })} accent="#22D3EE" icon={TrendingUp} />
          <KPICard title="CA total" value={`${kpi.totalRevenue}€`} sub="Cumul global" accent="#10B981" icon={DollarSign} />
        </div>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <div style={s.sectionTitle}>État de la flotte</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {vehicles.slice(0, 4).map(v => (
            <div key={v.id} style={{ ...s.card, display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: v.type === 'car' ? 'rgba(34,211,238,0.1)' : 'rgba(201,168,76,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {v.type === 'car' ? <Car size={18} color="#22D3EE" /> : <Bike size={18} color="#C9A84C" />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.name}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{v.daily_rate}€/jour</div>
              </div>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: v.is_available ? '#10B981' : '#EF4444', flexShrink: 0, boxShadow: `0 0 8px ${v.is_available ? '#10B981' : '#EF4444'}` }} />
            </div>
          ))}
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={s.sectionTitle}>Dernières réservations</div>
          <button onClick={() => setView('reservations')} style={{ background: 'none', border: 'none', color: '#C9A84C', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px' }}>
            Voir tout <ChevronRight size={12} />
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {reservations.slice(0, 3).map(r => (
            <div key={r.id} style={s.card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: 'white' }}>{r.customer_name}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{r.vehicles?.name}</div>
                </div>
                <StatusBadge status={r.status} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>
                  {format(new Date(r.start_date), 'dd/MM')} → {format(new Date(r.end_date), 'dd/MM/yy')}
                </span>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#C9A84C' }}>{r.total_amount}€</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReservations = () => (
    <div style={s.content}>
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
          <input
            type="text" placeholder="Rechercher..." value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: 'white', fontSize: '14px', padding: '11px 14px 11px 36px', boxSizing: 'border-box', outline: 'none' }}
          />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredReservations.map(r => (
          <div key={r.id} style={{ ...s.card, borderLeft: '3px solid rgba(201,168,76,0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: 'white', marginBottom: '2px' }}>{r.customer_name}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{r.customer_email}</div>
              </div>
              <StatusBadge status={r.status} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              {r.vehicles?.type === 'car' ? <Car size={13} color="#22D3EE" /> : <Bike size={13} color="#C9A84C" />}
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>{r.vehicles?.name}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>
                {format(new Date(r.start_date), 'dd MMM', { locale: fr })} → {format(new Date(r.end_date), 'dd MMM yy', { locale: fr })}
              </span>
              <span style={{ fontSize: '14px', fontWeight: '800', color: '#C9A84C', fontFamily: "'Georgia', serif" }}>{r.total_amount}€</span>
            </div>
            {r.customer_phone && (
              <a href={`https://wa.me/${r.customer_phone.replace(/\D/g,'')}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', padding: '8px 12px', background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.2)', borderRadius: '10px', color: '#25D366', fontSize: '12px', fontWeight: '600', textDecoration: 'none' }}>
                📱 Contacter sur WhatsApp
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderFleet = () => (
    <div style={s.content}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {vehicles.map(v => (
          <div key={v.id} style={s.card}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: v.type === 'car' ? 'rgba(34,211,238,0.1)' : 'rgba(201,168,76,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {v.type === 'car' ? <Car size={22} color="#22D3EE" /> : <Bike size={22} color="#C9A84C" />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: 'white' }}>{v.name}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{v.description || 'Aucune description'}</div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: '16px', fontWeight: '800', color: '#C9A84C', fontFamily: "'Georgia', serif" }}>{v.daily_rate}€<span style={{ fontSize: '11px', fontWeight: '400', color: 'rgba(255,255,255,0.4)' }}>/jour</span></span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '600', background: v.is_available ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)', color: v.is_available ? '#10B981' : '#EF4444', border: `1px solid ${v.is_available ? '#10B98130' : '#EF444430'}` }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }} />
                {v.is_available ? 'Disponible' : 'Indisponible'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFinance = () => (
    <div style={s.content}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1rem' }}>
        <KPICard title="CA ce mois" value={`${kpi.monthlyRevenue}€`} sub={format(new Date(), 'MMMM yyyy', { locale: fr })} accent="#22D3EE" icon={TrendingUp} />
        <KPICard title="CA total" value={`${kpi.totalRevenue}€`} sub="Depuis le début" accent="#10B981" icon={DollarSign} />
      </div>
      <ChargesCard monthlyRevenue={kpi.monthlyRevenue} />
    </div>
  );

  return (
    <div style={s.screen}>
      {/* Header */}
      <div style={s.header}>
        <div>
          <div style={{ fontSize: '9px', color: '#C9A84C', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '2px' }}>Centre de Contrôle</div>
          <div style={{ fontSize: '16px', fontWeight: '700', color: 'white', fontFamily: "'Georgia', serif" }}>Kech Night Drive</div>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button onClick={() => setShowNewRes(true)} style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #C9A84C, #A0782A)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 15px rgba(201,168,76,0.3)' }}>
            <Plus size={18} color="#050A14" />
          </button>
          <button onClick={signOut} style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <LogOut size={16} color="#EF4444" />
          </button>
        </div>
      </div>

      {/* Date bar */}
      <div style={{ padding: '8px 1.2rem', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.5px' }}>
          {format(new Date(), "EEEE dd MMMM yyyy", { locale: fr })}
        </span>
      </div>

      {/* Content */}
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '40px', height: '40px', border: '2px solid rgba(201,168,76,0.2)', borderTop: '2px solid #C9A84C', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 12px' }} />
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>Chargement...</div>
          </div>
        </div>
      ) : (
        <>
          {view === 'dashboard' && renderDashboard()}
          {view === 'reservations' && renderReservations()}
          {view === 'fleet' && renderFleet()}
          {view === 'finance' && renderFinance()}
        </>
      )}

      {/* Bottom Nav */}
      <nav style={s.bottomNav}>
        {navItems.map(({ view: v, icon: Icon, label }) => (
          <button key={v} onClick={() => setView(v)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '4px', transition: 'opacity 0.2s' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: view === v ? 'rgba(201,168,76,0.15)' : 'transparent', transition: 'background 0.2s' }}>
              <Icon size={20} color={view === v ? '#C9A84C' : 'rgba(255,255,255,0.3)'} />
            </div>
            <span style={{ fontSize: '9px', color: view === v ? '#C9A84C' : 'rgba(255,255,255,0.3)', fontWeight: view === v ? '700' : '400', letterSpacing: '0.3px' }}>{label}</span>
          </button>
        ))}
      </nav>

      {/* New Reservation Sheet */}
      {showNewRes && <NewReservationSheet vehicles={vehicles} onCreated={fetchData} onClose={() => setShowNewRes(false)} />}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default AdminDashboard;
