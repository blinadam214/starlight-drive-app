import { useEffect } from "react";
import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Instagram, Ghost, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type Lang = "fr" | "en" | "ar" | "es" | "it" | "de" | "nl";

const T: Record<Lang, {
  badge: string;
  title: string;
  subtitle: string;
  hq: string;
  hqValue: string;
  phone: string;
  phoneNote: string;
  emailLabel: string;
  whatsappBtn: string;
}> = {
  fr: { badge: "Contact", title: "Prêt à prendre le volant de vos nuits ?", subtitle: "L'équipe de Kech Night Drive est à votre disposition 7j/7 pour préparer votre arrivée.", hq: "Siège", hqValue: "Marrakech, Maroc (Livraison Aéroport & Hôtels)", phone: "Téléphone / WhatsApp", phoneNote: "Réponse en moins de 15 minutes", emailLabel: "Email", whatsappBtn: "Nous contacter sur WhatsApp" },
  en: { badge: "Contact", title: "Ready to take the wheel of your nights?", subtitle: "The Kech Night Drive team is available 7 days a week to prepare your arrival.", hq: "Headquarters", hqValue: "Marrakech, Morocco (Airport & Hotel Delivery)", phone: "Phone / WhatsApp", phoneNote: "Reply in under 15 minutes", emailLabel: "Email", whatsappBtn: "Contact us on WhatsApp" },
  ar: { badge: "اتصل بنا", title: "هل أنت مستعد لقيادة لياليك؟", subtitle: "فريق Kech Night Drive في خدمتك 7/7 لتجهيز وصولك.", hq: "المقر", hqValue: "مراكش، المغرب (توصيل المطار والفنادق)", phone: "الهاتف / واتساب", phoneNote: "رد في أقل من 15 دقيقة", emailLabel: "البريد الإلكتروني", whatsappBtn: "تواصل معنا عبر واتساب" },
  es: { badge: "Contacto", title: "¿Listo para tomar el volante de tus noches?", subtitle: "El equipo de Kech Night Drive está a tu disposición 7 días a la semana para preparar tu llegada.", hq: "Sede", hqValue: "Marrakech, Marruecos (Entrega Aeropuerto y Hoteles)", phone: "Teléfono / WhatsApp", phoneNote: "Respuesta en menos de 15 minutos", emailLabel: "Email", whatsappBtn: "Contáctanos por WhatsApp" },
  it: { badge: "Contatto", title: "Pronto a prendere il volante delle tue notti?", subtitle: "Il team di Kech Night Drive è a tua disposizione 7 giorni su 7 per preparare il tuo arrivo.", hq: "Sede", hqValue: "Marrakech, Marocco (Consegna Aeroporto e Hotel)", phone: "Telefono / WhatsApp", phoneNote: "Risposta in meno di 15 minuti", emailLabel: "Email", whatsappBtn: "Contattaci su WhatsApp" },
  de: { badge: "Kontakt", title: "Bereit, das Steuer Ihrer Nächte zu übernehmen?", subtitle: "Das Team von Kech Night Drive steht Ihnen 7 Tage die Woche zur Verfügung, um Ihre Ankunft vorzubereiten.", hq: "Sitz", hqValue: "Marrakesch, Marokko (Flughafen- & Hotellieferung)", phone: "Telefon / WhatsApp", phoneNote: "Antwort in unter 15 Minuten", emailLabel: "E-Mail", whatsappBtn: "Kontaktieren Sie uns auf WhatsApp" },
  nl: { badge: "Contact", title: "Klaar om het stuur van uw nachten te nemen?", subtitle: "Het team van Kech Night Drive staat 7 dagen per week voor u klaar om uw aankomst voor te bereiden.", hq: "Hoofdkantoor", hqValue: "Marrakech, Marokko (Luchthaven- & Hotelbezorging)", phone: "Telefoon / WhatsApp", phoneNote: "Antwoord binnen 15 minuten", emailLabel: "E-mail", whatsappBtn: "Neem contact op via WhatsApp" },
};

const Contact = () => {
  const { language } = useLanguage();
  const t = T[(language as Lang)] || T.fr;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const contactItems = [
    { icon: MapPin, label: t.hq, value: t.hqValue },
    { icon: Phone, label: t.phone, value: "+33 6 35 12 12 05", note: t.phoneNote },
    { icon: Mail, label: t.emailLabel, value: "contact@kechnightdrive.com", href: "mailto:contact@kechnightdrive.com" },
    { icon: Instagram, label: "Instagram", value: "@kech_night_drive", href: "https://instagram.com/kech_night_drive" },
    { icon: Ghost, label: "Snapchat", value: "@kech_nightdrive", href: "https://snapchat.com/add/kech_nightdrive" },
  ];

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
              {t.badge}
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 font-serif">
              {t.title}
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              {t.subtitle}
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
              href="https://wa.me/33635121205"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-neon inline-flex items-center gap-2 text-base"
            >
              <MessageCircle className="w-5 h-5" />
              {t.whatsappBtn}
            </a>
          </motion.div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default Contact;
