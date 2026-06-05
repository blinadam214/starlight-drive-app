import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import {
  ChevronLeft, ChevronRight, ArrowLeft, MessageCircle,
  Settings2, Fuel, Users, Sparkles, Calendar
} from "lucide-react";
import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";
import { getVehicleBySlug } from "@/data/vehicles";

const WHATSAPP_NUMBER = "33635121205";

const VehicleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const vehicle = slug ? getVehicleBySlug(slug) : undefined;
  const [imgIndex, setImgIndex] = useState(0);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Bonjour Kech Night Drive ! Je suis intéressé par la location de : ${t(vehicle.nameKey)} (${vehicle.price}€/jour). Pouvez-vous me confirmer la disponibilité ?`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  const hasMultiple = vehicle.images.length > 1;
  const prevImg = () => setImgIndex((p) => (p === 0 ? vehicle.images.length - 1 : p - 1));
  const nextImg = () => setImgIndex((p) => (p === vehicle.images.length - 1 ? 0 : p + 1));

  const specs = [
    { icon: Settings2, label: t("detail.gearbox"), value: vehicle.spec.gearbox },
    { icon: Fuel, label: t("detail.fuel"), value: vehicle.spec.fuel },
    { icon: Users, label: t("detail.seats"), value: vehicle.spec.seats },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => navigate("/#fleet")}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> {t("detail.back")}
          </button>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Image carousel */}
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

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass text-xs font-semibold uppercase text-primary mb-4">
                {vehicle.category === "starlight" && <Sparkles className="w-3 h-3" />}
                {t(`cat.${vehicle.category}`)}
              </span>

              <h1 className="text-3xl lg:text-4xl font-bold font-serif mb-3">{t(vehicle.nameKey)}</h1>
              <p className="text-muted-foreground mb-8 leading-relaxed">{t(vehicle.descKey)}</p>

              {/* Specs grid */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {specs.map((s) => (
                  <div key={s.label} className="glass rounded-xl p-4 text-center">
                    <s.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                    <div className="text-xs text-muted-foreground mb-0.5">{s.label}</div>
                    <div className="text-sm font-semibold text-foreground">{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Starlight premium mention */}
              {vehicle.spec.starlight && (
                <div className="glass rounded-xl p-4 mb-6 flex items-center gap-3 border border-primary/30">
                  <div className="w-10 h-10 rounded-lg gradient-neon flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{t("detail.starlight.title")}</div>
                    <div className="text-xs text-muted-foreground">{t("detail.starlight.desc")}</div>
                  </div>
                </div>
              )}

              {/* Price + CTA */}
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
                <button onClick={handleWhatsApp} className="btn-neon w-full flex items-center justify-center gap-2 text-base">
                  <MessageCircle className="w-5 h-5" />
                  {t("detail.book")}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default VehicleDetail;
