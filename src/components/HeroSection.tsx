import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-starlight.jpg";
import { useMemo } from "react";

/** Wrap each character in a span with randomized animation timing */
const NeonText = ({ text }: { text: string }) => {
  const letters = useMemo(() => {
    return text.split("").map((char, i) => {
      if (char === " ") return <span key={i}>&nbsp;</span>;
      // Only animate ~1 in 3 letters randomly
      const shouldAnimate = i % 3 === Math.floor(Math.random() * 3);
      const duration = 2.5 + Math.random() * 3; // 2.5-5.5s
      const delay = Math.random() * 4; // 0-4s offset
      return (
        <span
          key={i}
          className={`neon-letter${shouldAnimate ? " animate-neon" : ""}`}
          style={shouldAnimate ? {
            "--neon-duration": `${duration}s`,
            "--neon-delay": `${delay}s`,
          } as React.CSSProperties : undefined}
        >
          {char}
        </span>
      );
    });
  }, [text]);

  return <>{letters}</>;
};

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Lumina Majorelle Starlight car"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 to-transparent" />
      </div>

      {/* Starlight particles */}
      <div className="absolute inset-0 starlight-dots opacity-40" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-primary font-sans">
              {t("hero.tagline")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-6 uppercase font-serif text-foreground drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
          >
            {t("hero.title1")}
          </motion.h1>

          {/* Neon slogan with per-letter flicker */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-2xl sm:text-3xl lg:text-5xl font-light tracking-[0.08em] mb-8 font-serif"
          >
            <NeonText text={t("hero.slogan")} />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed font-sans"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a href="#fleet" className="btn-neon text-center text-base font-sans">
              {t("hero.cta")}
            </a>
            <a href="#booking" className="btn-glass text-center text-base font-sans">
              {t("hero.cta2")}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
