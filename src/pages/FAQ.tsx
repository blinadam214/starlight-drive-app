import { useState, useEffect } from "react";
import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type Lang = "fr" | "en" | "ar" | "es" | "it" | "de" | "nl";

interface FAQItemData { q: string; a: string; }
interface FAQSection { title: string; items: FAQItemData[]; }

const FAQ_DATA: Record<Lang, { heading: string; subtitle: string; sections: FAQSection[] }> = {
  fr: {
    heading: "Foire Aux Questions",
    subtitle: "Tout ce que vous devez savoir avant de prendre le volant.",
    sections: [
      {
        title: "Réservation et Disponibilité",
        items: [
          { q: "Quel est l'âge minimum pour louer chez Kech Night Drive ?", a: "Nous sommes fiers d'être l'une des rares agences premium à faire confiance aux jeunes conducteurs. Il vous suffit d'être majeur (18 ans) et titulaire d'un permis de conduire valide. Aucun surcoût n'est appliqué pour les jeunes permis." },
          { q: "Quels sont les documents requis pour louer un véhicule ?", a: "La simplicité avant tout : une pièce d'identité (ou passeport) valide, votre permis de conduire, et une carte bancaire pour la caution." },
          { q: "Puis-je modifier ou annuler ma réservation ?", a: "Oui, vous pouvez modifier votre réservation gratuitement jusqu'à 48h avant la prise en charge du véhicule." },
        ],
      },
      {
        title: "Tarifs, Caution et Paiement",
        items: [
          { q: "Comment fonctionne la caution ?", a: "La caution est bloquée sur votre carte bancaire (via pré-autorisation) mais n'est pas débitée. Elle est immédiatement libérée lors de la restitution du véhicule après vérification de l'état des lieux." },
          { q: "Quels sont les moyens de paiement acceptés ?", a: "Nous acceptons les cartes bancaires (Visa, Mastercard), les paiements en ligne sécurisés et les espèces (Euros ou Dirhams)." },
        ],
      },
      {
        title: "Utilisation des Véhicules",
        items: [
          { q: "Les véhicules sont-ils livrés à l'aéroport ?", a: "Oui ! Nous offrons un service de livraison VIP gratuit à l'aéroport Marrakech-Menara, ainsi qu'à votre hôtel ou villa dans le centre de Marrakech." },
          { q: "Les installations lumineuses (Starlight/LED) déchargent-elles la batterie ?", a: "Absolument pas. Nos systèmes sont professionnels, à très basse consommation, et s'éteignent automatiquement lors de la fermeture du véhicule." },
          { q: "Peut-on sortir de Marrakech avec le véhicule ?", a: "Oui, vous êtes libres de circuler sur tout le territoire marocain. La sortie du territoire national est en revanche strictement interdite." },
          { q: "Que faire en cas de panne ou d'accident ?", a: "Tous nos véhicules sont neufs et sous garantie. En cas d'imprévu, notre assistance est disponible 7j/7. Un numéro d'urgence vous est remis lors de la remise des clés." },
        ],
      },
    ],
  },
  en: {
    heading: "Frequently Asked Questions",
    subtitle: "Everything you need to know before taking the wheel.",
    sections: [
      {
        title: "Booking and Availability",
        items: [
          { q: "What is the minimum age to rent at Kech Night Drive?", a: "We're proud to be one of the few premium agencies that trust young drivers. You just need to be of legal age (18) and hold a valid driver's license. No surcharge applies for young licenses." },
          { q: "What documents are required to rent a vehicle?", a: "Simplicity first: a valid ID (or passport), your driver's license, and a bank card for the deposit." },
          { q: "Can I modify or cancel my reservation?", a: "Yes, you can modify your reservation free of charge up to 48h before vehicle pickup." },
        ],
      },
      {
        title: "Pricing, Deposit and Payment",
        items: [
          { q: "How does the deposit work?", a: "The deposit is held on your bank card (via pre-authorization) but not charged. It is immediately released upon vehicle return after inspection." },
          { q: "What payment methods are accepted?", a: "We accept bank cards (Visa, Mastercard), secure online payments and cash (Euros or Dirhams)." },
        ],
      },
      {
        title: "Using the Vehicles",
        items: [
          { q: "Are vehicles delivered to the airport?", a: "Yes! We offer free VIP delivery to Marrakech-Menara airport, as well as to your hotel or villa in central Marrakech." },
          { q: "Do the light installations (Starlight/LED) drain the battery?", a: "Absolutely not. Our systems are professional, very low consumption, and turn off automatically when the vehicle is locked." },
          { q: "Can we leave Marrakech with the vehicle?", a: "Yes, you are free to travel throughout Morocco. Leaving the national territory is however strictly forbidden." },
          { q: "What to do in case of breakdown or accident?", a: "All our vehicles are new and under warranty. In case of any issue, our assistance is available 24/7. An emergency number is given to you when handing over the keys." },
        ],
      },
    ],
  },
  ar: {
    heading: "الأسئلة الشائعة",
    subtitle: "كل ما تحتاج معرفته قبل أن تقود.",
    sections: [
      {
        title: "الحجز والتوفر",
        items: [
          { q: "ما هو الحد الأدنى للسن للاستئجار من Kech Night Drive؟", a: "نفخر بأننا من الوكالات الفاخرة القليلة التي تثق بالسائقين الشباب. يكفي أن تكون بالغًا (18 عامًا) وتملك رخصة قيادة سارية. لا تُطبَّق أي رسوم إضافية على الرخص الجديدة." },
          { q: "ما هي الوثائق المطلوبة لاستئجار سيارة؟", a: "البساطة أولًا: بطاقة هوية (أو جواز سفر) سارية، رخصة القيادة، وبطاقة بنكية للضمان." },
          { q: "هل يمكنني تعديل أو إلغاء حجزي؟", a: "نعم، يمكنك تعديل حجزك مجانًا حتى 48 ساعة قبل استلام السيارة." },
        ],
      },
      {
        title: "الأسعار والضمان والدفع",
        items: [
          { q: "كيف يعمل الضمان؟", a: "يتم حجز الضمان على بطاقتك البنكية (عبر تفويض مسبق) دون خصمه. يُحرَّر فورًا عند إعادة السيارة بعد المعاينة." },
          { q: "ما هي وسائل الدفع المقبولة؟", a: "نقبل البطاقات البنكية (Visa، Mastercard)، المدفوعات الإلكترونية الآمنة، والنقد (يورو أو درهم)." },
        ],
      },
      {
        title: "استخدام السيارات",
        items: [
          { q: "هل تُسلَّم السيارات في المطار؟", a: "نعم! نوفر خدمة توصيل VIP مجانية في مطار مراكش المنارة، وكذلك إلى فندقك أو فيلتك في وسط مراكش." },
          { q: "هل تستهلك إضاءة (Starlight/LED) البطارية؟", a: "إطلاقًا. أنظمتنا احترافية، استهلاكها منخفض جدًا، وتنطفئ تلقائيًا عند إغلاق السيارة." },
          { q: "هل يمكن مغادرة مراكش بالسيارة؟", a: "نعم، يمكنك التنقل في كامل التراب المغربي. أما مغادرة التراب الوطني فممنوعة منعًا باتًا." },
          { q: "ماذا أفعل في حالة عطل أو حادث؟", a: "جميع سياراتنا جديدة وتحت الضمان. في حالة أي طارئ، مساعدتنا متاحة 7/7. يُسلَّم لك رقم طوارئ عند تسليم المفاتيح." },
        ],
      },
    ],
  },
  es: {
    heading: "Preguntas Frecuentes",
    subtitle: "Todo lo que necesitas saber antes de ponerte al volante.",
    sections: [
      {
        title: "Reserva y Disponibilidad",
        items: [
          { q: "¿Cuál es la edad mínima para alquilar en Kech Night Drive?", a: "Estamos orgullosos de ser una de las pocas agencias premium que confía en los jóvenes conductores. Solo necesitas ser mayor de edad (18 años) y tener un permiso de conducir válido. No se aplica ningún recargo por permisos jóvenes." },
          { q: "¿Qué documentos se requieren para alquilar un vehículo?", a: "La simplicidad ante todo: un documento de identidad (o pasaporte) válido, tu permiso de conducir y una tarjeta bancaria para la fianza." },
          { q: "¿Puedo modificar o cancelar mi reserva?", a: "Sí, puedes modificar tu reserva de forma gratuita hasta 48h antes de recoger el vehículo." },
        ],
      },
      {
        title: "Tarifas, Fianza y Pago",
        items: [
          { q: "¿Cómo funciona la fianza?", a: "La fianza se bloquea en tu tarjeta bancaria (mediante preautorización) pero no se cobra. Se libera inmediatamente al devolver el vehículo tras la inspección." },
          { q: "¿Qué métodos de pago se aceptan?", a: "Aceptamos tarjetas bancarias (Visa, Mastercard), pagos en línea seguros y efectivo (Euros o Dirhams)." },
        ],
      },
      {
        title: "Uso de los Vehículos",
        items: [
          { q: "¿Los vehículos se entregan en el aeropuerto?", a: "¡Sí! Ofrecemos un servicio de entrega VIP gratuito en el aeropuerto Marrakech-Menara, así como en tu hotel o villa en el centro de Marrakech." },
          { q: "¿Las instalaciones luminosas (Starlight/LED) descargan la batería?", a: "En absoluto. Nuestros sistemas son profesionales, de muy bajo consumo, y se apagan automáticamente al cerrar el vehículo." },
          { q: "¿Se puede salir de Marrakech con el vehículo?", a: "Sí, eres libre de circular por todo el territorio marroquí. Sin embargo, salir del territorio nacional está estrictamente prohibido." },
          { q: "¿Qué hacer en caso de avería o accidente?", a: "Todos nuestros vehículos son nuevos y están en garantía. En caso de imprevisto, nuestra asistencia está disponible 24/7. Se te entrega un número de emergencia al recibir las llaves." },
        ],
      },
    ],
  },
  it: {
    heading: "Domande Frequenti",
    subtitle: "Tutto ciò che devi sapere prima di metterti al volante.",
    sections: [
      {
        title: "Prenotazione e Disponibilità",
        items: [
          { q: "Qual è l'età minima per noleggiare da Kech Night Drive?", a: "Siamo orgogliosi di essere una delle poche agenzie premium che si fida dei giovani conducenti. Basta essere maggiorenni (18 anni) e avere una patente valida. Nessun supplemento per i neopatentati." },
          { q: "Quali documenti servono per noleggiare un veicolo?", a: "Semplicità prima di tutto: un documento d'identità (o passaporto) valido, la patente e una carta bancaria per la cauzione." },
          { q: "Posso modificare o annullare la mia prenotazione?", a: "Sì, puoi modificare la prenotazione gratuitamente fino a 48h prima del ritiro del veicolo." },
        ],
      },
      {
        title: "Tariffe, Cauzione e Pagamento",
        items: [
          { q: "Come funziona la cauzione?", a: "La cauzione viene bloccata sulla tua carta (tramite preautorizzazione) ma non addebitata. Viene rilasciata immediatamente alla riconsegna del veicolo dopo il controllo." },
          { q: "Quali metodi di pagamento accettate?", a: "Accettiamo carte bancarie (Visa, Mastercard), pagamenti online sicuri e contanti (Euro o Dirham)." },
        ],
      },
      {
        title: "Utilizzo dei Veicoli",
        items: [
          { q: "I veicoli vengono consegnati all'aeroporto?", a: "Sì! Offriamo un servizio di consegna VIP gratuito all'aeroporto di Marrakech-Menara, oltre che al tuo hotel o villa nel centro di Marrakech." },
          { q: "Gli impianti luminosi (Starlight/LED) scaricano la batteria?", a: "Assolutamente no. I nostri sistemi sono professionali, a bassissimo consumo, e si spengono automaticamente alla chiusura del veicolo." },
          { q: "Si può uscire da Marrakech con il veicolo?", a: "Sì, sei libero di circolare su tutto il territorio marocchino. L'uscita dal territorio nazionale è invece severamente vietata." },
          { q: "Cosa fare in caso di guasto o incidente?", a: "Tutti i nostri veicoli sono nuovi e in garanzia. In caso di imprevisti, la nostra assistenza è disponibile 24/7. Un numero di emergenza ti viene fornito alla consegna delle chiavi." },
        ],
      },
    ],
  },
  de: {
    heading: "Häufig gestellte Fragen",
    subtitle: "Alles, was Sie wissen müssen, bevor Sie ans Steuer gehen.",
    sections: [
      {
        title: "Buchung und Verfügbarkeit",
        items: [
          { q: "Was ist das Mindestalter für die Miete bei Kech Night Drive?", a: "Wir sind stolz darauf, eine der wenigen Premium-Agenturen zu sein, die jungen Fahrern vertrauen. Sie müssen lediglich volljährig (18) sein und einen gültigen Führerschein besitzen. Kein Aufschlag für Fahranfänger." },
          { q: "Welche Dokumente sind für die Anmietung erforderlich?", a: "Einfachheit zuerst: ein gültiger Ausweis (oder Reisepass), Ihr Führerschein und eine Bankkarte für die Kaution." },
          { q: "Kann ich meine Reservierung ändern oder stornieren?", a: "Ja, Sie können Ihre Reservierung bis zu 48 Stunden vor der Fahrzeugübernahme kostenlos ändern." },
        ],
      },
      {
        title: "Preise, Kaution und Zahlung",
        items: [
          { q: "Wie funktioniert die Kaution?", a: "Die Kaution wird auf Ihrer Bankkarte blockiert (per Vorautorisierung), aber nicht abgebucht. Sie wird bei der Fahrzeugrückgabe nach der Prüfung sofort freigegeben." },
          { q: "Welche Zahlungsmethoden werden akzeptiert?", a: "Wir akzeptieren Bankkarten (Visa, Mastercard), sichere Online-Zahlungen und Bargeld (Euro oder Dirham)." },
        ],
      },
      {
        title: "Nutzung der Fahrzeuge",
        items: [
          { q: "Werden die Fahrzeuge zum Flughafen geliefert?", a: "Ja! Wir bieten einen kostenlosen VIP-Lieferservice zum Flughafen Marrakesch-Menara sowie zu Ihrem Hotel oder Ihrer Villa im Zentrum von Marrakesch." },
          { q: "Entladen die Lichtinstallationen (Starlight/LED) die Batterie?", a: "Absolut nicht. Unsere Systeme sind professionell, sehr stromsparend und schalten sich beim Verschließen des Fahrzeugs automatisch ab." },
          { q: "Kann man mit dem Fahrzeug Marrakesch verlassen?", a: "Ja, Sie können sich frei im gesamten marokkanischen Gebiet bewegen. Das Verlassen des Staatsgebiets ist jedoch strengstens untersagt." },
          { q: "Was tun bei Panne oder Unfall?", a: "Alle unsere Fahrzeuge sind neu und unter Garantie. Bei Problemen ist unsere Assistance rund um die Uhr verfügbar. Eine Notfallnummer wird Ihnen bei der Schlüsselübergabe ausgehändigt." },
        ],
      },
    ],
  },
  nl: {
    heading: "Veelgestelde Vragen",
    subtitle: "Alles wat u moet weten voordat u achter het stuur kruipt.",
    sections: [
      {
        title: "Reservering en Beschikbaarheid",
        items: [
          { q: "Wat is de minimumleeftijd om te huren bij Kech Night Drive?", a: "We zijn trots een van de weinige premium bureaus te zijn die jonge bestuurders vertrouwen. U hoeft alleen meerderjarig (18) te zijn en een geldig rijbewijs te hebben. Geen toeslag voor jonge rijbewijzen." },
          { q: "Welke documenten zijn nodig om een voertuig te huren?", a: "Eenvoud voorop: een geldig identiteitsbewijs (of paspoort), uw rijbewijs en een bankkaart voor de borg." },
          { q: "Kan ik mijn reservering wijzigen of annuleren?", a: "Ja, u kunt uw reservering gratis wijzigen tot 48u voor het ophalen van het voertuig." },
        ],
      },
      {
        title: "Tarieven, Borg en Betaling",
        items: [
          { q: "Hoe werkt de borg?", a: "De borg wordt geblokkeerd op uw bankkaart (via pre-autorisatie) maar niet afgeschreven. Hij wordt onmiddellijk vrijgegeven bij teruggave van het voertuig na inspectie." },
          { q: "Welke betaalmethoden worden geaccepteerd?", a: "We accepteren bankkaarten (Visa, Mastercard), beveiligde online betalingen en contant geld (Euro of Dirham)." },
        ],
      },
      {
        title: "Gebruik van de Voertuigen",
        items: [
          { q: "Worden voertuigen op de luchthaven geleverd?", a: "Ja! We bieden een gratis VIP-bezorgservice op de luchthaven Marrakech-Menara, evenals bij uw hotel of villa in het centrum van Marrakech." },
          { q: "Verbruiken de lichtinstallaties (Starlight/LED) de accu?", a: "Absoluut niet. Onze systemen zijn professioneel, zeer zuinig en schakelen automatisch uit bij het vergrendelen van het voertuig." },
          { q: "Mag men Marrakech verlaten met het voertuig?", a: "Ja, u bent vrij om door heel Marokko te reizen. Het verlaten van het nationale grondgebied is echter ten strengste verboden." },
          { q: "Wat te doen bij pech of een ongeval?", a: "Al onze voertuigen zijn nieuw en onder garantie. Bij problemen is onze assistentie 24/7 beschikbaar. Een noodnummer wordt u overhandigd bij het overhandigen van de sleutels." },
        ],
      },
    ],
  },
};

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border/50">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-5 text-left rtl:text-right gap-4"
      >
        <span className="font-medium text-foreground">{q}</span>
        <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 pb-5" : "max-h-0"}`}>
        <p className="text-muted-foreground text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const { language } = useLanguage();
  const data = FAQ_DATA[(language as Lang)] || FAQ_DATA.fr;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

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
              FAQ
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 font-serif">{data.heading}</h1>
            <p className="text-muted-foreground text-lg">{data.subtitle}</p>
          </motion.div>

          {data.sections.map((section, si) => (
            <motion.div
              key={si}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: si * 0.1 }}
              className="mb-12"
            >
              <h2 className="text-xl font-bold text-foreground mb-4 font-serif flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg gradient-neon flex items-center justify-center text-xs text-primary-foreground font-bold">
                  {si + 1}
                </span>
                {section.title}
              </h2>
              <div className="glass rounded-2xl px-6">
                {section.items.map((item, ii) => (
                  <FAQItem key={ii} q={item.q} a={item.a} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default FAQ;
