import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Stars, Candy, Plane, KeyRound } from "lucide-react";
import starlightInterior from "@/assets/starlight-interior.jpg";

type Lang = "fr" | "en" | "ar" | "es" | "it" | "de" | "nl";

const TEXTS: Record<Lang, {
  badge: string;
  title: string;
  intro: string;
  features: { emoji: string; title: string; desc: string }[];
}> = {
  fr: {
    badge: "L'innovation Kech Night Drive",
    title: "L'Expérience Starlight par Kech Night Drive",
    intro: "Ne louez pas seulement un véhicule, louez une atmosphère. Si vous venez chez Kech Night Drive, ce n'est pas une simple voiture que vous venez récupérer : c'est une expérience à part entière. Nous redéfinissons les codes de la location pour que chaque trajet devienne un moment mémorable, parfaitement taillé pour maîtriser la nuit marrakchie.",
    features: [
      { emoji: "🌟", title: "Le Ciel Étoilé : Votre Voûte Céleste Privée", desc: "Laissez-vous envoûter dès l'ouverture de la portière. Des centaines de fibres optiques transforment le plafond de votre habitacle en un ciel étoilé sur-mesure. Configurez l'ambiance lumineuse selon vos envies et offrez-vous une esthétique VIP unique au milieu des lumières de Marrakech." },
      { emoji: "🍬", title: "L'Art du Détail : Propreté Clinique & Fragrance Haut de Gamme", desc: "Le vrai luxe se niche dans les attentions invisibles. Nos véhicules vous sont livrés dans un état de propreté clinique et diffusent une odeur soignée qui sent divinement bon. Chaque location comprend des bouteilles d'eau fraîche à bord et des petits bonbons pour adoucir votre trajet dès les premiers kilomètres." },
      { emoji: "✈️", title: "Livraison VIP : Aéroport, Hôtel ou Villa", desc: "Oubliez les files d'attente interminables. Votre véhicule vous attend dès votre descente de l'avion à l'Aéroport Marrakech-Menara ou directement sur le lieu de votre séjour. Notre promesse ? Un enregistrement express, une fiabilité totale et une discrétion absolue." },
      { emoji: "🔑", title: "Jeunes Permis Acceptés : La Confiance d'Abord", desc: "Contrairement aux agences traditionnelles qui multiplient les barrières, nous faisons le choix de la confiance. Nos véhicules suréquipés sont accessibles aux jeunes conducteurs, sans restrictions d'âge abusives ni suppléments injustifiés. Le prestige doit être accessible à ceux qui savent l'apprécier. Réservez votre expérience exclusive avec Kech Night Drive et laissez la magie opérer." },
    ],
  },
  en: {
    badge: "The Kech Night Drive Innovation",
    title: "The Starlight Experience by Kech Night Drive",
    intro: "Don't just rent a vehicle, rent an atmosphere. When you come to Kech Night Drive, you're not just picking up a car: it's a full experience. We redefine the rules of rental so that every journey becomes a memorable moment, perfectly tailored to own the Marrakech night.",
    features: [
      { emoji: "🌟", title: "The Starlight Ceiling: Your Private Celestial Vault", desc: "Let yourself be enchanted the moment you open the door. Hundreds of fiber optics transform your cabin ceiling into a custom starry sky. Configure the lighting mood to your liking and treat yourself to a unique VIP aesthetic amid the lights of Marrakech." },
      { emoji: "🍬", title: "The Art of Detail: Clinical Cleanliness & Premium Fragrance", desc: "True luxury lies in the invisible touches. Our vehicles are delivered in clinical cleanliness and carry a carefully chosen scent that smells divine. Every rental includes fresh water bottles on board and small candies to sweeten your journey from the very first kilometers." },
      { emoji: "✈️", title: "VIP Delivery: Airport, Hotel or Villa", desc: "Forget the endless queues. Your vehicle awaits you the moment you step off the plane at Marrakech-Menara Airport, or directly at your place of stay. Our promise? Express check-in, total reliability and absolute discretion." },
      { emoji: "🔑", title: "Young Drivers Welcome: Trust First", desc: "Unlike traditional agencies that pile on barriers, we choose trust. Our fully-equipped vehicles are accessible to young drivers, with no abusive age restrictions or unjustified surcharges. Prestige should be accessible to those who know how to appreciate it. Book your exclusive experience with Kech Night Drive and let the magic happen." },
    ],
  },
  ar: {
    badge: "ابتكار Kech Night Drive",
    title: "تجربة ستارلايت من Kech Night Drive",
    intro: "لا تستأجر مجرد سيارة، بل استأجر أجواءً كاملة. عندما تأتي إلى Kech Night Drive، فأنت لا تستلم سيارة فحسب: إنها تجربة متكاملة. نعيد تعريف قواعد التأجير ليصبح كل رحلة لحظة لا تُنسى، مصممة بإتقان لتسيطر على ليالي مراكش.",
    features: [
      { emoji: "🌟", title: "السقف النجمي: قبتك السماوية الخاصة", desc: "دع نفسك تنبهر منذ لحظة فتح الباب. مئات الألياف الضوئية تحوّل سقف مقصورتك إلى سماء نجمية مخصصة. اضبط الإضاءة حسب رغبتك واستمتع بجمالية VIP فريدة وسط أضواء مراكش." },
      { emoji: "🍬", title: "فن التفاصيل: نظافة فائقة وعطر فاخر", desc: "الفخامة الحقيقية تكمن في اللمسات غير المرئية. تُسلَّم سياراتنا بنظافة فائقة وتفوح منها رائحة عطرة مختارة بعناية. تتضمن كل عملية تأجير زجاجات ماء بارد على متن السيارة وحلوى صغيرة لتحلية رحلتك منذ الكيلومترات الأولى." },
      { emoji: "✈️", title: "توصيل VIP: المطار أو الفندق أو الفيلا", desc: "انسَ طوابير الانتظار الطويلة. سيارتك بانتظارك فور نزولك من الطائرة في مطار مراكش المنارة أو مباشرة في مكان إقامتك. وعدنا؟ تسجيل سريع وموثوقية تامة وسرية مطلقة." },
      { emoji: "🔑", title: "رخص جديدة مقبولة: الثقة أولاً", desc: "على عكس الوكالات التقليدية التي تكثر من العوائق، نختار نحن الثقة. مركباتنا المجهزة بالكامل متاحة للسائقين الشباب، دون قيود عمرية مبالغ فيها أو رسوم إضافية غير مبررة. يجب أن تكون الفخامة في متناول من يقدّرها. احجز تجربتك الحصرية مع Kech Night Drive ودع السحر يعمل." },
    ],
  },
  es: {
    badge: "La innovación Kech Night Drive",
    title: "La Experiencia Starlight de Kech Night Drive",
    intro: "No alquiles solo un vehículo, alquila una atmósfera. Cuando vienes a Kech Night Drive, no recoges simplemente un coche: es una experiencia completa. Redefinimos las reglas del alquiler para que cada trayecto se convierta en un momento memorable, perfectamente diseñado para dominar la noche de Marrakech.",
    features: [
      { emoji: "🌟", title: "El Cielo Estrellado: Tu Bóveda Celeste Privada", desc: "Déjate cautivar desde que abres la puerta. Cientos de fibras ópticas transforman el techo de tu habitáculo en un cielo estrellado personalizado. Configura el ambiente luminoso a tu gusto y disfruta de una estética VIP única entre las luces de Marrakech." },
      { emoji: "🍬", title: "El Arte del Detalle: Limpieza Clínica y Fragancia Premium", desc: "El verdadero lujo está en los detalles invisibles. Nuestros vehículos se entregan en un estado de limpieza clínica y desprenden un aroma cuidado que huele de maravilla. Cada alquiler incluye botellas de agua fresca a bordo y pequeños caramelos para endulzar tu trayecto desde los primeros kilómetros." },
      { emoji: "✈️", title: "Entrega VIP: Aeropuerto, Hotel o Villa", desc: "Olvídate de las colas interminables. Tu vehículo te espera nada más bajar del avión en el Aeropuerto Marrakech-Menara o directamente en tu lugar de estancia. ¿Nuestra promesa? Registro exprés, fiabilidad total y discreción absoluta." },
      { emoji: "🔑", title: "Jóvenes Conductores Bienvenidos: La Confianza Primero", desc: "A diferencia de las agencias tradicionales que multiplican las barreras, nosotros elegimos la confianza. Nuestros vehículos totalmente equipados son accesibles para jóvenes conductores, sin restricciones de edad abusivas ni recargos injustificados. El prestigio debe ser accesible para quienes saben apreciarlo. Reserva tu experiencia exclusiva con Kech Night Drive y deja que la magia ocurra." },
    ],
  },
  it: {
    badge: "L'innovazione Kech Night Drive",
    title: "L'Esperienza Starlight by Kech Night Drive",
    intro: "Non noleggiare solo un veicolo, noleggia un'atmosfera. Quando vieni da Kech Night Drive, non ritiri semplicemente un'auto: è un'esperienza completa. Ridefiniamo le regole del noleggio affinché ogni viaggio diventi un momento memorabile, perfettamente studiato per dominare la notte di Marrakech.",
    features: [
      { emoji: "🌟", title: "Il Cielo Stellato: La Tua Volta Celeste Privata", desc: "Lasciati incantare dal momento in cui apri la portiera. Centinaia di fibre ottiche trasformano il soffitto del tuo abitacolo in un cielo stellato su misura. Configura l'atmosfera luminosa a tuo piacimento e regalati un'estetica VIP unica tra le luci di Marrakech." },
      { emoji: "🍬", title: "L'Arte del Dettaglio: Pulizia Clinica e Fragranza Premium", desc: "Il vero lusso si nasconde nelle attenzioni invisibili. I nostri veicoli vengono consegnati in condizioni di pulizia clinica e diffondono un profumo curato che sa di buono. Ogni noleggio include bottiglie d'acqua fresca a bordo e piccole caramelle per addolcire il tuo viaggio fin dai primi chilometri." },
      { emoji: "✈️", title: "Consegna VIP: Aeroporto, Hotel o Villa", desc: "Dimentica le code interminabili. Il tuo veicolo ti aspetta appena sceso dall'aereo all'Aeroporto Marrakech-Menara o direttamente nel luogo del tuo soggiorno. La nostra promessa? Check-in express, affidabilità totale e discrezione assoluta." },
      { emoji: "🔑", title: "Neopatentati Benvenuti: Prima la Fiducia", desc: "A differenza delle agenzie tradizionali che moltiplicano le barriere, noi scegliamo la fiducia. I nostri veicoli super accessoriati sono accessibili ai giovani conducenti, senza restrizioni d'età eccessive né supplementi ingiustificati. Il prestigio deve essere accessibile a chi sa apprezzarlo. Prenota la tua esperienza esclusiva con Kech Night Drive e lascia che la magia accada." },
    ],
  },
  de: {
    badge: "Die Kech Night Drive Innovation",
    title: "Das Starlight-Erlebnis von Kech Night Drive",
    intro: "Mieten Sie nicht nur ein Fahrzeug, mieten Sie eine Atmosphäre. Wenn Sie zu Kech Night Drive kommen, holen Sie nicht einfach ein Auto ab: Es ist ein vollständiges Erlebnis. Wir definieren die Regeln der Vermietung neu, damit jede Fahrt zu einem unvergesslichen Moment wird – perfekt zugeschnitten, um die Nacht von Marrakesch zu beherrschen.",
    features: [
      { emoji: "🌟", title: "Der Sternenhimmel: Ihr privates Himmelsgewölbe", desc: "Lassen Sie sich verzaubern, sobald Sie die Tür öffnen. Hunderte von Glasfasern verwandeln die Decke Ihrer Fahrgastzelle in einen maßgeschneiderten Sternenhimmel. Konfigurieren Sie die Lichtstimmung nach Ihren Wünschen und gönnen Sie sich eine einzigartige VIP-Ästhetik inmitten der Lichter von Marrakesch." },
      { emoji: "🍬", title: "Die Kunst des Details: Klinische Sauberkeit & Premium-Duft", desc: "Wahrer Luxus liegt in den unsichtbaren Aufmerksamkeiten. Unsere Fahrzeuge werden in klinischer Sauberkeit geliefert und verströmen einen sorgfältig gewählten, herrlichen Duft. Jede Vermietung umfasst frische Wasserflaschen an Bord und kleine Bonbons, um Ihre Fahrt von den ersten Kilometern an zu versüßen." },
      { emoji: "✈️", title: "VIP-Lieferung: Flughafen, Hotel oder Villa", desc: "Vergessen Sie endlose Warteschlangen. Ihr Fahrzeug erwartet Sie, sobald Sie am Flughafen Marrakesch-Menara aus dem Flugzeug steigen, oder direkt an Ihrem Aufenthaltsort. Unser Versprechen? Express-Check-in, völlige Zuverlässigkeit und absolute Diskretion." },
      { emoji: "🔑", title: "Fahranfänger willkommen: Vertrauen zuerst", desc: "Im Gegensatz zu traditionellen Agenturen, die Barrieren häufen, setzen wir auf Vertrauen. Unsere voll ausgestatteten Fahrzeuge sind für junge Fahrer zugänglich, ohne übermäßige Altersbeschränkungen oder ungerechtfertigte Aufschläge. Prestige sollte für diejenigen zugänglich sein, die es zu schätzen wissen. Buchen Sie Ihr exklusives Erlebnis mit Kech Night Drive und lassen Sie die Magie wirken." },
    ],
  },
  nl: {
    badge: "De Kech Night Drive innovatie",
    title: "De Starlight-ervaring van Kech Night Drive",
    intro: "Huur niet alleen een voertuig, huur een sfeer. Wanneer u bij Kech Night Drive komt, haalt u niet zomaar een auto op: het is een complete ervaring. Wij herdefiniëren de regels van verhuur zodat elke rit een onvergetelijk moment wordt, perfect afgestemd om de Marrakech-nacht te beheersen.",
    features: [
      { emoji: "🌟", title: "De Sterrenhemel: Uw Privé Hemelgewelf", desc: "Laat u betoveren vanaf het moment dat u de deur opent. Honderden glasvezels veranderen het plafond van uw cabine in een sterrenhemel op maat. Stel de lichtsfeer naar wens in en gun uzelf een unieke VIP-esthetiek tussen de lichten van Marrakech." },
      { emoji: "🍬", title: "De Kunst van het Detail: Klinische Netheid & Premium Geur", desc: "Echte luxe schuilt in de onzichtbare attenties. Onze voertuigen worden geleverd in klinische netheid en verspreiden een zorgvuldig gekozen geur die heerlijk ruikt. Elke verhuur bevat verse waterflessen aan boord en kleine snoepjes om uw rit vanaf de eerste kilometers te verzoeten." },
      { emoji: "✈️", title: "VIP-bezorging: Luchthaven, Hotel of Villa", desc: "Vergeet de eindeloze wachtrijen. Uw voertuig wacht op u zodra u uit het vliegtuig stapt op de luchthaven Marrakech-Menara of rechtstreeks op uw verblijfplaats. Onze belofte? Express check-in, totale betrouwbaarheid en absolute discretie." },
      { emoji: "🔑", title: "Jonge Bestuurders Welkom: Vertrouwen Eerst", desc: "In tegenstelling tot traditionele bureaus die barrières opwerpen, kiezen wij voor vertrouwen. Onze volledig uitgeruste voertuigen zijn toegankelijk voor jonge bestuurders, zonder buitensporige leeftijdsbeperkingen of ongerechtvaardigde toeslagen. Prestige moet toegankelijk zijn voor wie het weet te waarderen. Boek uw exclusieve ervaring met Kech Night Drive en laat de magie gebeuren." },
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
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative lg:sticky lg:top-28"
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
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              {c.intro}
            </p>
            <div className="space-y-8">
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
                      <h3 className="font-semibold text-foreground mb-2 text-base">
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
