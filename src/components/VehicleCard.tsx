import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Calendar, Sparkles } from "lucide-react";

interface VehicleCardProps {
  image: string;
  /** URL vers un fichier vidéo (.mp4 / .webm) — laisser vide pour désactiver le hover video */
  video?: string;
  nameKey: string;
  descKey: string;
  price: number;
  category: "starlight" | "essential" | "adrenaline";
  onBook: () => void;
  delay?: number;
}

const VehicleCard = ({ image, video, nameKey, descKey, price, category, onBook, delay = 0 }: VehicleCardProps) => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

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

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
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
      {/* Conteneur média avec hover zoom */}
      <div className="relative h-56 overflow-hidden">
        <div className="w-full h-full transition-transform duration-700 group-hover:scale-110">
          {/* Image poster (visible par défaut, fade out au hover) */}
          <img
            src={image}
            alt={t(nameKey)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isHovered && video ? "opacity-0" : "opacity-100"
            }`}
            loading="lazy"
          />

          {/* Vidéo (fade in au hover) */}
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

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />

        {/* Badge catégorie */}
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${categoryStyles[category]} backdrop-blur-sm border border-border/30`}>
          <span className="flex items-center gap-1.5">
            {category === "starlight" && <Sparkles className="w-3 h-3" />}
            {categoryLabels[category]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-foreground mb-2">{t(nameKey)}</h3>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{t(descKey)}</p>

        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs text-muted-foreground">{t("fleet.from")}</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground">{price}</span>
              <span className="text-sm text-muted-foreground">MAD{t("fleet.perday")}</span>
            </div>
          </div>
          <button
            onClick={onBook}
            className="btn-neon !px-5 !py-2.5 text-sm flex items-center gap-2"
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
