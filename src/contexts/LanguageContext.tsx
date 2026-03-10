import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "fr" | "en" | "ar" | "de" | "nl";

type TranslationEntry = { fr: string; en: string; ar: string; de: string; nl: string };
type Translations = { [key: string]: TranslationEntry };

export const translations: Translations = {
  // Header
  "nav.fleet": {
    fr: "La Flotte", en: "Fleet", ar: "الأسطول", de: "Flotte", nl: "Vloot"
  },
  "nav.concept": {
    fr: "Le Concept", en: "Concept", ar: "المفهوم", de: "Konzept", nl: "Concept"
  },
  "nav.booking": {
    fr: "Réservation", en: "Booking", ar: "الحجز", de: "Buchung", nl: "Reservering"
  },
  "nav.checkin": {
    fr: "Check-in Express", en: "Express Check-in", ar: "تسجيل سريع", de: "Express Check-in", nl: "Express Check-in"
  },

  // Hero
  "hero.tagline": {
    fr: "Location Premium à Marrakech", en: "Premium Rental in Marrakech", ar: "تأجير فاخر في مراكش", de: "Premium-Vermietung in Marrakesch", nl: "Premium verhuur in Marrakech"
  },
  "hero.title1": {
    fr: "Conduisez sous", en: "Drive Under", ar: "قُد تحت", de: "Fahren Sie unter", nl: "Rijd onder"
  },
  "hero.title2": {
    fr: "les étoiles", en: "the Stars", ar: "النجوم", de: "den Sternen", nl: "de sterren"
  },
  "hero.subtitle": {
    fr: "Découvrez nos citadines transformées avec ciel étoilé et ambiance LED. Le luxe accessible, la nuit à Marrakech.",
    en: "Discover our city cars transformed with starlight ceilings and LED ambiance. Affordable luxury, Marrakech by night.",
    ar: "اكتشف سياراتنا المدنية المحولة بسقف نجمي وأجواء LED. الفخامة في متناول الجميع، مراكش ليلاً.",
    de: "Entdecken Sie unsere Stadtautos mit Sternenhimmel und LED-Ambiente. Erschwinglicher Luxus, Marrakesch bei Nacht.",
    nl: "Ontdek onze stadsauto's met sterrenhemel en LED-sfeer. Betaalbare luxe, Marrakech bij nacht."
  },
  "hero.cta": {
    fr: "Découvrir la flotte", en: "Explore the Fleet", ar: "استكشف الأسطول", de: "Flotte entdecken", nl: "Ontdek de vloot"
  },
  "hero.cta2": {
    fr: "Réserver maintenant", en: "Book Now", ar: "احجز الآن", de: "Jetzt buchen", nl: "Nu boeken"
  },

  // Innovation
  "innovation.badge": {
    fr: "L'innovation B-LINE 26", en: "The B-LINE 26 Innovation", ar: "ابتكار B-LINE 26", de: "Die B-LINE 26 Innovation", nl: "De B-LINE 26 innovatie"
  },
  "innovation.title": {
    fr: "L'expérience Starlight", en: "The Starlight Experience", ar: "تجربة ستارلايت", de: "Das Starlight-Erlebnis", nl: "De Starlight-ervaring"
  },
  "innovation.subtitle": {
    fr: "Des citadines ordinaires, une expérience extraordinaire. Nos Clio 5 et Peugeot 208 sont équipées de ciels étoilés et d'éclairages LED d'ambiance.",
    en: "Ordinary city cars, an extraordinary experience. Our Clio 5 and Peugeot 208 come equipped with starlight ceilings and LED ambient lighting.",
    ar: "سيارات مدنية عادية، تجربة استثنائية. سياراتنا Clio 5 و Peugeot 208 مجهزة بسقوف نجمية وإضاءة LED محيطية.",
    de: "Gewöhnliche Stadtautos, ein außergewöhnliches Erlebnis. Unsere Clio 5 und Peugeot 208 sind mit Sternenhimmel und LED-Ambiente ausgestattet.",
    nl: "Gewone stadsauto's, een buitengewone ervaring. Onze Clio 5 en Peugeot 208 zijn uitgerust met sterrenhemel en LED-sfeerverlichting."
  },
  "innovation.feat1.title": {
    fr: "Ciel Étoilé", en: "Starlight Ceiling", ar: "سقف نجمي", de: "Sternenhimmel", nl: "Sterrenhemel"
  },
  "innovation.feat1.desc": {
    fr: "Des centaines de fibres optiques transforment le plafond en voûte céleste.",
    en: "Hundreds of fiber optics transform the ceiling into a celestial vault.",
    ar: "مئات الألياف الضوئية تحول السقف إلى قبة سماوية.",
    de: "Hunderte Glasfasern verwandeln die Decke in ein Himmelsgewölbe.",
    nl: "Honderden glasvezels transformeren het plafond in een hemelgewelf."
  },
  "innovation.feat2.title": {
    fr: "Ambiance LED", en: "LED Ambiance", ar: "أجواء LED", de: "LED-Ambiente", nl: "LED-sfeer"
  },
  "innovation.feat2.desc": {
    fr: "Éclairage d'ambiance multicolore pour une atmosphère unique à chaque trajet.",
    en: "Multicolor ambient lighting for a unique atmosphere on every ride.",
    ar: "إضاءة محيطية متعددة الألوان لأجواء فريدة في كل رحلة.",
    de: "Mehrfarbige Ambientebeleuchtung für eine einzigartige Atmosphäre bei jeder Fahrt.",
    nl: "Meerkleurige sfeerverlichting voor een unieke sfeer bij elke rit."
  },
  "innovation.feat3.title": {
    fr: "Luxe Abordable", en: "Affordable Luxury", ar: "فخامة بأسعار معقولة", de: "Erschwinglicher Luxus", nl: "Betaalbare luxe"
  },
  "innovation.feat3.desc": {
    fr: "L'expérience VIP sans le prix VIP. Le confort premium au tarif citadine.",
    en: "The VIP experience without the VIP price. Premium comfort at city car rates.",
    ar: "تجربة VIP بدون سعر VIP. راحة فاخرة بأسعار السيارات المدنية.",
    de: "Das VIP-Erlebnis ohne VIP-Preis. Premium-Komfort zum Stadtwagen-Tarif.",
    nl: "De VIP-ervaring zonder VIP-prijs. Premium comfort tegen stadsautotarieven."
  },

  // Fleet
  "fleet.badge": {
    fr: "Notre flotte", en: "Our Fleet", ar: "أسطولنا", de: "Unsere Flotte", nl: "Onze vloot"
  },
  "fleet.title": {
    fr: "Choisissez votre style", en: "Choose Your Style", ar: "اختر أسلوبك", de: "Wählen Sie Ihren Stil", nl: "Kies uw stijl"
  },
  "fleet.subtitle": {
    fr: "De l'innovation au frisson, trouvez le véhicule qui correspond à votre aventure à Marrakech.",
    en: "From innovation to thrill, find the vehicle that matches your Marrakech adventure.",
    ar: "من الابتكار إلى الإثارة، اعثر على السيارة التي تناسب مغامرتك في مراكش.",
    de: "Von Innovation bis Nervenkitzel – finden Sie das Fahrzeug für Ihr Marrakesch-Abenteuer.",
    nl: "Van innovatie tot sensatie, vind het voertuig dat past bij uw Marrakech-avontuur."
  },
  "fleet.from": {
    fr: "À partir de", en: "From", ar: "ابتداءً من", de: "Ab", nl: "Vanaf"
  },
  "fleet.perday": {
    fr: "/jour", en: "/day", ar: "/يوم", de: "/Tag", nl: "/dag"
  },
  "fleet.book": {
    fr: "Réserver", en: "Book Now", ar: "احجز الآن", de: "Buchen", nl: "Boeken"
  },
  "fleet.dates": {
    fr: "Vérifier les dates", en: "Check Dates", ar: "تحقق من التواريخ", de: "Termine prüfen", nl: "Data controleren"
  },

  // Vehicles
  "vehicle.clio.name": {
    fr: "Renault Clio 5 — Starlight", en: "Renault Clio 5 — Starlight", ar: "رينو كليو 5 — ستارلايت", de: "Renault Clio 5 — Starlight", nl: "Renault Clio 5 — Starlight"
  },
  "vehicle.clio.desc": {
    fr: "Ciel étoilé • LED Ambiance • Climatisation • Bluetooth",
    en: "Starlight ceiling • LED Ambiance • A/C • Bluetooth",
    ar: "سقف نجمي • أجواء LED • تكييف • بلوتوث",
    de: "Sternenhimmel • LED-Ambiente • Klimaanlage • Bluetooth",
    nl: "Sterrenhemel • LED-sfeer • Airco • Bluetooth"
  },
  "vehicle.208.name": {
    fr: "Peugeot 208 — Starlight", en: "Peugeot 208 — Starlight", ar: "بيجو 208 — ستارلايت", de: "Peugeot 208 — Starlight", nl: "Peugeot 208 — Starlight"
  },
  "vehicle.208.desc": {
    fr: "Ciel étoilé • LED Ambiance • Écran tactile • Caméra de recul",
    en: "Starlight ceiling • LED Ambiance • Touchscreen • Rear camera",
    ar: "سقف نجمي • أجواء LED • شاشة لمس • كاميرا خلفية",
    de: "Sternenhimmel • LED-Ambiente • Touchscreen • Rückfahrkamera",
    nl: "Sterrenhemel • LED-sfeer • Touchscreen • Achteruitrijcamera"
  },
  "vehicle.logan.name": {
    fr: "Dacia Logan — Essentiel", en: "Dacia Logan — Essential", ar: "داسيا لوغان — أساسي", de: "Dacia Logan — Essential", nl: "Dacia Logan — Essential"
  },
  "vehicle.logan.desc": {
    fr: "Climatisation • Spacieuse • Économique • GPS disponible",
    en: "A/C • Spacious • Economical • GPS available",
    ar: "تكييف • واسعة • اقتصادية • GPS متاح",
    de: "Klimaanlage • Geräumig • Wirtschaftlich • GPS verfügbar",
    nl: "Airco • Ruim • Zuinig • GPS beschikbaar"
  },
  "vehicle.tmax.name": {
    fr: "Yamaha TMAX 560", en: "Yamaha TMAX 560", ar: "ياماها TMAX 560", de: "Yamaha TMAX 560", nl: "Yamaha TMAX 560"
  },
  "vehicle.tmax.desc": {
    fr: "560cc • Automatique • Confort premium • Permis A requis",
    en: "560cc • Automatic • Premium comfort • License A required",
    ar: "560 سي سي • أوتوماتيك • راحة فاخرة • رخصة A مطلوبة",
    de: "560cc • Automatik • Premium-Komfort • Führerschein A erforderlich",
    nl: "560cc • Automatisch • Premium comfort • Rijbewijs A vereist"
  },
  "vehicle.tracer.name": {
    fr: "Yamaha Tracer 900", en: "Yamaha Tracer 900", ar: "ياماها تريسر 900", de: "Yamaha Tracer 900", nl: "Yamaha Tracer 900"
  },
  "vehicle.tracer.desc": {
    fr: "900cc • Sport-touring • Puissante • Permis A requis",
    en: "900cc • Sport-touring • Powerful • License A required",
    ar: "900 سي سي • سبورت-تورينغ • قوية • رخصة A مطلوبة",
    de: "900cc • Sport-Touring • Leistungsstark • Führerschein A erforderlich",
    nl: "900cc • Sport-touring • Krachtig • Rijbewijs A vereist"
  },

  // Booking
  "booking.badge": {
    fr: "Réservation simplifiée", en: "Simplified Booking", ar: "حجز مبسط", de: "Vereinfachte Buchung", nl: "Vereenvoudigd boeken"
  },
  "booking.title": {
    fr: "Réservez en 3 étapes", en: "Book in 3 Steps", ar: "احجز في 3 خطوات", de: "Buchen in 3 Schritten", nl: "Boek in 3 stappen"
  },
  "booking.subtitle": {
    fr: "Notre processus Fast-Track élimine toute attente. Recevez vos clés instantanément.",
    en: "Our Fast-Track process eliminates all waiting. Get your keys instantly.",
    ar: "عمليتنا السريعة تزيل كل الانتظار. استلم مفاتيحك فوراً.",
    de: "Unser Fast-Track-Prozess eliminiert jede Wartezeit. Erhalten Sie Ihre Schlüssel sofort.",
    nl: "Ons Fast-Track-proces elimineert alle wachttijd. Ontvang uw sleutels direct."
  },
  "booking.step1.title": {
    fr: "Choisissez vos dates", en: "Choose Your Dates", ar: "اختر تواريخك", de: "Wählen Sie Ihre Termine", nl: "Kies uw data"
  },
  "booking.step1.desc": {
    fr: "Sélectionnez la période de location sur notre calendrier interactif. Vérifiez la disponibilité en temps réel.",
    en: "Select your rental period on our interactive calendar. Check availability in real-time.",
    ar: "حدد فترة الإيجار على تقويمنا التفاعلي. تحقق من التوفر في الوقت الفعلي.",
    de: "Wählen Sie Ihren Mietzeitraum in unserem interaktiven Kalender. Verfügbarkeit in Echtzeit prüfen.",
    nl: "Selecteer uw huurperiode op onze interactieve kalender. Controleer beschikbaarheid in realtime."
  },
  "booking.step2.title": {
    fr: "Check-in Express", en: "Express Check-in", ar: "تسجيل سريع", de: "Express Check-in", nl: "Express Check-in"
  },
  "booking.step2.desc": {
    fr: "Uploadez votre permis de conduire et passeport/CIN. Votre contrat sera pré-rempli à votre arrivée.",
    en: "Upload your driver's license and passport/ID. Your contract will be pre-filled on arrival.",
    ar: "قم بتحميل رخصة القيادة وجواز السفر/بطاقة الهوية. سيتم ملء عقدك مسبقاً عند وصولك.",
    de: "Laden Sie Ihren Führerschein und Reisepass/Ausweis hoch. Ihr Vertrag wird bei Ankunft vorausgefüllt.",
    nl: "Upload uw rijbewijs en paspoort/ID. Uw contract wordt bij aankomst vooraf ingevuld."
  },
  "booking.step3.title": {
    fr: "Récupérez les clés", en: "Get Your Keys", ar: "استلم المفاتيح", de: "Schlüssel abholen", nl: "Haal uw sleutels op"
  },
  "booking.step3.desc": {
    fr: "Zéro attente. Votre véhicule propre et assuré vous attend. Signez et partez.",
    en: "Zero waiting. Your clean and insured vehicle is ready. Sign and go.",
    ar: "بدون انتظار. سيارتك النظيفة والمؤمنة جاهزة. وقّع وانطلق.",
    de: "Keine Wartezeit. Ihr sauberes und versichertes Fahrzeug wartet. Unterschreiben und losfahren.",
    nl: "Geen wachttijd. Uw schone en verzekerde voertuig staat klaar. Tekenen en vertrekken."
  },

  // Footer
  "footer.tagline": {
    fr: "Location premium à Marrakech. L'expérience Starlight, accessible à tous.",
    en: "Premium rental in Marrakech. The Starlight experience, accessible to all.",
    ar: "تأجير فاخر في مراكش. تجربة ستارلايت، في متناول الجميع.",
    de: "Premium-Vermietung in Marrakesch. Das Starlight-Erlebnis, für alle zugänglich.",
    nl: "Premium verhuur in Marrakech. De Starlight-ervaring, toegankelijk voor iedereen."
  },
  "footer.links": {
    fr: "Liens rapides", en: "Quick Links", ar: "روابط سريعة", de: "Schnelllinks", nl: "Snelkoppelingen"
  },
  "footer.contact": {
    fr: "Contact", en: "Contact", ar: "اتصل بنا", de: "Kontakt", nl: "Contact"
  },
  "footer.legal": {
    fr: "Mentions légales", en: "Legal Notice", ar: "إشعار قانوني", de: "Impressum", nl: "Juridische kennisgeving"
  },
  "footer.privacy": {
    fr: "Politique de confidentialité", en: "Privacy Policy", ar: "سياسة الخصوصية", de: "Datenschutz", nl: "Privacybeleid"
  },
  "footer.terms": {
    fr: "Conditions générales", en: "Terms & Conditions", ar: "الشروط والأحكام", de: "AGB", nl: "Algemene voorwaarden"
  },
  "footer.rights": {
    fr: "Tous droits réservés.", en: "All rights reserved.", ar: "جميع الحقوق محفوظة.", de: "Alle Rechte vorbehalten.", nl: "Alle rechten voorbehouden."
  },
  "footer.whatsapp": {
    fr: "Nous contacter sur WhatsApp", en: "Contact us on WhatsApp", ar: "تواصل معنا عبر واتساب", de: "Kontaktieren Sie uns auf WhatsApp", nl: "Neem contact op via WhatsApp"
  },

  // Check-in Express
  "checkin.title": {
    fr: "Check-in Express", en: "Express Check-in", ar: "تسجيل سريع", de: "Express Check-in", nl: "Express Check-in"
  },
  "checkin.desc": {
    fr: "Gagnez du temps en pré-enregistrant vos documents. Récupérez votre véhicule sans attente.",
    en: "Save time by pre-registering your documents. Pick up your vehicle with zero wait.",
    ar: "وفر الوقت بتسجيل مستنداتك مسبقاً. استلم سيارتك بدون انتظار.",
    de: "Sparen Sie Zeit durch Vorab-Registrierung Ihrer Dokumente. Holen Sie Ihr Fahrzeug ohne Wartezeit ab.",
    nl: "Bespaar tijd door uw documenten vooraf te registreren. Haal uw voertuig op zonder wachttijd."
  },
  "checkin.name": {
    fr: "Nom complet", en: "Full Name", ar: "الاسم الكامل", de: "Vollständiger Name", nl: "Volledige naam"
  },
  "checkin.email": {
    fr: "Email", en: "Email", ar: "البريد الإلكتروني", de: "E-Mail", nl: "E-mail"
  },
  "checkin.phone": {
    fr: "Téléphone", en: "Phone", ar: "الهاتف", de: "Telefon", nl: "Telefoon"
  },
  "checkin.license": {
    fr: "Photo du permis de conduire", en: "Driver's License Photo", ar: "صورة رخصة القيادة", de: "Führerscheinfoto", nl: "Foto rijbewijs"
  },
  "checkin.id": {
    fr: "Passeport ou CIN", en: "Passport or ID", ar: "جواز السفر أو بطاقة الهوية", de: "Reisepass oder Ausweis", nl: "Paspoort of ID"
  },
  "checkin.upload": {
    fr: "Cliquez pour uploader", en: "Click to upload", ar: "انقر للتحميل", de: "Klicken zum Hochladen", nl: "Klik om te uploaden"
  },
  "checkin.submit": {
    fr: "Envoyer mes documents", en: "Submit My Documents", ar: "إرسال مستنداتي", de: "Dokumente einreichen", nl: "Mijn documenten indienen"
  },
  "checkin.success": {
    fr: "Documents envoyés ! Nous vous contacterons sous 24h.",
    en: "Documents sent! We'll contact you within 24h.",
    ar: "تم إرسال المستندات! سنتواصل معك خلال 24 ساعة.",
    de: "Dokumente gesendet! Wir kontaktieren Sie innerhalb von 24 Stunden.",
    nl: "Documenten verzonden! We nemen binnen 24 uur contact met u op."
  },

  // Booking modal
  "modal.title": {
    fr: "Réserver ce véhicule", en: "Book This Vehicle", ar: "احجز هذه السيارة", de: "Dieses Fahrzeug buchen", nl: "Dit voertuig boeken"
  },
  "modal.start": {
    fr: "Date de début", en: "Start Date", ar: "تاريخ البداية", de: "Startdatum", nl: "Startdatum"
  },
  "modal.end": {
    fr: "Date de fin", en: "End Date", ar: "تاريخ النهاية", de: "Enddatum", nl: "Einddatum"
  },
  "modal.confirm": {
    fr: "Confirmer la réservation", en: "Confirm Booking", ar: "تأكيد الحجز", de: "Buchung bestätigen", nl: "Reservering bevestigen"
  },
  "modal.whatsapp": {
    fr: "Finaliser sur WhatsApp", en: "Finalize on WhatsApp", ar: "إنهاء عبر واتساب", de: "Auf WhatsApp abschließen", nl: "Afronden op WhatsApp"
  },

  // Categories
  "cat.starlight": {
    fr: "Gamme Starlight", en: "Starlight Range", ar: "مجموعة ستارلايت", de: "Starlight-Reihe", nl: "Starlight-reeks"
  },
  "cat.essential": {
    fr: "Gamme Essentiel", en: "Essential Range", ar: "المجموعة الأساسية", de: "Essential-Reihe", nl: "Essential-reeks"
  },
  "cat.adrenaline": {
    fr: "Gamme Adrénaline", en: "Adrenaline Range", ar: "مجموعة الأدرينالين", de: "Adrenalin-Reihe", nl: "Adrenaline-reeks"
  },
};

// RTL languages
const RTL_LANGUAGES: Language[] = ["ar"];

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("fr");
  const isRTL = RTL_LANGUAGES.includes(language);

  // Apply RTL direction to document
  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const t = (key: string): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
