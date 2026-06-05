import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-starlight.jpg";
import logobon from "@/assets/logobon.png";
import { useMemo } from "react";

/** Wrap each character in a span with randomized animation timing */
const NeonText = ({ text }: { text: string }) => {
  const letters = useMemo(() => {
    return text.split("").map((char, i) => {
      if (char === " ") return <span key={i}>&nbsp;</span>;
      // Only animate ~1 in 3 letters randomly
      const shouldAnimate = i % 3 === 0;
      const delay = `${(i * 0.4) % 3}s`;
      const duration = 3.5 + (i % 5) * 0.5;
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
          alt="Kech Night Drive — Starlight car"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 to-transparent" />
      </div>

      {/* Watermark logo filigrane */}
      <div
        className="absolute inset-0 z-0 pointer-events-none bg-center bg-no-repeat opacity-[0.03]"
        style={{ backgroundImage: `url(${logobon})`, backgroundSize: '60%' }}
      />

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

          {/* Neon slogan with per-letter flicker */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-[0.08em] mb-8 font-serif whitespace-nowrap"
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
          </motion.div>
        </div>
      </div>

     {/* Scroll indicator — cliquable */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => document.querySelector("#fleet")?.scrollIntoView({ behavior: "smooth" })}
       className="absolute bottom-20 left-1/2 -translate-x-1/2 cursor-pointer group"
        aria-label="Découvrir la flotte"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center w-16 h-16 rounded-full border border-primary/30 group-hover:border-primary/70 transition-colors duration-300"
          style={{ boxShadow: "0 0 20px hsl(var(--primary) / 0.15)" }}
        >
          <ChevronDown className="w-8 h-8 text-primary group-hover:text-foreground transition-colors duration-300" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default HeroSection;
