import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import {
  ChevronLeft, ChevronRight, ArrowLeft, Calendar,
  Settings2, Fuel, Users, Sparkles, Stars,
  Snowflake, MapPin, Video, Bluetooth, ShieldCheck
} from "lucide-react";
import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";
import BookingModal from "@/components/BookingModal";
import { getVehicleBySlug } from "@/data/vehicles";

const VehicleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const vehicle = slug ? getVehicleBySlug(slug) : undefined;
  const [imgIndex, setImgIndex] = useState(0);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [slug]);

  if (!vehicle) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-32 pb-20 px-4 text-center">
          <h1 className="text-3xl font-bold font-serif mb-4">Véhicule introuvable</h1>
          <button onClick={() => navigate("/#fleet")} className="btn-neon inline-flex items-center gap-2 mt-4">
            <ArrowLeft className="w-4 h-4" /> Retour à la flotte
          </button>
        </main>
        <FooterSection />
      </div>
    );
  }

  const hasMultiple = vehicle.images.length > 1;
  const prevImg = () => setImgIndex((p) => (p === 0 ? vehicle.images.length - 1 : p - 1));
  const nextImg = () => setImgIndex((p) => (p === vehicle.images.length - 1 ? 0 : p + 1));

  const specs = [
    { icon: Settings2, label: t("detail.gearbox"), value: vehicle.spec.gearbox },
    { icon: Fuel, label: t("detail.fuel"), value: vehicle.spec.fuel },
    { icon: Users, label: t("detail.seats"), value: vehicle.spec.seats },
  ];

  const eq = vehicle.equipment;
  const badges: { icon: typeof Snowflake; label: string }[] = [];
  if (vehicle.spec.starlight) badges.push({ icon: Stars, label: t("equip.starlight") });
  if (vehicle.spec.starlight) badges.push({ icon: Sparkles, label: t("equip.led") });
  if (eq.ac) badges.push({ icon: Snowflake, label: t("equip.ac") });
  if (eq.gps) badges.push({ icon: MapPin, label: t("equip.gps") });
  if (eq.rearCam) badges.push({ icon: Video, label: t("equip.cam") });
  if (eq.bluetooth) badges.push({ icon: Bluetooth, label: t("equip.audio") });
  if (eq.gearPro) badges.push({ icon: ShieldCheck, label: t("equip.gear") });

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate("/#fleet")}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> {t("detail.back")}
          </button>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-2xl overflow-hidden neon-glow-violet aspect-[4/3]">
                {vehicle.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${t(vehicle.nameKey)} ${idx + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${idx === imgIndex ? "opacity-100" : "opacity-0"}`}
                  />
                ))}

                {hasMultiple && (
                  <>
                    <button onClick={prevImg} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/60 backdrop-blur-sm border border-border/30 flex items-center justify-center text-foreground hover:bg-background/80">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={nextImg} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/60 backdrop-blur-sm border border-border/30 flex items-center justify-center text-foreground hover:bg-background/80">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                      {vehicle.images.map((_, idx) => (
                        <button key={idx} onClick={() => setImgIndex(idx)} className={`h-2 rounded-full transition-all duration-300 ${idx === imgIndex ? "bg-primary w-6" : "bg-foreground/40 w-2"}`} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass text-xs font-semibold uppercase text-primary mb-4">
                {vehicle.category === "starlight" && <Sparkles className="w-3 h-3" />}
                {t(`cat.${vehicle.category}`)}
              </span>

              <h1 className="text-3xl lg:text-4xl font-bold font-serif mb-6">{t(vehicle.nameKey)}</h1>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {specs.map((s) => (
                  <div key={s.label} className="glass rounded-xl p-4 text-center">
                    <s.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                    <div className="text-xs text-muted-foreground mb-0.5">{s.label}</div>
                    <div className="text-sm font-semibold text-foreground">{s.value}</div>
                  </div>
                ))}
              </div>

              {badges.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                    {t("detail.equipments")}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {badges.map((b, i) => (
                      <div key={i} className="glass rounded-xl px-3 py-2.5 flex items-center gap-2 border border-border/30">
                        <b.icon className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-xs font-medium text-foreground">{b.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="glass-strong rounded-2xl p-6 mt-8">
                <div className="flex items-end justify-between mb-5">
                  <div>
                    <span className="text-xs text-muted-foreground">{t("fleet.from")}</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-foreground font-serif">{vehicle.price} €</span>
                      <span className="text-muted-foreground">{t("fleet.perday")}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setShowBooking(true)} className="btn-neon w-full flex items-center justify-center gap-2 text-base">
                  <Calendar className="w-5 h-5" />
                  {t("detail.book")}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <FooterSection />

      {showBooking && (
        <BookingModal vehicle={vehicle} onClose={() => setShowBooking(false)} />
      )}
    </div>
  );
};

export default VehicleDetail;
