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
