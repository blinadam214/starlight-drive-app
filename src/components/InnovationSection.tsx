import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Stars, Candy, Plane, KeyRound } from "lucide-react";
import starlightInterior from "@/assets/starlight-interior.jpg";

type Lang = "fr" | "en" | "ar" | "es" | "it" | "de" | "nl";

const TEXTS: Record<Lang, {
  badge: string;
  title: string;
  intro: string;
  listLabel: string;
  features: { emoji: string; title: string; desc: string }[];
}> = {
  fr: {
    badge: "L'innovation Kech Night Drive",
    title: "Ne louez pas un véhicule. Vivez une atmosphère.",
    intro: "Succombez au luxe dès l'ouverture de la portière : un ciel étoilé et une ambiance lumineuse sur-mesure pour une esthétique VIP unique au cœur de Marrakech.",
    listLabel: "L'Expérience en 4 lignes :",
    features: [
      { title: "Ciel Étoilé & Éclairage d'Ambiance", desc: "Des centaines de fibres optiques et des LED sur-mesure transforment votre habitacle en voûte céleste pour maîtriser la nuit marrakchie." },
      { title: "Détails Premium", desc: "Une flotte à la propreté clinique et au parfum soigné, avec bouteilles d'eau fraîche et douceurs offertes à bord." },
      { title: "Livraison VIP Express", desc: "Prise en charge immédiate et sur-mesure dès votre sortie de l'aéroport, à votre hôtel ou votre villa." },
      { title: "Jeunes Permis Bienvenus", desc: "Le prestige accessible à tous, basé sur la confiance et sans restrictions d'âge abusives." },
    ],
  },
  en: {
    badge: "The Kech Night Drive Innovation",
    title: "Don't rent a vehicle. Live an atmosphere.",
    intro: "Give in to luxury the moment you open the door: a starlit ceiling and custom ambient lighting for a unique VIP aesthetic in the heart of Marrakech.",
    listLabel: "The Experience in 4 lines:",
    features: [
      { emoji: "🌌", title: "Starlight Ceiling & Ambient Lighting", desc: "Hundreds of fiber optics and custom LEDs turn your cabin into a celestial vault to own the Marrakech night." },
      { emoji: "🍬", title: "Premium Details", desc: "A fleet with clinical cleanliness and a refined scent, with fresh water bottles and sweet treats offered on board." },
      { emoji: "✈️", title: "Express VIP Delivery", desc: "Immediate, tailor-made pickup the moment you exit the airport, at your hotel or your villa." },
      { emoji: "🔑", title: "Young Drivers Welcome", desc: "Prestige accessible to all, based on trust and without abusive age restrictions." },
    ],
  },
  ar: {
    badge: "ابتكار Kech Night Drive",
    title: "لا تستأجر سيارة. عِش أجواءً.",
    intro: "استسلم للفخامة منذ لحظة فتح الباب: سقف نجمي وإضاءة محيطة مخصصة لجمالية VIP فريدة في قلب مراكش.",
    listLabel: "التجربة في 4 نقاط:",
    features: [
      { emoji: "🌌", title: "سقف نجمي وإضاءة محيطة", desc: "مئات الألياف الضوئية وإضاءة LED مخصصة تحوّل مقصورتك إلى قبة سماوية للسيطرة على ليل مراكش." },
      { emoji: "🍬", title: "تفاصيل فاخرة", desc: "أسطول بنظافة فائقة ورائحة عطرة، مع زجاجات ماء بارد وحلويات مقدمة على متن السيارة." },
      { emoji: "✈️", title: "توصيل VIP سريع", desc: "استلام فوري ومخصص فور خروجك من المطار، إلى فندقك أو فيلتك." },
      { emoji: "🔑", title: "الرخص الجديدة مرحب بها", desc: "الفخامة في متناول الجميع، قائمة على الثقة ودون قيود عمرية مبالغ فيها." },
    ],
  },
  es: {
    badge: "La innovación Kech Night Drive",
    title: "No alquiles un vehículo. Vive una atmósfera.",
    intro: "Sucumbe al lujo desde que abres la puerta: un cielo estrellado y una iluminación ambiental personalizada para una estética VIP única en el corazón de Marrakech.",
    listLabel: "La Experiencia en 4 líneas:",
    features: [
      { emoji: "🌌", title: "Cielo Estrellado e Iluminación Ambiental", desc: "Cientos de fibras ópticas y LED personalizados transforman tu habitáculo en una bóveda celeste para dominar la noche de Marrakech." },
      { emoji: "🍬", title: "Detalles Premium", desc: "Una flota con limpieza clínica y aroma cuidado, con botellas de agua fresca y dulces ofrecidos a bordo." },
      { emoji: "✈️", title: "Entrega VIP Exprés", desc: "Recogida inmediata y personalizada nada más salir del aeropuerto, en tu hotel o tu villa." },
      { emoji: "🔑", title: "Jóvenes Conductores Bienvenidos", desc: "El prestigio accesible para todos, basado en la confianza y sin restricciones de edad abusivas." },
    ],
  },
  it: {
    badge: "L'innovazione Kech Night Drive",
    title: "Non noleggiare un veicolo. Vivi un'atmosfera.",
    intro: "Cedi al lusso dal momento in cui apri la portiera: un cielo stellato e un'illuminazione ambientale su misura per un'estetica VIP unica nel cuore di Marrakech.",
    listLabel: "L'Esperienza in 4 punti:",
    features: [
      { emoji: "🌌", title: "Cielo Stellato e Illuminazione Ambientale", desc: "Centinaia di fibre ottiche e LED su misura trasformano il tuo abitacolo in una volta celeste per dominare la notte di Marrakech." },
      { emoji: "🍬", title: "Dettagli Premium", desc: "Una flotta dalla pulizia clinica e dal profumo curato, con bottiglie d'acqua fresca e dolcetti offerti a bordo." },
      { emoji: "✈️", title: "Consegna VIP Express", desc: "Presa in carico immediata e su misura appena esci dall'aeroporto, al tuo hotel o alla tua villa." },
      { emoji: "🔑", title: "Neopatentati Benvenuti", desc: "Il prestigio accessibile a tutti, basato sulla fiducia e senza restrizioni d'età eccessive." },
    ],
  },
  de: {
    badge: "Die Kech Night Drive Innovation",
    title: "Mieten Sie kein Fahrzeug. Erleben Sie eine Atmosphäre.",
    intro: "Geben Sie sich dem Luxus hin, sobald Sie die Tür öffnen: ein Sternenhimmel und maßgeschneiderte Ambientebeleuchtung für eine einzigartige VIP-Ästhetik im Herzen von Marrakesch.",
    listLabel: "Das Erlebnis in 4 Punkten:",
    features: [
      { emoji: "🌌", title: "Sternenhimmel & Ambientebeleuchtung", desc: "Hunderte von Glasfasern und maßgeschneiderte LEDs verwandeln Ihre Fahrgastzelle in ein Himmelsgewölbe, um die Nacht von Marrakesch zu beherrschen." },
      { emoji: "🍬", title: "Premium-Details", desc: "Eine Flotte mit klinischer Sauberkeit und gepflegtem Duft, mit frischen Wasserflaschen und Süßigkeiten an Bord." },
      { emoji: "✈️", title: "Express VIP-Lieferung", desc: "Sofortige, maßgeschneiderte Abholung direkt nach dem Verlassen des Flughafens, an Ihrem Hotel oder Ihrer Villa." },
      { emoji: "🔑", title: "Fahranfänger willkommen", desc: "Prestige für alle zugänglich, basierend auf Vertrauen und ohne übermäßige Altersbeschränkungen." },
    ],
  },
  nl: {
    badge: "De Kech Night Drive innovatie",
    title: "Huur geen voertuig. Beleef een sfeer.",
    intro: "Geef u over aan luxe vanaf het moment dat u de deur opent: een sterrenhemel en op maat gemaakte sfeerverlichting voor een unieke VIP-esthetiek in het hart van Marrakech.",
    listLabel: "De Ervaring in 4 punten:",
    features: [
      { emoji: "🌌", title: "Sterrenhemel & Sfeerverlichting", desc: "Honderden glasvezels en op maat gemaakte LED's veranderen uw cabine in een hemelgewelf om de Marrakech-nacht te beheersen." },
      { emoji: "🍬", title: "Premium Details", desc: "Een wagenpark met klinische netheid en een verzorgde geur, met verse waterflessen en lekkernijen aan boord." },
      { emoji: "✈️", title: "Express VIP-bezorging", desc: "Onmiddellijke, op maat gemaakte ophaling zodra u de luchthaven verlaat, bij uw hotel of uw villa." },
      { emoji: "🔑", title: "Jonge Bestuurders Welkom", desc: "Prestige toegankelijk voor iedereen, gebaseerd op vertrouwen en zonder buitensporige leeftijdsbeperkingen." },
    ],
  },
};

const ICONS = [Stars, Candy, Plane, KeyRound];

const InnovationSection = () => {
  const { language } = useLanguage();
  const c = TEXTS[(language as Lang)] || TEXTS.fr;

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
              {c.badge}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight font-serif">
              {c.title}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              {c.intro}
            </p>
            <p className="text-sm font-semibold text-primary mb-6 uppercase tracking-wider">
              {c.listLabel}
            </p>
            <div className="space-y-6">
              {c.features.map((feat, i) => {
                const Icon = ICONS[i];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl glass flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1 text-base">
                        <span className="mr-1">{feat.emoji}</span>{feat.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InnovationSection;
