// Source de données centralisée pour tous les véhicules
import heroStarlight from "@/assets/hero-starlight.jpg";
import peugeot208 from "@/assets/peugeot-208.jpg";
import daciaLogan from "@/assets/dacia-logan.jpg";
import yamahaTmax from "@/assets/yamaha-tmax.jpg";
import yamahaTracer from "@/assets/yamaha-tracer.jpg";

export type VehicleCategory = "starlight" | "essential" | "adrenaline";
export type VehicleType = "car" | "moto";

export interface VehicleSpec {
  gearbox: string;
  fuel: string;
  seats: string;
  starlight: boolean;
}

export interface VehicleEquipment {
  ac: boolean;
  gps: boolean;
  rearCam: boolean;
  bluetooth: boolean;
  automatic: boolean;
  gearPro: boolean;
}

export interface VehicleData {
  id: string;
  slug: string;
  type: VehicleType;
  images: string[];
  video?: string;
  nameKey: string;
  descKey: string;
  price: number;
  category: VehicleCategory;
  spec: VehicleSpec;
  equipment: VehicleEquipment;
  quantityTotal: number;       // Stock total d'exemplaires
  quantityAvailable: number;   // Exemplaires actuellement disponibles
}

export const vehicles: VehicleData[] = [
  {
    id: "clio",
    slug: "renault-clio-5-starlight",
    type: "car",
    images: [heroStarlight],
    video: "https://res.cloudinary.com/dwaj4ea6b/video/upload/clio_5_1_ko3qas.mp4",
    nameKey: "vehicle.clio.name",
    descKey: "vehicle.clio.desc",
    price: 35,
    category: "starlight",
    spec: { gearbox: "Manuelle", fuel: "Essence", seats: "5", starlight: true },
    equipment: { ac: true, gps: true, rearCam: false, bluetooth: true, automatic: false, gearPro: false },
    quantityTotal: 3,
    quantityAvailable: 3,
  },
  {
    id: "208",
    slug: "peugeot-208-starlight",
    type: "car",
    images: [peugeot208],
    nameKey: "vehicle.208.name",
    descKey: "vehicle.208.desc",
    price: 35,
    category: "starlight",
    spec: { gearbox: "Manuelle", fuel: "Essence", seats: "5", starlight: true },
    equipment: { ac: true, gps: true, rearCam: true, bluetooth: true, automatic: false, gearPro: false },
    quantityTotal: 1,
    quantityAvailable: 1,
  },
  {
    id: "logan",
    slug: "dacia-logan-essentiel",
    type: "car",
    images: [daciaLogan],
    nameKey: "vehicle.logan.name",
    descKey: "vehicle.logan.desc",
    price: 25,
    category: "essential",
    spec: { gearbox: "Manuelle", fuel: "Diesel", seats: "5", starlight: false },
    equipment: { ac: true, gps: true, rearCam: false, bluetooth: true, automatic: false, gearPro: false },
    quantityTotal: 1,
    quantityAvailable: 1,
  },
  {
    id: "tmax",
    slug: "yamaha-tmax-560",
    type: "moto",
    images: [yamahaTmax],
    nameKey: "vehicle.tmax.name",
    descKey: "vehicle.tmax.desc",
    price: 80,
    category: "adrenaline",
    spec: { gearbox: "Automatique", fuel: "Essence", seats: "2", starlight: false },
    equipment: { ac: false, gps: false, rearCam: false, bluetooth: false, automatic: true, gearPro: true },
    quantityTotal: 1,
    quantityAvailable: 1,
  },
  {
    id: "tracer",
    slug: "yamaha-tracer-900",
    type: "moto",
    images: [yamahaTracer],
    nameKey: "vehicle.tracer.name",
    descKey: "vehicle.tracer.desc",
    price: 90,
    category: "adrenaline",
    spec: { gearbox: "Manuelle", fuel: "Essence", seats: "2", starlight: false },
    equipment: { ac: false, gps: false, rearCam: false, bluetooth: false, automatic: false, gearPro: true },
    quantityTotal: 1,
    quantityAvailable: 1,
  },
];

export const getVehicleBySlug = (slug: string) => vehicles.find((v) => v.slug === slug);
