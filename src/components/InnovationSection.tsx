import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Stars, Lightbulb, Crown } from "lucide-react";
import starlightInterior from "@/assets/starlight-interior.jpg";

const InnovationSection = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Stars, titleKey: "innovation.feat1.title", descKey: "innovation.feat1.desc" },
    { icon: Lightbulb, titleKey: "innovation.feat2.title", descKey: "innovation.feat2.desc" },
    { icon: Crown, titleKey: "innovation.feat3.title", descKey: "innovation.feat3.desc" },
  ];

  return (
    <section id="concept" className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden neon-glow-violet">
              <img
                src={starlightInterior}
                alt="Starlight ceiling interior"
                className="w-full h-[400px] lg:h-[500px] object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl gradient-neon opacity-20 blur-2xl" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full glass text-xs font-semibold tracking-wider uppercase text-primary mb-6">
              {t("innovation.badge")}
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {t("innovation.title")}
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              {t("innovation.subtitle")}
            </p>

            <div className="space-y-6">
              {features.map((feat, i) => (
                <motion.div
                  key={feat.titleKey}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl glass flex items-center justify-center">
                    <feat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t(feat.titleKey)}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t(feat.descKey)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InnovationSection;
