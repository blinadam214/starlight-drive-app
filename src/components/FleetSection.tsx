import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import VehicleCard from "./VehicleCard";
import BookingModal from "./BookingModal";
import { vehicles } from "@/data/vehicles";

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
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 font-serif">{t("fleet.title")}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t("fleet.subtitle")}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((v, i) => (
              <VehicleCard
                key={v.id}
                images={v.images}
                video={v.video || undefined}
                nameKey={v.nameKey}
                descKey={v.descKey}
                price={v.price}
                category={v.category}
                slug={v.slug}
                quantityTotal={v.quantityTotal}
                quantityAvailable={v.quantityAvailable}
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
