import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, addDays, eachDayOfInterval, isSameDay, differenceInDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Car, Bike, Calendar as CalendarIcon, TrendingUp, DollarSign, Users, Menu, LogOut, Plus, Search, Bell, Shield, FileText, Wrench, Pencil, Check, X } from 'lucide-react';

// Configuration du localisateur français
const locales = { 'fr': fr };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

// Types
interface Vehicle {
  id: string;
  name: string;
  type: 'car' | 'motorcycle';
  daily_rate: number;
  is_available: boolean;
  image_url: string | null;
  description: string | null;
}

interface Reservation {
  id: string;
  vehicle_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  start_date: string;
  end_date: string;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  total_amount: number;
  notes: string | null;
  created_at: string;
  vehicles?: { name: string; type: string };
}

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource: { reservation: Reservation; vehicle: Vehicle };
}

interface KPIData {
  activeReservations: number;
  monthlyRevenue: number;
  totalRevenue: number;
}

interface ChargeItem {
  id: string;
  label: string;
  icon: React.ElementType;
  amount: number;
}

// Logo SVG Component
const LogoMark = () => (
  <div className="flex items-center space-x-2">
    <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-lg flex items-center justify-center">
      <span className="text-white font-bold text-sm">B</span>
    </div>
    <span className="font-bold text-lg bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
      B-LINE 26
    </span>
  </div>
);

type ViewType = 'dashboard' | 'calendar' | 'reservations' | 'fleet';

// Sidebar Component
interface SidebarNavProps {
  onLogout: () => void;
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const sidebarItems: { view: ViewType; label: string; icon: React.ElementType }[] = [
  { view: 'dashboard', label: 'Dashboard', icon: TrendingUp },
  { view: 'calendar', label: 'Calendrier', icon: CalendarIcon },
  { view: 'reservations', label: 'Réservations', icon: Users },
  { view: 'fleet', label: 'Flotte', icon: Car },
];

const SidebarNav: React.FC<SidebarNavProps> = ({ onLogout, currentView, onViewChange }) => (
  <div className="flex flex-col h-full bg-gray-950 border-r border-gray-800">
    <div className="p-6 border-b border-gray-800">
      <LogoMark />
    </div>
    <nav className="flex-1 p-4">
      <div className="space-y-2">
        {sidebarItems.map(({ view, label, icon: Icon }) => (
          <Button
            key={view}
            variant="ghost"
            onClick={() => onViewChange(view)}
            className={`w-full justify-start transition-all duration-200 ${
              currentView === view
                ? 'text-violet-200 bg-violet-900/30 border border-violet-700/50'
                : 'text-gray-300 hover:text-white hover:bg-gray-800'
            }`}
          >
            <Icon className="w-5 h-5 mr-3" />
            {label}
          </Button>
        ))}
      </div>
    </nav>
    <div className="p-4 border-t border-gray-800">
      <Button onClick={onLogout} variant="ghost" className="w-full justify-start text-red-300 hover:text-red-100 hover:bg-red-900/20">
        <LogOut className="w-5 h-5 mr-3" />
        Déconnexion
      </Button>
    </div>
  </div>
);

// Charges Card Component
interface ChargesCardProps {
  monthlyRevenue: number;
}

const INITIAL_CHARGES: ChargeItem[] = [
  { id: 'insurance', label: '🛡️ Assurance mensuelle', icon: Shield, amount: 0 },
  { id: 'registration', label: '📄 Carte Grise / Vignette (mensuel)', icon: FileText, amount: 0 },
  { id: 'maintenance', label: '🔧 Frais d\'entretien prévus', icon: Wrench, amount: 0 },
];

const ChargesCard: React.FC<ChargesCardProps> = ({ monthlyRevenue }) => {
  const [charges, setCharges] = useState<ChargeItem[]>(() => {
    const saved = localStorage.getItem('b26-charges');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return INITIAL_CHARGES.map(c => ({ ...c, amount: parsed[c.id] ?? 0 }));
      } catch { return INITIAL_CHARGES; }
    }
    return INITIAL_CHARGES;
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const totalCharges = charges.reduce((sum, c) => sum + c.amount, 0);
  const netProfit = monthlyRevenue - totalCharges;

  const startEdit = (charge: ChargeItem) => {
    setEditingId(charge.id);
    setEditValue(String(charge.amount));
  };

  const saveEdit = (id: string) => {
    const newAmount = parseFloat(editValue) || 0;
    const updated = charges.map(c => c.id === id ? { ...c, amount: newAmount } : c);
    setCharges(updated);
    const toSave: Record<string, number> = {};
    updated.forEach(c => { toSave[c.id] = c.amount; });
    localStorage.setItem('b26-charges', JSON.stringify(toSave));
    setEditingId(null);
  };

  const cancelEdit = () => setEditingId(null);

  return (
    <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-cyan-300 text-base flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Charges Fixes & Dépenses
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {charges.map(charge => (
          <div key={charge.id} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
            <span className="text-sm text-gray-300">{charge.label}</span>
            {editingId === charge.id ? (
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  className="w-24 h-7 text-sm bg-gray-800 border-gray-700"
                  autoFocus
                  onKeyDown={e => { if (e.key === 'Enter') saveEdit(charge.id); if (e.key === 'Escape') cancelEdit(); }}
                />
                <Button size="icon" variant="ghost" className="h-7 w-7 text-green-400" onClick={() => saveEdit(charge.id)}>
                  <Check className="w-3 h-3" />
                </Button>
                <Button size="icon" variant="ghost" className="h-7 w-7 text-red-400" onClick={cancelEdit}>
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white">{charge.amount}€</span>
                <Button size="icon" variant="ghost" className="h-6 w-6 text-gray-500 hover:text-white" onClick={() => startEdit(charge)}>
                  <Pencil className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>
        ))}

        <div className="pt-3 border-t border-gray-700 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Total Charges</span>
            <span className="font-semibold text-red-400">-{totalCharges}€</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">CA Mensuel</span>
            <span className="font-semibold text-cyan-400">+{monthlyRevenue}€</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-gray-700">
            <span className="text-sm font-bold text-white">Bénéfice Net Estimé</span>
            <span className={`text-lg font-black ${netProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {netProfit >= 0 ? '+' : ''}{netProfit}€
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// KPI Card Component
interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  accent: 'violet' | 'cyan' | 'green';
  icon: React.ElementType;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, subtitle, accent, icon: Icon }) => {
  const accentColors = {
    violet: 'from-violet-600 to-violet-400',
    cyan: 'from-cyan-600 to-cyan-400',
    green: 'from-emerald-600 to-emerald-400'
  };

  return (
    <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400 mb-1">{title}</p>
            <p className={`text-2xl font-bold bg-gradient-to-r ${accentColors[accent]} bg-clip-text text-transparent`}>
              {value}
            </p>
            {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
          </div>
          <div className={`p-3 rounded-lg bg-gradient-to-r ${accentColors[accent]} opacity-20`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// New Reservation Dialog
interface NewReservationDialogProps {
  vehicles: Vehicle[];
  onReservationCreated: () => void;
}

const NewReservationDialog: React.FC<NewReservationDialogProps> = ({ vehicles, onReservationCreated }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    vehicle_id: '', customer_name: '', customer_email: '', customer_phone: '', start_date: '', end_date: '', notes: ''
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.vehicle_id || !formData.customer_name || !formData.customer_email || !formData.start_date || !formData.end_date) {
      toast({ title: "Erreur", description: "Veuillez remplir tous les champs obligatoires", variant: "destructive" });
      return;
    }
    const vehicle = vehicles.find(v => v.id === formData.vehicle_id);
    if (!vehicle) return;
    const days = differenceInDays(new Date(formData.end_date), new Date(formData.start_date)) + 1;
    const totalAmount = days * Number(vehicle.daily_rate);

    setLoading(true);
    try {
      const { error } = await supabase.from('reservations').insert({
        vehicle_id: formData.vehicle_id, customer_name: formData.customer_name, customer_email: formData.customer_email,
        customer_phone: formData.customer_phone || null, start_date: formData.start_date, end_date: formData.end_date,
        total_amount: totalAmount, status: 'confirmed', notes: formData.notes || null
      });
      if (error) throw error;
      toast({ title: "Réservation créée", description: `${days} jour(s) confirmé(s) pour ${totalAmount}€` });
      setFormData({ vehicle_id: '', customer_name: '', customer_email: '', customer_phone: '', start_date: '', end_date: '', notes: '' });
      setOpen(false);
      onReservationCreated();
    } catch (error) {
      console.error('Erreur:', error);
      toast({ title: "Erreur", description: "Impossible de créer la réservation", variant: "destructive" });
    } finally { setLoading(false); }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-700 hover:to-violet-600">
          <Plus className="w-4 h-4 mr-2" /> Nouvelle Réservation
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-md">
        <DialogHeader><DialogTitle className="text-violet-300">Nouvelle Réservation</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="vehicle">Véhicule *</Label>
            <Select value={formData.vehicle_id} onValueChange={(value) => setFormData(prev => ({ ...prev, vehicle_id: value }))}>
              <SelectTrigger className="bg-gray-800 border-gray-700"><SelectValue placeholder="Choisir un véhicule" /></SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {vehicles.filter(v => v.is_available).map((vehicle) => (
                  <SelectItem key={vehicle.id} value={vehicle.id}>
                    <div className="flex items-center space-x-2">
                      {vehicle.type === 'car' ? <Car className="w-4 h-4" /> : <Bike className="w-4 h-4" />}
                      <span>{vehicle.name} - {vehicle.daily_rate}€/jour</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Date début *</Label><Input type="date" value={formData.start_date} onChange={e => setFormData(p => ({ ...p, start_date: e.target.value }))} className="bg-gray-800 border-gray-700" /></div>
            <div><Label>Date fin *</Label><Input type="date" value={formData.end_date} onChange={e => setFormData(p => ({ ...p, end_date: e.target.value }))} className="bg-gray-800 border-gray-700" /></div>
          </div>
          <div><Label>Nom du client *</Label><Input value={formData.customer_name} onChange={e => setFormData(p => ({ ...p, customer_name: e.target.value }))} className="bg-gray-800 border-gray-700" /></div>
          <div><Label>Email *</Label><Input type="email" value={formData.customer_email} onChange={e => setFormData(p => ({ ...p, customer_email: e.target.value }))} className="bg-gray-800 border-gray-700" /></div>
          <div><Label>Téléphone</Label><Input value={formData.customer_phone} onChange={e => setFormData(p => ({ ...p, customer_phone: e.target.value }))} className="bg-gray-800 border-gray-700" /></div>
          <div><Label>Notes</Label><Textarea value={formData.notes} onChange={e => setFormData(p => ({ ...p, notes: e.target.value }))} className="bg-gray-800 border-gray-700" rows={3} /></div>
          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">Annuler</Button>
            <Button type="submit" disabled={loading} className="flex-1 bg-gradient-to-r from-violet-600 to-violet-500">{loading ? 'Création...' : 'Créer'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Status Badge
const getStatusBadge = (status: string) => {
  const cfg: Record<string, { label: string; color: string }> = {
    pending: { label: 'En attente', color: 'bg-yellow-900 text-yellow-300 border-yellow-700' },
    confirmed: { label: 'Confirmée', color: 'bg-cyan-900 text-cyan-300 border-cyan-700' },
    active: { label: 'En cours', color: 'bg-violet-900 text-violet-300 border-violet-700' },
    completed: { label: 'Terminée', color: 'bg-green-900 text-green-300 border-green-700' },
    cancelled: { label: 'Annulée', color: 'bg-red-900 text-red-300 border-red-700' }
  };
  const c = cfg[status] || cfg.pending;
  return <Badge className={`${c.color} text-xs px-2 py-1`}>{c.label}</Badge>;
};

// Main Component
const AdminDashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [kpiData, setKpiData] = useState<KPIData>({ activeReservations: 0, monthlyRevenue: 0, totalRevenue: 0 });
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const { toast } = useToast();

  const logout = useCallback(async () => {
    await signOut();
    toast({ title: "Déconnexion réussie", description: "À bientôt!" });
  }, [signOut, toast]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: vehiclesData, error: vehiclesError } = await supabase.from('vehicles').select('*').order('name');
      if (vehiclesError) throw vehiclesError;
      setVehicles(vehiclesData || []);

      const { data: reservationsData, error: reservationsError } = await supabase
        .from('reservations').select(`*, vehicles (name, type)`).order('created_at', { ascending: false });
      if (reservationsError) throw reservationsError;
      setReservations(reservationsData || []);

      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      const { data: monthlyData } = await supabase.rpc('calculate_monthly_revenue', { _month: currentMonth, _year: currentYear });
      const { data: activeCount } = await supabase.rpc('get_active_reservations_count');
      const totalRevenue = (reservationsData || [])
        .filter(r => ['confirmed', 'active', 'completed'].includes(r.status))
        .reduce((sum, r) => sum + Number(r.total_amount), 0);

      setKpiData({ activeReservations: activeCount || 0, monthlyRevenue: monthlyData || 0, totalRevenue });
    } catch (error) {
      console.error('Erreur:', error);
      toast({ title: "Erreur", description: "Impossible de charger les données", variant: "destructive" });
    } finally { setLoading(false); }
  }, [toast]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const calendarEvents = useMemo((): CalendarEvent[] => {
    return reservations.filter(r => ['confirmed', 'active'].includes(r.status)).map(reservation => {
      const vehicle = vehicles.find(v => v.id === reservation.vehicle_id);
      if (!vehicle) return null;
      return { id: reservation.id, title: `${vehicle.name} - ${reservation.customer_name}`, start: new Date(reservation.start_date), end: addDays(new Date(reservation.end_date), 1), resource: { reservation, vehicle } };
    }).filter(Boolean) as CalendarEvent[];
  }, [reservations, vehicles]);

  if (loading) {
    return <div className="min-h-screen bg-gray-950 flex items-center justify-center"><div className="text-violet-300">Chargement...</div></div>;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <KPICard title="Réservations en cours" value={kpiData.activeReservations} subtitle="Véhicules actuellement loués" accent="violet" icon={Users} />
              <KPICard title="CA Mensuel" value={`${kpiData.monthlyRevenue}€`} subtitle={format(new Date(), 'MMMM yyyy', { locale: fr })} accent="cyan" icon={TrendingUp} />
              <KPICard title="CA Total" value={`${kpiData.totalRevenue}€`} subtitle="Chiffre d'affaires global" accent="green" icon={DollarSign} />
            </div>

            {/* Charges & Net Profit */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChargesCard monthlyRevenue={kpiData.monthlyRevenue} />
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader><CardTitle className="text-cyan-300">État de la Flotte</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3">
                    {vehicles.map(vehicle => (
                      <div key={vehicle.id} className="p-3 bg-gray-800/50 rounded-lg border border-gray-700 flex items-center space-x-3">
                        {vehicle.type === 'car' ? <Car className="w-5 h-5 text-cyan-400" /> : <Bike className="w-5 h-5 text-violet-400" />}
                        <div className="flex-1">
                          <h4 className="font-medium text-white text-sm">{vehicle.name}</h4>
                          <p className="text-xs text-gray-400">{vehicle.daily_rate}€/jour</p>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${vehicle.is_available ? 'bg-green-400' : 'bg-red-400'}`} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-violet-300">Actions Rapides</h2>
              <NewReservationDialog vehicles={vehicles} onReservationCreated={fetchData} />
            </div>
          </div>
        );

      case 'calendar':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-cyan-300">Calendrier des Réservations</h2>
              <NewReservationDialog vehicles={vehicles} onReservationCreated={fetchData} />
            </div>
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-6">
                <div style={{ height: '600px' }} className="calendar-dark">
                  <Calendar localizer={localizer} events={calendarEvents} startAccessor="start" endAccessor="end" style={{ height: '100%' }}
                    messages={{ next: "Suivant", previous: "Précédent", today: "Aujourd'hui", month: "Mois", week: "Semaine", day: "Jour" }}
                    eventPropGetter={() => ({ style: { backgroundColor: '#8B5CF6', borderColor: '#06B6D4', color: 'white' } })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'reservations':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-emerald-300">Réservations</h2>
              <NewReservationDialog vehicles={vehicles} onReservationCreated={fetchData} />
            </div>
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700">
                      <TableHead className="text-gray-300">Client</TableHead>
                      <TableHead className="text-gray-300">Véhicule</TableHead>
                      <TableHead className="text-gray-300">Dates</TableHead>
                      <TableHead className="text-gray-300">Statut</TableHead>
                      <TableHead className="text-gray-300">Montant</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reservations.map(reservation => (
                      <TableRow key={reservation.id} className="border-gray-700">
                        <TableCell>
                          <p className="font-medium text-white">{reservation.customer_name}</p>
                          <p className="text-sm text-gray-400">{reservation.customer_email}</p>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {reservation.vehicles?.type === 'car' ? <Car className="w-4 h-4 text-cyan-400" /> : <Bike className="w-4 h-4 text-violet-400" />}
                            <span className="text-white">{reservation.vehicles?.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-white text-sm">{format(new Date(reservation.start_date), 'dd/MM/yyyy')}</p>
                          <p className="text-gray-400 text-sm">au {format(new Date(reservation.end_date), 'dd/MM/yyyy')}</p>
                        </TableCell>
                        <TableCell>{getStatusBadge(reservation.status)}</TableCell>
                        <TableCell className="font-medium text-white">{reservation.total_amount}€</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );

      case 'fleet':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-cyan-300">Gestion de la Flotte</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {vehicles.map(vehicle => (
                <Card key={vehicle.id} className="bg-gray-900/50 border-gray-800">
                  <CardContent className="p-5">
                    <div className="flex items-center space-x-3 mb-3">
                      {vehicle.type === 'car' ? <Car className="w-6 h-6 text-cyan-400" /> : <Bike className="w-6 h-6 text-violet-400" />}
                      <h3 className="font-semibold text-white">{vehicle.name}</h3>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{vehicle.description || 'Aucune description'}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-cyan-300 font-bold">{vehicle.daily_rate}€/jour</span>
                      <Badge className={vehicle.is_available ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}>
                        {vehicle.is_available ? 'Disponible' : 'Indisponible'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-950 text-white">
        {/* Desktop Layout */}
        <div className="hidden lg:flex h-screen">
          <div className="w-64 flex-shrink-0">
            <SidebarNav onLogout={logout} currentView={currentView} onViewChange={setCurrentView} />
          </div>
          <main className="flex-1 overflow-auto">
            <header className="bg-gray-900/50 border-b border-gray-800 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-violet-300">Dashboard B-LINE 26</h1>
                  <p className="text-gray-400 text-sm">{format(new Date(), 'EEEE dd MMMM yyyy', { locale: fr })}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input placeholder="Rechercher..." className="pl-10 w-64 bg-gray-800 border-gray-700 text-white" />
                  </div>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white"><Bell className="w-5 h-5" /></Button>
                </div>
              </div>
            </header>
            <div className="p-6">{renderContent()}</div>
          </main>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <header className="bg-gray-900 border-b border-gray-800 px-4 py-3">
            <div className="flex items-center justify-between">
              <Sheet>
                <SheetTrigger asChild><Button variant="ghost" size="icon"><Menu className="h-6 w-6" /></Button></SheetTrigger>
                <SheetContent side="left" className="w-64 bg-gray-950 border-gray-800 p-0">
                  <SidebarNav onLogout={logout} currentView={currentView} onViewChange={setCurrentView} />
                </SheetContent>
              </Sheet>
              <LogoMark />
              <Button variant="ghost" size="icon" className="text-gray-400"><Bell className="w-5 h-5" /></Button>
            </div>
          </header>
          <main className="p-4">{renderContent()}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
