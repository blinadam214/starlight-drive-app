import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown, ShieldCheck, CreditCard, UserCheck, FileText, XCircle, Car } from "lucide-react";

type Lang = "fr" | "en" | "ar" | "es" | "it" | "de" | "nl";

interface CondItem { icon: typeof ShieldCheck; q: string; a: string; }

const DATA: Record<Lang, { title: string; items: CondItem[] }> = {
  fr: {
    title: "Conditions de location claires",
    items: [
      { icon: CreditCard, q: "Caution & paiement", a: "Caution bloquée par pré-autorisation sur carte bancaire (non débitée), restituée sous 48h après retour du véhicule. Paiement accepté : carte, en ligne sécurisé, espèces (€ ou MAD)." },
      { icon: UserCheck, q: "Âge & jeunes permis", a: "Dès 18 ans avec permis valide. Aucune surcharge cachée pour les jeunes conducteurs, contrairement aux agences classiques." },
      { icon: ShieldCheck, q: "Assurance incluse", a: "Tous nos véhicules sont assurés et sous garantie. Assistance disponible 7j/7 en cas d'imprévu." },
      { icon: FileText, q: "Documents requis", a: "Une pièce d'identité ou passeport valide, votre permis de conduire, et une carte bancaire pour la caution." },
      { icon: Car, q: "Kilométrage & circulation", a: "Circulation libre sur tout le territoire marocain. La sortie du territoire national est strictement interdite." },
      { icon: XCircle, q: "Annulation", a: "Modification ou annulation gratuite jusqu'à 48h avant la prise en charge du véhicule." },
    ],
  },
  en: {
    title: "Clear rental conditions",
    items: [
      { icon: CreditCard, q: "Deposit & payment", a: "Deposit held via pre-authorization on bank card (not charged), released within 48h after vehicle return. Payment: card, secure online, cash (€ or MAD)." },
      { icon: UserCheck, q: "Age & young drivers", a: "From 18 with a valid license. No hidden surcharge for young drivers, unlike traditional agencies." },
      { icon: ShieldCheck, q: "Insurance included", a: "All our vehicles are insured and under warranty. Assistance available 24/7 in case of any issue." },
      { icon: FileText, q: "Required documents", a: "A valid ID or passport, your driver's license, and a bank card for the deposit." },
      { icon: Car, q: "Mileage & driving", a: "Free driving throughout Morocco. Leaving the national territory is strictly forbidden." },
      { icon: XCircle, q: "Cancellation", a: "Free modification or cancellation up to 48h before vehicle pickup." },
    ],
  },
  ar: {
    title: "شروط تأجير واضحة",
    items: [
      { icon: CreditCard, q: "الضمان والدفع", a: "يُحجز الضمان عبر تفويض مسبق على البطاقة البنكية (دون خصم)، ويُسترجع خلال 48 ساعة بعد إعادة السيارة. الدفع: بطاقة، إلكتروني آمن، نقدًا (€ أو درهم)." },
      { icon: UserCheck, q: "السن والرخص الجديدة", a: "ابتداءً من 18 عامًا برخصة سارية. لا رسوم خفية للسائقين الشباب، خلافًا للوكالات التقليدية." },
      { icon: ShieldCheck, q: "التأمين مشمول", a: "جميع سياراتنا مؤمَّنة وتحت الضمان. المساعدة متاحة 7/7 عند أي طارئ." },
      { icon: FileText, q: "الوثائق المطلوبة", a: "بطاقة هوية أو جواز سفر ساري، رخصة القيادة، وبطاقة بنكية للضمان." },
      { icon: Car, q: "المسافة والتنقل", a: "تنقل حر في كامل التراب المغربي. مغادرة التراب الوطني ممنوعة منعًا باتًا." },
      { icon: XCircle, q: "الإلغاء", a: "تعديل أو إلغاء مجاني حتى 48 ساعة قبل استلام السيارة." },
    ],
  },
  es: {
    title: "Condiciones de alquiler claras",
    items: [
      { icon: CreditCard, q: "Fianza y pago", a: "Fianza bloqueada por preautorización en tarjeta (sin cargo), liberada en 48h tras la devolución. Pago: tarjeta, online seguro, efectivo (€ o MAD)." },
      { icon: UserCheck, q: "Edad y jóvenes conductores", a: "Desde 18 años con permiso válido. Sin recargos ocultos para jóvenes conductores, a diferencia de las agencias clásicas." },
      { icon: ShieldCheck, q: "Seguro incluido", a: "Todos nuestros vehículos están asegurados y en garantía. Asistencia disponible 24/7." },
      { icon: FileText, q: "Documentos requeridos", a: "Documento de identidad o pasaporte válido, permiso de conducir y tarjeta bancaria para la fianza." },
      { icon: Car, q: "Kilometraje y circulación", a: "Circulación libre por todo Marruecos. Salir del territorio nacional está estrictamente prohibido." },
      { icon: XCircle, q: "Cancelación", a: "Modificación o cancelación gratuita hasta 48h antes de recoger el vehículo." },
    ],
  },
  it: {
    title: "Condizioni di noleggio chiare",
    items: [
      { icon: CreditCard, q: "Cauzione e pagamento", a: "Cauzione bloccata tramite preautorizzazione su carta (non addebitata), rilasciata entro 48h dopo la riconsegna. Pagamento: carta, online sicuro, contanti (€ o MAD)." },
      { icon: UserCheck, q: "Età e neopatentati", a: "Da 18 anni con patente valida. Nessun supplemento nascosto per i giovani conducenti, a differenza delle agenzie classiche." },
      { icon: ShieldCheck, q: "Assicurazione inclusa", a: "Tutti i nostri veicoli sono assicurati e in garanzia. Assistenza disponibile 24/7." },
      { icon: FileText, q: "Documenti richiesti", a: "Documento d'identità o passaporto valido, patente e carta bancaria per la cauzione." },
      { icon: Car, q: "Chilometraggio e circolazione", a: "Circolazione libera in tutto il Marocco. L'uscita dal territorio nazionale è severamente vietata." },
      { icon: XCircle, q: "Cancellazione", a: "Modifica o cancellazione gratuita fino a 48h prima del ritiro del veicolo." },
    ],
  },
  de: {
    title: "Klare Mietbedingungen",
    items: [
      { icon: CreditCard, q: "Kaution & Zahlung", a: "Kaution per Vorautorisierung auf Bankkarte blockiert (nicht abgebucht), Freigabe innerhalb von 48h nach Rückgabe. Zahlung: Karte, sicher online, bar (€ oder MAD)." },
      { icon: UserCheck, q: "Alter & Fahranfänger", a: "Ab 18 mit gültigem Führerschein. Kein versteckter Aufschlag für junge Fahrer, anders als bei klassischen Agenturen." },
      { icon: ShieldCheck, q: "Versicherung inklusive", a: "Alle Fahrzeuge sind versichert und unter Garantie. Assistance rund um die Uhr verfügbar." },
      { icon: FileText, q: "Erforderliche Dokumente", a: "Gültiger Ausweis oder Reisepass, Führerschein und Bankkarte für die Kaution." },
      { icon: Car, q: "Kilometer & Fahren", a: "Freie Fahrt in ganz Marokko. Das Verlassen des Staatsgebiets ist strengstens untersagt." },
      { icon: XCircle, q: "Stornierung", a: "Kostenlose Änderung oder Stornierung bis 48h vor Fahrzeugübernahme." },
    ],
  },
  nl: {
    title: "Duidelijke huurvoorwaarden",
    items: [
      { icon: CreditCard, q: "Borg & betaling", a: "Borg geblokkeerd via pre-autorisatie op bankkaart (niet afgeschreven), vrijgegeven binnen 48u na teruggave. Betaling: kaart, veilig online, contant (€ of MAD)." },
      { icon: UserCheck, q: "Leeftijd & jonge bestuurders", a: "Vanaf 18 jaar met geldig rijbewijs. Geen verborgen toeslag voor jonge bestuurders, in tegenstelling tot klassieke bureaus." },
      { icon: ShieldCheck, q: "Verzekering inbegrepen", a: "Al onze voertuigen zijn verzekerd en onder garantie. Assistentie 24/7 beschikbaar." },
      { icon: FileText, q: "Vereiste documenten", a: "Geldig identiteitsbewijs of paspoort, uw rijbewijs en een bankkaart voor de borg." },
      { icon: Car, q: "Kilometers & rijden", a: "Vrij rijden door heel Marokko. Het verlaten van het nationale grondgebied is ten strengste verboden." },
      { icon: XCircle, q: "Annulering", a: "Gratis wijziging of annulering tot 48u voor het ophalen van het voertuig." },
    ],
  },
};

const Row = ({ item }: { item: CondItem }) => {
  const [open, setOpen] = useState(false);
  const Icon = item.icon;
  return (
    <div className="border-b border-border/40 last:border-0">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-3 w-full py-4 text-left rtl:text-right">
        <span className="w-9 h-9 rounded-lg glass flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-primary" />
        </span>
        <span className="flex-1 font-medium text-foreground text-sm">{item.q}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-60 pb-4" : "max-h-0"}`}>
        <p className="text-sm text-muted-foreground leading-relaxed pl-12 rtl:pl-0 rtl:pr-12">{item.a}</p>
      </div>
    </div>
  );
};

const RentalConditions = () => {
  const { language } = useLanguage();
  const data = DATA[(language as Lang)] || DATA.fr;

  return (
    <div className="glass rounded-2xl p-6 mt-8">
      <h2 className="text-lg font-bold text-foreground mb-2 font-serif flex items-center gap-2">
        <ShieldCheck className="w-5 h-5 text-primary" />
        {data.title}
      </h2>
      <div className="mt-2">
        {data.items.map((item, i) => (
          <Row key={i} item={item} />
        ))}
      </div>
    </div>
  );
};

export default RentalConditions;
