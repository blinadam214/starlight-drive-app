import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Sparkles, Music, Video, PartyPopper, ShieldCheck, Check, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type Lang = "fr" | "en" | "ar" | "es" | "it" | "de" | "nl";

interface Pack {
  icon: typeof Sparkles;
  name: string;
  price: string;
  included: boolean;
  features: string[];
  cta?: string;
}

const DATA: Record<Lang, { badge: string; title: string; subtitle: string; ctaLabel: string; packs: Pack[] }> = {
  fr: {
    badge: "Packs & Options",
    title: "Personnalisez votre expérience",
    subtitle: "Au-delà du Starlight inclus, ajoutez la touche qui rendra votre moment inoubliable.",
    ctaLabel: "Ajouter via WhatsApp",
    packs: [
      { icon: Sparkles, name: "Signature", price: "Inclus", included: true, features: ["Ciel étoilé Starlight", "Propreté clinique", "Eau fraîche & douceurs", "Parfum d'ambiance"] },
      { icon: Music, name: "Night Owner", price: "+15 €", included: false, features: ["Playlist personnalisée pré-chargée", "Couleur d'ambiance LED au choix", "Late check-out 2h"] },
      { icon: Video, name: "Content Creator", price: "+25 €", included: false, features: ["Trépied + ring light", "Spot photo géolocalisé recommandé", "10 min de shooting à la livraison (filmé avec votre téléphone)"] },
      { icon: PartyPopper, name: "Celebration", price: "+49 €", included: false, features: ["Décor intérieur (anniversaire, demande en mariage)", "Lettrage LED personnalisé", "Bouquet & polaroid"] },
      { icon: ShieldCheck, name: "Réduction de franchise", price: "+12 €", included: false, features: ["Franchise divisée par deux en cas de pépin", "Tranquillité totale"] },
    ],
  },
  en: {
    badge: "Packs & Options",
    title: "Customize your experience",
    subtitle: "Beyond the included Starlight, add the touch that makes your moment unforgettable.",
    ctaLabel: "Add via WhatsApp",
    packs: [
      { icon: Sparkles, name: "Signature", price: "Included", included: true, features: ["Starlight ceiling", "Clinical cleanliness", "Fresh water & treats", "Ambient fragrance"] },
      { icon: Music, name: "Night Owner", price: "+€15", included: false, features: ["Pre-loaded custom playlist", "Choose your LED ambient color", "Late check-out 2h"] },
      { icon: Video, name: "Content Creator", price: "+€25", included: false, features: ["Tripod + ring light", "Recommended geo-tagged photo spot", "10 min shooting at delivery (filmed with your phone)"] },
      { icon: PartyPopper, name: "Celebration", price: "+€49", included: false, features: ["Interior decor (birthday, proposal)", "Custom LED lettering", "Bouquet & polaroid"] },
      { icon: ShieldCheck, name: "Deductible reduction", price: "+€12", included: false, features: ["Deductible halved in case of issue", "Total peace of mind"] },
    ],
  },
  ar: {
    badge: "الباقات والخيارات",
    title: "خصّص تجربتك",
    subtitle: "أبعد من ستارلايت المشمول، أضف اللمسة التي تجعل لحظتك لا تُنسى.",
    ctaLabel: "أضف عبر واتساب",
    packs: [
      { icon: Sparkles, name: "Signature", price: "مشمول", included: true, features: ["سقف نجمي Starlight", "نظافة فائقة", "ماء بارد وحلويات", "عطر داخلي"] },
      { icon: Music, name: "Night Owner", price: "+15 €", included: false, features: ["قائمة تشغيل مخصصة محمّلة مسبقًا", "اختيار لون إضاءة LED", "تمديد التسليم ساعتين"] },
      { icon: Video, name: "Content Creator", price: "+25 €", included: false, features: ["حامل + إضاءة دائرية", "موقع تصوير موصى به", "10 دقائق تصوير عند التسليم (بهاتفك)"] },
      { icon: PartyPopper, name: "Celebration", price: "+49 €", included: false, features: ["ديكور داخلي (عيد ميلاد، خطوبة)", "حروف LED مخصصة", "باقة ورد وبولارويد"] },
      { icon: ShieldCheck, name: "تخفيض التحمّل", price: "+12 €", included: false, features: ["تقسيم مبلغ التحمّل إلى النصف", "راحة بال تامة"] },
    ],
  },
  es: {
    badge: "Packs y Opciones",
    title: "Personaliza tu experiencia",
    subtitle: "Más allá del Starlight incluido, añade el toque que hará tu momento inolvidable.",
    ctaLabel: "Añadir por WhatsApp",
    packs: [
      { icon: Sparkles, name: "Signature", price: "Incluido", included: true, features: ["Cielo estrellado Starlight", "Limpieza clínica", "Agua fresca y dulces", "Aroma ambiental"] },
      { icon: Music, name: "Night Owner", price: "+15 €", included: false, features: ["Playlist personalizada precargada", "Color de ambiente LED a elegir", "Late check-out 2h"] },
      { icon: Video, name: "Content Creator", price: "+25 €", included: false, features: ["Trípode + ring light", "Punto fotográfico geolocalizado recomendado", "10 min de sesión en la entrega (con tu teléfono)"] },
      { icon: PartyPopper, name: "Celebration", price: "+49 €", included: false, features: ["Decoración interior (cumpleaños, pedida)", "Letras LED personalizadas", "Ramo y polaroid"] },
      { icon: ShieldCheck, name: "Reducción de franquicia", price: "+12 €", included: false, features: ["Franquicia dividida a la mitad", "Tranquilidad total"] },
    ],
  },
  it: {
    badge: "Pacchetti e Opzioni",
    title: "Personalizza la tua esperienza",
    subtitle: "Oltre allo Starlight incluso, aggiungi il tocco che renderà il tuo momento indimenticabile.",
    ctaLabel: "Aggiungi via WhatsApp",
    packs: [
      { icon: Sparkles, name: "Signature", price: "Incluso", included: true, features: ["Cielo stellato Starlight", "Pulizia clinica", "Acqua fresca e dolci", "Profumo d'ambiente"] },
      { icon: Music, name: "Night Owner", price: "+15 €", included: false, features: ["Playlist personalizzata precaricata", "Colore LED a scelta", "Late check-out 2h"] },
      { icon: Video, name: "Content Creator", price: "+25 €", included: false, features: ["Treppiede + ring light", "Spot fotografico geolocalizzato", "10 min di shooting alla consegna (con il tuo telefono)"] },
      { icon: PartyPopper, name: "Celebration", price: "+49 €", included: false, features: ["Decoro interno (compleanno, proposta)", "Scritte LED personalizzate", "Bouquet e polaroid"] },
      { icon: ShieldCheck, name: "Riduzione franchigia", price: "+12 €", included: false, features: ["Franchigia dimezzata in caso di problemi", "Tranquillità totale"] },
    ],
  },
  de: {
    badge: "Pakete & Optionen",
    title: "Gestalten Sie Ihr Erlebnis",
    subtitle: "Über das inkludierte Starlight hinaus — fügen Sie den Touch hinzu, der Ihren Moment unvergesslich macht.",
    ctaLabel: "Per WhatsApp hinzufügen",
    packs: [
      { icon: Sparkles, name: "Signature", price: "Inklusive", included: true, features: ["Sternenhimmel Starlight", "Klinische Sauberkeit", "Frisches Wasser & Süßigkeiten", "Ambiente-Duft"] },
      { icon: Music, name: "Night Owner", price: "+15 €", included: false, features: ["Vorgeladene persönliche Playlist", "LED-Ambientefarbe nach Wahl", "Late Check-out 2h"] },
      { icon: Video, name: "Content Creator", price: "+25 €", included: false, features: ["Stativ + Ringlicht", "Empfohlener Foto-Spot", "10 Min Shooting bei Lieferung (mit Ihrem Handy)"] },
      { icon: PartyPopper, name: "Celebration", price: "+49 €", included: false, features: ["Innendeko (Geburtstag, Antrag)", "Personalisierte LED-Schrift", "Strauß & Polaroid"] },
      { icon: ShieldCheck, name: "Selbstbeteiligung senken", price: "+12 €", included: false, features: ["Selbstbeteiligung halbiert", "Völlige Sorglosigkeit"] },
    ],
  },
  nl: {
    badge: "Pakketten & Opties",
    title: "Personaliseer uw ervaring",
    subtitle: "Naast de inbegrepen Starlight, voeg de touch toe die uw moment onvergetelijk maakt.",
    ctaLabel: "Toevoegen via WhatsApp",
    packs: [
      { icon: Sparkles, name: "Signature", price: "Inbegrepen", included: true, features: ["Sterrenhemel Starlight", "Klinische netheid", "Vers water & lekkernijen", "Sfeergeur"] },
      { icon: Music, name: "Night Owner", price: "+€15", included: false, features: ["Vooraf geladen persoonlijke playlist", "LED-sfeerkleur naar keuze", "Late check-out 2u"] },
      { icon: Video, name: "Content Creator", price: "+€25", included: false, features: ["Statief + ringlicht", "Aanbevolen foto-spot", "10 min shooting bij levering (met uw telefoon)"] },
      { icon: PartyPopper, name: "Celebration", price: "+€49", included: false, features: ["Interieurdecoratie (verjaardag, aanzoek)", "Gepersonaliseerde LED-letters", "Boeket & polaroid"] },
      { icon: ShieldCheck, name: "Eigen risico verlagen", price: "+€12", included: false, features: ["Eigen risico gehalveerd", "Totale gemoedsrust"] },
    ],
  },
};

const PacksSection = () => {
  const { language } = useLanguage();
  const data = DATA[(language as Lang)] || DATA.fr;

  return (
    <section id="packs" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs font-semibold tracking-wider uppercase text-primary mb-4">
            {data.badge}
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 font-serif">{data.title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{data.subtitle}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.packs.map((pack, i) => {
            const Icon = pack.icon;
            const waUrl = buildWhatsAppUrl({ lang: language });
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`glass rounded-2xl p-6 flex flex-col ${pack.included ? "border border-primary/40" : ""}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl glass flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className={`text-lg font-bold font-serif ${pack.included ? "text-primary" : "text-foreground"}`}>
                    {pack.price}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{pack.name}</h3>
                <ul className="space-y-2 mb-5 flex-1">
                  {pack.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                {!pack.included && (
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glass !py-2.5 text-sm flex items-center justify-center gap-2 border border-primary/30 hover:border-primary"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {data.ctaLabel}
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PacksSection;
