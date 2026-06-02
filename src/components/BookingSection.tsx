import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { CalendarDays, Upload, KeyRound, Zap } from "lucide-react";

import { toast } from "sonner";

const BookingSection = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [idFile, setIdFile] = useState<File | null>(null);

  const steps = [
    { icon: CalendarDays, titleKey: "booking.step1.title", descKey: "booking.step1.desc", num: "01" },
    { icon: Upload, titleKey: "booking.step2.title", descKey: "booking.step2.desc", num: "02" },
    { icon: KeyRound, titleKey: "booking.step3.title", descKey: "booking.step3.desc", num: "03" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t("checkin.success"));
    setFormData({ name: "", email: "", phone: "" });
    setLicenseFile(null);
    setIdFile(null);
  };

  return (
    <section id="booking" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        {/* Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs font-semibold tracking-wider uppercase text-primary mb-4">
            {t("booking.badge")}
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 font-serif">{t("booking.title")}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t("booking.subtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass rounded-2xl p-8 text-center relative group hover:border-primary/30 transition-all duration-500"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full gradient-neon flex items-center justify-center text-background text-xs font-bold">
                {step.num}
              </div>
              <div className="w-14 h-14 rounded-xl glass mx-auto mb-5 flex items-center justify-center">
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">{t(step.titleKey)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(step.descKey)}</p>
            </motion.div>
          ))}
        </div>

        {/* Check-in Express Form */}
       <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="text-center mt-8"
>
  <p className="text-muted-foreground mb-6 text-lg">
    Vous avez réservé ? Gagnez du temps en pré-enregistrant vos documents avant votre arrivée.
  </p>
  
    href="/enregistrement"
    className="btn-neon inline-flex items-center gap-2 text-base"
  >
    <Zap className="w-5 h-5" />
    Accéder à l'Enregistrement Express
  </a>
</motion.div>
      </div>
    </section>
  );
};

export default BookingSection;
