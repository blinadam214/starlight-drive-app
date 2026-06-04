import heroStarlight from "@/assets/hero-starlight.jpg";
import peugeot208 from "@/assets/peugeot-208.jpg";
import daciaLogan from "@/assets/dacia-logan.jpg";
import yamahaTmax from "@/assets/yamaha-tmax.jpg";
import yamahaTracer from "@/assets/yamaha-tracer.jpg";
 
export type VehicleCategory = "starlight" | "essential" | "adrenaline";
 
export interface VehicleSpec {
  gearbox: string;      // Boîte de vitesse
  fuel: string;         // Carburant
  seats: string;        // Places
  starlight: boolean;   // Option Ciel Étoilé / LED
}
 
export interface VehicleData {
  id: string;
  slug: string;
  images: string[];
  video?: string;
  nameKey: string;
  descKey: string;
  price: number;
  category: VehicleCategory;
  spec: VehicleSpec;
}
 
export const vehicles: VehicleData[] = [
  {
    id: "clio",
    slug: "renault-clio-5-starlight",
    images: [heroStarlight],
    video: "https://res.cloudinary.com/dwaj4ea6b/video/upload/clio_5_1_ko3qas.mp4",
    nameKey: "vehicle.clio.name",
    descKey: "vehicle.clio.desc",
    price: 35,
    category: "starlight",
    spec: { gearbox: "Manuelle", fuel: "Essence", seats: "5", starlight: true },
  },
  {
    id: "208",
    slug: "peugeot-208-starlight",
    images: [peugeot208],
    nameKey: "vehicle.208.name",
    descKey: "vehicle.208.desc",
    price: 35,
    category: "starlight",
    spec: { gearbox: "Automatique", fuel: "Essence", seats: "5", starlight: true },
  },
  {
    id: "logan",
    slug: "dacia-logan-essentiel",
    images: [daciaLogan],
    nameKey: "vehicle.logan.name",
    descKey: "vehicle.logan.desc",
    price: 25,
    category: "essential",
    spec: { gearbox: "Manuelle", fuel: "Diesel", seats: "5", starlight: false },
  },
  {
    id: "tmax",
    slug: "yamaha-tmax-560",
    images: [yamahaTmax],
    nameKey: "vehicle.tmax.name",
    descKey: "vehicle.tmax.desc",
    price: 80,
    category: "adrenaline",
    spec: { gearbox: "Automatique", fuel: "Essence", seats: "2", starlight: false },
  },
  {
    id: "tracer",
    slug: "yamaha-tracer-900",
    images: [yamahaTracer],
    nameKey: "vehicle.tracer.name",
    descKey: "vehicle.tracer.desc",
    price: 90,
    category: "adrenaline",
    spec: { gearbox: "Manuelle", fuel: "Essence", seats: "2", starlight: false },
  },
];
 
export const getVehicleBySlug = (slug: string) => vehicles.find((v) => v.slug === slug);
