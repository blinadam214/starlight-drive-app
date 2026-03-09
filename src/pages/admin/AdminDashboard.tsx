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
import { Sidebar, SidebarContent, SidebarHeader, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Car, Bike, Calendar as CalendarIcon, TrendingUp, DollarSign, Users, Menu, LogOut, Plus, Search, Bell } from 'lucide-react';

// Configuration du localisateur français
const locales = {
  'fr': fr,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

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
  vehicles?: {
    name: string;
    type: string;
  };
}

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource: {
    reservation: Reservation;
    vehicle: Vehicle;
  };
}

interface KPIData {
  activeReservations: number;
  monthlyRevenue: number;
  totalRevenue: number;
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

// Sidebar Component
interface SidebarNavProps {
  onLogout: () => void;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ onLogout }) => (
  <div className="flex flex-col h-full bg-gray-950 border-r border-gray-800">
    <div className="p-6 border-b border-gray-800">
      <LogoMark />
    </div>
    
    <nav className="flex-1 p-4">
      <div className="space-y-2">
        <Button variant="ghost" className="w-full justify-start text-violet-300 hover:text-violet-100 hover:bg-violet-900/20">
          <TrendingUp className="w-5 h-5 mr-3" />
          Dashboard
        </Button>
        <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800">
          <CalendarIcon className="w-5 h-5 mr-3" />
          Calendrier
        </Button>
        <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800">
          <Users className="w-5 h-5 mr-3" />
          Réservations
        </Button>
        <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800">
          <Car className="w-5 h-5 mr-3" />
          Flotte
        </Button>
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
    vehicle_id: '',
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    start_date: '',
    end_date: '',
    notes: ''
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

    const startDate = new Date(formData.start_date);
    const endDate = new Date(formData.end_date);
    const days = differenceInDays(endDate, startDate) + 1;
    const totalAmount = days * Number(vehicle.daily_rate);

    setLoading(true);
    try {
      const { error } = await supabase
        .from('reservations')
        .insert({
          vehicle_id: formData.vehicle_id,
          customer_name: formData.customer_name,
          customer_email: formData.customer_email,
          customer_phone: formData.customer_phone || null,
          start_date: formData.start_date,
          end_date: formData.end_date,
          total_amount: totalAmount,
          status: 'confirmed',
          notes: formData.notes || null
        });

      if (error) throw error;

      // Simulation d'envoi d'email admin
      console.log('📧 Email envoyé à admin@bline26.com:', {
        subject: `Nouvelle réservation - ${formData.customer_name}`,
        vehicle: vehicle.name,
        dates: `${formData.start_date} au ${formData.end_date}`,
        amount: `${totalAmount}€`
      });

      toast({ 
        title: "Réservation créée", 
        description: `Réservation de ${days} jour${days > 1 ? 's' : ''} confirmée pour ${totalAmount}€. Email envoyé à l'admin.`
      });
      
      setFormData({
        vehicle_id: '',
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        start_date: '',
        end_date: '',
        notes: ''
      });
      setOpen(false);
      onReservationCreated();
    } catch (error) {
      console.error('Erreur:', error);
      toast({ title: "Erreur", description: "Impossible de créer la réservation", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-700 hover:to-violet-600">
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle Réservation
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-violet-300">Nouvelle Réservation</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="vehicle">Véhicule *</Label>
            <Select value={formData.vehicle_id} onValueChange={(value) => setFormData(prev => ({ ...prev, vehicle_id: value }))}>
              <SelectTrigger className="bg-gray-800 border-gray-700">
                <SelectValue placeholder="Choisir un véhicule" />
              </SelectTrigger>
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
            <div>
              <Label htmlFor="start_date">Date début *</Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <div>
              <Label htmlFor="end_date">Date fin *</Label>
              <Input
                id="end_date"
                type="date"
                value={formData.end_date}
                onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                className="bg-gray-800 border-gray-700"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="customer_name">Nom du client *</Label>
            <Input
              id="customer_name"
              value={formData.customer_name}
              onChange={(e) => setFormData(prev => ({ ...prev, customer_name: e.target.value }))}
              className="bg-gray-800 border-gray-700"
            />
          </div>

          <div>
            <Label htmlFor="customer_email">Email *</Label>
            <Input
              id="customer_email"
              type="email"
              value={formData.customer_email}
              onChange={(e) => setFormData(prev => ({ ...prev, customer_email: e.target.value }))}
              className="bg-gray-800 border-gray-700"
            />
          </div>

          <div>
            <Label htmlFor="customer_phone">Téléphone</Label>
            <Input
              id="customer_phone"
              value={formData.customer_phone}
              onChange={(e) => setFormData(prev => ({ ...prev, customer_phone: e.target.value }))}
              className="bg-gray-800 border-gray-700"
            />
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="bg-gray-800 border-gray-700"
              rows={3}
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Annuler
            </Button>
            <Button type="submit" disabled={loading} className="flex-1 bg-gradient-to-r from-violet-600 to-violet-500">
              {loading ? 'Création...' : 'Créer'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Status Badge Component
const getStatusBadge = (status: string) => {
  const statusConfig = {
    pending: { label: 'En attente', color: 'bg-yellow-900 text-yellow-300 border-yellow-700' },
    confirmed: { label: 'Confirmée', color: 'bg-cyan-900 text-cyan-300 border-cyan-700' },
    active: { label: 'En cours', color: 'bg-violet-900 text-violet-300 border-violet-700' },
    completed: { label: 'Terminée', color: 'bg-green-900 text-green-300 border-green-700' },
    cancelled: { label: 'Annulée', color: 'bg-red-900 text-red-300 border-red-700' }
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  return (
    <Badge className={`${config.color} text-xs px-2 py-1`}>
      {config.label}
    </Badge>
  );
};

// Main Component
const AdminDashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [kpiData, setKpiData] = useState<KPIData>({ activeReservations: 0, monthlyRevenue: 0, totalRevenue: 0 });
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'dashboard' | 'calendar' | 'reservations'>('dashboard');
  const { toast } = useToast();

  const logout = useCallback(async () => {
    await signOut();
    toast({ title: "Déconnexion réussie", description: "À bientôt!" });
  }, [signOut, toast]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Récupérer les véhicules
      const { data: vehiclesData, error: vehiclesError } = await supabase
        .from('vehicles')
        .select('*')
        .order('name');
      
      if (vehiclesError) throw vehiclesError;
      setVehicles(vehiclesData || []);

      // Récupérer les réservations avec les véhicules
      const { data: reservationsData, error: reservationsError } = await supabase
        .from('reservations')
        .select(`
          *,
          vehicles (name, type)
        `)
        .order('created_at', { ascending: false });
      
      if (reservationsError) throw reservationsError;
      setReservations(reservationsData || []);

      // KPIs
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      
      const { data: monthlyData } = await supabase.rpc('calculate_monthly_revenue', { 
        _month: currentMonth, 
        _year: currentYear 
      });
      
      const { data: activeCount } = await supabase.rpc('get_active_reservations_count');
      
      const totalRevenue = (reservationsData || [])
        .filter(r => ['confirmed', 'active', 'completed'].includes(r.status))
        .reduce((sum, r) => sum + Number(r.total_amount), 0);

      setKpiData({
        activeReservations: activeCount || 0,
        monthlyRevenue: monthlyData || 0,
        totalRevenue
      });

    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      toast({ title: "Erreur", description: "Impossible de charger les données", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Événements pour le calendrier
  const calendarEvents = useMemo((): CalendarEvent[] => {
    return reservations
      .filter(r => ['confirmed', 'active'].includes(r.status))
      .map(reservation => {
        const vehicle = vehicles.find(v => v.id === reservation.vehicle_id);
        if (!vehicle) return null;
        
        return {
          id: reservation.id,
          title: `${vehicle.name} - ${reservation.customer_name}`,
          start: new Date(reservation.start_date),
          end: addDays(new Date(reservation.end_date), 1), // +1 jour pour l'affichage
          resource: { reservation, vehicle }
        };
      })
      .filter(Boolean) as CalendarEvent[];
  }, [reservations, vehicles]);

  // Dates bloquées par véhicule
  const getBlockedDatesForVehicle = useCallback((vehicleId: string): Date[] => {
    const relevantReservations = reservations.filter(r => 
      r.vehicle_id === vehicleId && ['confirmed', 'active'].includes(r.status)
    );

    const blockedDates: Date[] = [];
    relevantReservations.forEach(reservation => {
      const start = new Date(reservation.start_date);
      const end = new Date(reservation.end_date);
      const days = eachDayOfInterval({ start, end });
      blockedDates.push(...days);
    });

    return blockedDates;
  }, [reservations]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-violet-300">Chargement...</div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-950 text-white">
        {/* Desktop Layout */}
        <div className="hidden lg:flex h-screen">
          <div className="w-64 flex-shrink-0">
            <SidebarNav onLogout={logout} />
          </div>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {/* Header */}
            <header className="bg-gray-900/50 border-b border-gray-800 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-violet-300">Dashboard B-LINE 26</h1>
                  <p className="text-gray-400 text-sm">{format(new Date(), 'EEEE dd MMMM yyyy', { locale: fr })}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="hidden sm:block">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Rechercher..."
                        className="pl-10 w-64 bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                    <Bell className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* View Navigation */}
              <div className="flex space-x-4 mt-4">
                <Button
                  variant={currentView === 'dashboard' ? 'default' : 'ghost'}
                  onClick={() => setCurrentView('dashboard')}
                  className={currentView === 'dashboard' ? 'bg-gradient-to-r from-violet-600 to-violet-500' : ''}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Tableau de bord
                </Button>
                <Button
                  variant={currentView === 'calendar' ? 'default' : 'ghost'}
                  onClick={() => setCurrentView('calendar')}
                  className={currentView === 'calendar' ? 'bg-gradient-to-r from-cyan-600 to-cyan-500' : ''}
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Calendrier
                </Button>
                <Button
                  variant={currentView === 'reservations' ? 'default' : 'ghost'}
                  onClick={() => setCurrentView('reservations')}
                  className={currentView === 'reservations' ? 'bg-gradient-to-r from-emerald-600 to-emerald-500' : ''}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Réservations
                </Button>
              </div>
            </header>

            {/* Content */}
            <div className="p-6">
              {currentView === 'dashboard' && (
                <div className="space-y-6">
                  {/* KPIs */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <KPICard
                      title="Réservations en cours"
                      value={kpiData.activeReservations}
                      subtitle="Véhicules actuellement loués"
                      accent="violet"
                      icon={Users}
                    />
                    <KPICard
                      title="CA Mensuel"
                      value={`${kpiData.monthlyRevenue}€`}
                      subtitle={`${format(new Date(), 'MMMM yyyy', { locale: fr })}`}
                      accent="cyan"
                      icon={TrendingUp}
                    />
                    <KPICard
                      title="CA Total"
                      value={`${kpiData.totalRevenue}€`}
                      subtitle="Chiffre d'affaires global"
                      accent="green"
                      icon={DollarSign}
                    />
                  </div>

                  {/* Quick Actions */}
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-violet-300">Actions Rapides</h2>
                    <NewReservationDialog vehicles={vehicles} onReservationCreated={fetchData} />
                  </div>

                  {/* Fleet Status */}
                  <Card className="bg-gray-900/50 border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-cyan-300">État de la Flotte</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {vehicles.map(vehicle => (
                          <div key={vehicle.id} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                            <div className="flex items-center space-x-3">
                              {vehicle.type === 'car' ? 
                                <Car className="w-5 h-5 text-cyan-400" /> : 
                                <Bike className="w-5 h-5 text-violet-400" />
                              }
                              <div className="flex-1">
                                <h4 className="font-medium text-white">{vehicle.name}</h4>
                                <p className="text-sm text-gray-400">{vehicle.daily_rate}€/jour</p>
                              </div>
                              <div className={`w-3 h-3 rounded-full ${vehicle.is_available ? 'bg-green-400' : 'bg-red-400'}`}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {currentView === 'calendar' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-cyan-300">Calendrier des Réservations</h2>
                    <NewReservationDialog vehicles={vehicles} onReservationCreated={fetchData} />
                  </div>
                  
                  <Card className="bg-gray-900/50 border-gray-800">
                    <CardContent className="p-6">
                      <div style={{ height: '600px' }} className="calendar-dark">
                        <Calendar
                          localizer={localizer}
                          events={calendarEvents}
                          startAccessor="start"
                          endAccessor="end"
                          style={{ height: '100%' }}
                          messages={{
                            next: "Suivant",
                            previous: "Précédent",
                            today: "Aujourd'hui",
                            month: "Mois",
                            week: "Semaine",
                            day: "Jour"
                          }}
                          eventPropGetter={() => ({
                            style: {
                              backgroundColor: '#8B5CF6',
                              borderColor: '#06B6D4',
                              color: 'white'
                            }
                          })}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {currentView === 'reservations' && (
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
                                <div>
                                  <p className="font-medium text-white">{reservation.customer_name}</p>
                                  <p className="text-sm text-gray-400">{reservation.customer_email}</p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  {reservation.vehicles?.type === 'car' ? 
                                    <Car className="w-4 h-4 text-cyan-400" /> : 
                                    <Bike className="w-4 h-4 text-violet-400" />
                                  }
                                  <span className="text-white">{reservation.vehicles?.name}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="text-sm">
                                  <p className="text-white">{format(new Date(reservation.start_date), 'dd/MM/yyyy')}</p>
                                  <p className="text-gray-400">au {format(new Date(reservation.end_date), 'dd/MM/yyyy')}</p>
                                </div>
                              </TableCell>
                              <TableCell>
                                {getStatusBadge(reservation.status)}
                              </TableCell>
                              <TableCell className="font-medium text-white">
                                {reservation.total_amount}€
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </main>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <header className="bg-gray-900 border-b border-gray-800 px-4 py-3">
            <div className="flex items-center justify-between">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 bg-gray-950 border-gray-800">
                  <SidebarNav onLogout={logout} />
                </SheetContent>
              </Sheet>
              <LogoMark />
              <Button variant="ghost" size="icon" className="text-gray-400">
                <Bell className="w-5 h-5" />
              </Button>
            </div>
          </header>

          <main className="p-4">
            {/* Mobile content (same as desktop but responsive) */}
            {currentView === 'dashboard' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <KPICard
                    title="Réservations en cours"
                    value={kpiData.activeReservations}
                    accent="violet"
                    icon={Users}
                  />
                  <KPICard
                    title="CA Mensuel"
                    value={`${kpiData.monthlyRevenue}€`}
                    accent="cyan"
                    icon={TrendingUp}
                  />
                  <KPICard
                    title="CA Total"
                    value={`${kpiData.totalRevenue}€`}
                    accent="green"
                    icon={DollarSign}
                  />
                </div>
                <NewReservationDialog vehicles={vehicles} onReservationCreated={fetchData} />
              </div>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;