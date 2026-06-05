import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import {
  Calendar, Sparkles, ChevronLeft, ChevronRight, Eye,
  Snowflake, MapPin, Video, Bluetooth, Settings2, ShieldCheck
} from "lucide-react";
import type { VehicleEquipment } from "@/data/vehicles";

interface VehicleCardProps {
  images: string[];
  video?: string;
  nameKey: string;
  descKey: string;
  price: number;
  category: "starlight" | "essential" | "adrenaline";
  slug: string;
  equipment: VehicleEquipment;
  onBook: () => void;
  delay?: number;
}

const VehicleCard = ({ images, video, nameKey, descKey, price, category, slug, equipment, onBook, delay = 0 }: VehicleCardProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasMultipleImages = images.length > 1;

  const categoryStyles = {
    starlight: "from-neon-cyan/20 to-neon-violet/20 text-primary",
    essential: "from-muted/80 to-muted text-muted-foreground",
    adrenaline: "from-neon-violet/20 to-neon-cyan/20 text-secondary",
  };

  const categoryLabels = {
    starlight: t("cat.starlight"),
    essential: t("cat.essential"),
    adrenaline: t("cat.adrenaline"),
  };

  // Construire la liste des badges d'équipement actifs
  const badges: { icon: typeof Snowflake; label: string }[] = [];
  if (equipment.ac) badges.push({ icon: Snowflake, label: t("equip.ac") });
  if (equipment.gps) badges.push({ icon: MapPin, label: t("equip.gps") });
  if (equipment.rearCam) badges.push({ icon: Video, label: t("equip.cam") });
  if (equipment.bluetooth) badges.push({ icon: Bluetooth, label: t("equip.audio") });
  if (equipment.automatic) badges.push({ icon: Settings2, label: t("equip.auto") });
  if (equipment.gearPro) badges.push({ icon: ShieldCheck, label: t("equip.gear") });

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) videoRef.current.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className="card-fleet group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-56 overflow-hidden cursor-pointer" onClick={() => navigate(`/vehicules/${slug}`)}>
        <div className="w-full h-full transition-transform duration-700 group-hover:scale-110">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${t(nameKey)} ${idx + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                idx === currentIndex && !(isHovered && video) ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
            />
          ))}

          {video && (
            <video
              ref={videoRef}
              src={video}
              muted
              playsInline
              loop
              preload="metadata"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />

        {hasMultipleImages && !(isHovered && video) && (
          <>
            <button onClick={goToPrev} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background/60 backdrop-blur-sm border border-border/30 flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background/80" aria-label="Image précédente">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={goToNext} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background/60 backdrop-blur-sm border border-border/30 flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background/80" aria-label="Image suivante">
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
              {images.map((_, idx) => (
                <button key={idx} onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-primary w-3" : "bg-foreground/40"}`} aria-label={`Image ${idx + 1}`} />
              ))}
            </div>
          </>
        )}

        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${categoryStyles[category]} backdrop-blur-sm border border-border/30`}>
          <span className="flex items-center gap-1.5">
            {category === "starlight" && <Sparkles className="w-3 h-3" />}
            {categoryLabels[category]}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-foreground mb-2">{t(nameKey)}</h3>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{t(descKey)}</p>

        {/* Ligne d'équipements */}
        {badges.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {badges.map((b, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg glass border border-border/30 text-[11px] text-muted-foreground"
              >
                <b.icon className="w-3 h-3 text-primary" />
                {b.label}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-end justify-between mb-4">
          <div>
            <span className="text-xs text-muted-foreground">{t("fleet.from")}</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground">{price} €</span>
              <span className="text-sm text-muted-foreground">{t("fleet.perday")}</span>
            </div>
          </div>
        </div>

        {/* Boutons : Voir (outline) + Réserver (plein) */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/vehicules/${slug}`)}
            className="flex-1 btn-glass !py-2.5 text-sm flex items-center justify-center gap-2 border border-primary/40 hover:border-primary"
          >
            <Eye className="w-4 h-4" />
            {t("fleet.view")}
          </button>
          <button
            onClick={onBook}
            className="flex-1 btn-neon !py-2.5 text-sm flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            {t("fleet.book")}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default VehicleCard;
