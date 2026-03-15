import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Instagram, MessageCircle } from "lucide-react";

const contactItems = [
  { icon: MapPin, label: "Siège", value: "Marrakech, Maroc (Livraison Aéroport & Hôtels)" },
  { icon: Phone, label: "Téléphone / WhatsApp", value: "+212 6XX XXX XXX", note: "Réponse en moins de 15 minutes" },
  { icon: Mail, label: "Email", value: "contact@kechnightdrive.com", href: "mailto:contact@kechnightdrive.com" },
  { icon: Instagram, label: "Instagram", value: "@kech_night_drive", href: "https://instagram.com/kech_night_drive" },
];

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full glass text-xs font-semibold tracking-wider uppercase text-primary mb-4">
              Contact
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 font-serif">
              Prêt à prendre le volant de vos nuits ?
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              L'équipe de Kech Night Drive est à votre disposition 7j/7 pour préparer votre arrivée.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass rounded-2xl p-8 sm:p-10 space-y-6"
          >
            {contactItems.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl glass flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm mb-0.5">{item.label}</h3>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-muted-foreground text-sm">{item.value}</p>
                  )}
                  {item.note && (
                    <p className="text-xs text-primary mt-0.5">{item.note}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-10"
          >
            <a
              href="https://wa.me/212600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-neon inline-flex items-center gap-2 text-base"
            >
              <MessageCircle className="w-5 h-5" />
              Nous contacter sur WhatsApp
            </a>
          </motion.div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default Contact;
