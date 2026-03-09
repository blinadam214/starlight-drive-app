import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import VehicleCard from "./VehicleCard";
import BookingModal from "./BookingModal";

import heroStarlight from "@/assets/hero-starlight.jpg";
import peugeot208 from "@/assets/peugeot-208.jpg";
import daciaLogan from "@/assets/dacia-logan.jpg";
import yamahaTmax from "@/assets/yamaha-tmax.jpg";
import yamahaTracer from "@/assets/yamaha-tracer.jpg";

// 📹 Pour ajouter vos vidéos, remplacez les valeurs `video` par l'URL de vos fichiers .mp4 ou .webm
// Exemple : video: "/videos/clio-preview.mp4" ou video: "https://cdn.example.com/clio.webm"
const vehicles = [
  { id: "clio", image: heroStarlight, video: "", nameKey: "vehicle.clio.name", descKey: "vehicle.clio.desc", price: 350, category: "starlight" as const },
  { id: "208", image: peugeot208, video: "", nameKey: "vehicle.208.name", descKey: "vehicle.208.desc", price: 380, category: "starlight" as const },
  { id: "logan", image: daciaLogan, video: "", nameKey: "vehicle.logan.name", descKey: "vehicle.logan.desc", price: 200, category: "essential" as const },
  { id: "tmax", image: yamahaTmax, video: "", nameKey: "vehicle.tmax.name", descKey: "vehicle.tmax.desc", price: 450, category: "adrenaline" as const },
  { id: "tracer", image: yamahaTracer, video: "", nameKey: "vehicle.tracer.name", descKey: "vehicle.tracer.desc", price: 500, category: "adrenaline" as const },
];

const FleetSection = () => {
  const { t } = useLanguage();
  const [selectedVehicle, setSelectedVehicle] = useState<typeof vehicles[0] | null>(null);

  return (
    <>
      <section id="fleet" className="section-padding relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full glass text-xs font-semibold tracking-wider uppercase text-primary mb-4">
              {t("fleet.badge")}
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">{t("fleet.title")}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t("fleet.subtitle")}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((v, i) => (
              <VehicleCard
                key={v.id}
                image={v.image}
                video={v.video || undefined}
                nameKey={v.nameKey}
                descKey={v.descKey}
                price={v.price}
                category={v.category}
                delay={i * 0.1}
                onBook={() => setSelectedVehicle(v)}
              />
            ))}
          </div>
        </div>
      </section>

      {selectedVehicle && (
        <BookingModal
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
        />
      )}
    </>
  );
};

export default FleetSection;
