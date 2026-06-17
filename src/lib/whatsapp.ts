// Helper centralisé pour générer les liens WhatsApp pré-remplis
// Numéro unique + modèles de message dans les 7 langues

export const WHATSAPP_NUMBER = "33635121205";

type Lang = "fr" | "en" | "ar" | "es" | "it" | "de" | "nl";

interface BuildArgs {
  vehicleName?: string;
  price?: number;
  startDate?: string;
  endDate?: string;
  days?: number;
  total?: number;
  lang?: string;
}

const GENERIC: Record<Lang, string> = {
  fr: "Bonjour Kech Night Drive ! J'aimerais avoir des informations sur la location de vos véhicules.",
  en: "Hello Kech Night Drive! I'd like some information about renting.",
  ar: "مرحبا Kech Night Drive! أود الحصول على معلومات حول التأجير.",
  es: "¡Hola Kech Night Drive! Me gustaría información sobre el alquiler.",
  it: "Ciao Kech Night Drive! Vorrei informazioni sul noleggio.",
  de: "Hallo Kech Night Drive! Ich hätte gerne Informationen zur Vermietung.",
  nl: "Hallo Kech Night Drive! Ik wil graag informatie over het huren.",
};

const buildDetailed = (lang: Lang, a: BuildArgs): string => {
  const name = a.vehicleName || "";
  const dates = a.startDate && a.endDate ? `${a.startDate} → ${a.endDate}` : "";
  const total = a.total ? `${a.total} €` : "";

  const templates: Record<Lang, string> = {
    fr: `Bonjour Kech Night Drive ! Je souhaite réserver : ${name}${dates ? `\nDates : ${dates}` : ""}${a.days ? `\nDurée : ${a.days} jour(s)` : ""}${total ? `\nTotal estimé : ${total}` : ""}\nPouvez-vous me confirmer la disponibilité ?`,
    en: `Hello Kech Night Drive! I'd like to book: ${name}${dates ? `\nDates: ${dates}` : ""}${a.days ? `\nDuration: ${a.days} day(s)` : ""}${total ? `\nEstimated total: ${total}` : ""}\nCan you confirm availability?`,
    ar: `مرحبا Kech Night Drive! أرغب في حجز: ${name}${dates ? `\nالتواريخ: ${dates}` : ""}${a.days ? `\nالمدة: ${a.days} يوم` : ""}${total ? `\nالمجموع التقديري: ${total}` : ""}\nهل يمكنكم تأكيد التوفر؟`,
    es: `¡Hola Kech Night Drive! Quiero reservar: ${name}${dates ? `\nFechas: ${dates}` : ""}${a.days ? `\nDuración: ${a.days} día(s)` : ""}${total ? `\nTotal estimado: ${total}` : ""}\n¿Pueden confirmar la disponibilidad?`,
    it: `Ciao Kech Night Drive! Vorrei prenotare: ${name}${dates ? `\nDate: ${dates}` : ""}${a.days ? `\nDurata: ${a.days} giorno/i` : ""}${total ? `\nTotale stimato: ${total}` : ""}\nPotete confermare la disponibilità?`,
    de: `Hallo Kech Night Drive! Ich möchte buchen: ${name}${dates ? `\nDaten: ${dates}` : ""}${a.days ? `\nDauer: ${a.days} Tag(e)` : ""}${total ? `\nGeschätzter Gesamtbetrag: ${total}` : ""}\nKönnen Sie die Verfügbarkeit bestätigen?`,
    nl: `Hallo Kech Night Drive! Ik wil boeken: ${name}${dates ? `\nData: ${dates}` : ""}${a.days ? `\nDuur: ${a.days} dag(en)` : ""}${total ? `\nGeschat totaal: ${total}` : ""}\nKunt u de beschikbaarheid bevestigen?`,
  };
  return templates[lang];
};

export const buildWhatsAppUrl = (args: BuildArgs = {}): string => {
  const lang = (["fr", "en", "ar", "es", "it", "de", "nl"].includes(args.lang || "")
    ? args.lang
    : "fr") as Lang;
  const message = args.vehicleName ? buildDetailed(lang, args) : GENERIC[lang];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};
