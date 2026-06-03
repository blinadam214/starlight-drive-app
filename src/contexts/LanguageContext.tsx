import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "fr" | "en" | "ar" | "es" | "it" | "de" | "nl";

type TranslationEntry = { fr: string; en: string; ar: string; es: string; it: string; de: string; nl: string };
type Translations = { [key: string]: TranslationEntry };

export const translations: Translations = {
  // Header
  "nav.fleet": {
    fr: "La Flotte", en: "Fleet", ar: "الأسطول", es: "Flota", it: "Flotta", de: "Flotte", nl: "Vloot"
  },
  "nav.concept": {
    fr: "Le Concept", en: "Concept", ar: "المفهوم", es: "Concepto", it: "Concetto", de: "Konzept", nl: "Concept"
  },
  "nav.booking": {
    fr: "Réservation", en: "Booking", ar: "الحجز", es: "Reserva", it: "Prenotazione", de: "Buchung", nl: "Reservering"
  },
  "nav.checkin": {
    fr: "Enregistrement Express", en: "Express Registration", ar: "تسجيل سريع", es: "Registro Express", it: "Registrazione Express", de: "Express-Registrierung", nl: "Express Registratie"
  },

  // Hero
  "hero.tagline": {
    fr: "Location Premium à Marrakech", en: "Premium Rental in Marrakech", ar: "تأجير فاخر في مراكش", es: "Alquiler Premium en Marrakech", it: "Noleggio Premium a Marrakech", de: "Premium-Vermietung in Marrakesch", nl: "Premium verhuur in Marrakech"
  },
  "hero.title1": {
    fr: "KECH NIGHT DRIVE", en: "KECH NIGHT DRIVE", ar: "KECH NIGHT DRIVE", es: "KECH NIGHT DRIVE", it: "KECH NIGHT DRIVE", de: "KECH NIGHT DRIVE", nl: "KECH NIGHT DRIVE"
  },
  "hero.slogan": {
    fr: "Prenez le volant de vos nuits.", en: "Take the wheel of your nights.", ar: "خُذ مِقوَد ليالِيك.", es: "Toma el volante de tus noches.", it: "Prendi il volante delle tue notti.", de: "Übernimm das Steuer deiner Nächte.", nl: "Neem het stuur van je nachten."
  },
  "hero.subtitle": {
    fr: "Découvrez la première agence de location « Expérience Sur-Mesure » à Marrakech. Des citadines et deux-roues transformés en véhicules premium (Ciel étoilé Starlight & LED d'ambiance). Le luxe nocturne, enfin accessible.",
    en: "Discover the first 'Custom Experience' rental agency in Marrakech. City cars and motorcycles transformed into premium vehicles (Starlight ceiling & ambient LED). Nighttime luxury, finally accessible.",
    ar: "اكتشف أول وكالة تأجير « Custom Experience » في مراكش. سيارات مدنية ودراجات نارية محوّلة إلى مركبات فاخرة (سقف نجمي Starlight وإضاءة LED). الفخامة الليلية، أخيراً في متناول الجميع.",
    es: "Descubre la primera agencia de alquiler 'Custom Experience' en Marrakech. Utilitarios y motos transformados en vehículos premium (Cielo estrellado Starlight y LED ambiental). El lujo nocturno, al fin accesible.",
    it: "Scopri la prima agenzia di noleggio « Custom Experience » a Marrakech. City car e moto trasformate in veicoli premium (Cielo stellato Starlight e LED ambientale). Il lusso notturno, finalmente accessibile.",
    de: "Entdecken Sie die erste « Custom Experience »-Vermietungsagentur in Marrakesch. Stadtautos und Motorräder, verwandelt in Premium-Fahrzeuge (Sternenhimmel Starlight & LED-Ambiente). Nächtlicher Luxus, endlich erschwinglich.",
    nl: "Ontdek het eerste 'Custom Experience'-verhuurbedrijf in Marrakech. Stadsauto's en motoren omgebouwd tot premiumvoertuigen (Starlight sterrenhemel & LED-sfeer). Nachtelijk luxe, eindelijk bereikbaar."
  },
  "hero.cta": {
    fr: "Découvrir la flotte", en: "Explore the Fleet", ar: "استكشف الأسطول", es: "Explorar la flota", it: "Esplora la flotta", de: "Flotte entdecken", nl: "Ontdek de vloot"
  },
  "hero.cta2": {
    fr: "Réserver maintenant", en: "Book Now", ar: "احجز الآن", es: "Reservar ahora", it: "Prenota ora", de: "Jetzt buchen", nl: "Nu boeken"
  },

  // Innovation
  "innovation.badge": {
    fr: "L'innovation Kech Night Drive", en: "The Kech Night Drive Innovation", ar: "ابتكار Kech Night Drive", es: "La innovación Kech Night Drive", it: "L'innovazione Kech Night Drive", de: "Die Kech Night Drive Innovation", nl: "De Kech Night Drive innovatie"
  },
  "innovation.title": {
    fr: "L'expérience Starlight", en: "The Starlight Experience", ar: "تجربة ستارلايت", es: "La experiencia Starlight", it: "L'esperienza Starlight", de: "Das Starlight-Erlebnis", nl: "De Starlight-ervaring"
  },
  "innovation.subtitle": {
    fr: "Ne louez pas seulement un véhicule, louez une atmosphère. Nos habitacles sont équipés de ciels étoilés et d'éclairages d'ambiance sur-mesure pour maîtriser la nuit marrakchie.",
    en: "Don't just rent a vehicle, rent an atmosphere. Our cabins are equipped with starlight ceilings and custom ambient lighting to own the Marrakech night.",
    ar: "لا تستأجر مجرد سيارة، استأجر أجواء. مقصوراتنا مجهزة بسقوف نجمية وإضاءة محيطية مخصصة لتملك ليل مراكش.",
    es: "No alquiles solo un vehículo, alquila una atmósfera. Nuestros habitáculos están equipados con cielos estrellados e iluminación ambiental personalizada.",
    it: "Non noleggiare solo un veicolo, noleggia un'atmosfera. I nostri abitacoli sono dotati di cielo stellato e illuminazione ambientale su misura.",
    de: "Mieten Sie nicht nur ein Fahrzeug, mieten Sie eine Atmosphäre. Unsere Fahrgastzellen sind mit Sternenhimmel und maßgeschneiderter Ambientebeleuchtung ausgestattet.",
    nl: "Huur niet alleen een voertuig, huur een sfeer. Onze cabines zijn uitgerust met sterrenhemel en op maat gemaakte sfeerverlichting."
  },
  "innovation.feat1.title": {
    fr: "Ciel Étoilé", en: "Starlight Ceiling", ar: "سقف نجمي", es: "Cielo Estrellado", it: "Cielo Stellato", de: "Sternenhimmel", nl: "Sterrenhemel"
  },
  "innovation.feat1.desc": {
    fr: "Des centaines de fibres optiques transforment le plafond en voûte céleste.",
    en: "Hundreds of fiber optics transform the ceiling into a celestial vault.",
    ar: "مئات الألياف الضوئية تحول السقف إلى قبة سماوية.",
    es: "Cientos de fibras ópticas transforman el techo en una bóveda celeste.",
    it: "Centinaia di fibre ottiche trasformano il soffitto in una volta celeste.",
    de: "Hunderte Glasfasern verwandeln die Decke in ein Himmelsgewölbe.",
    nl: "Honderden glasvezels transformeren het plafond in een hemelgewelf."
  },
  "innovation.feat2.title": {
    fr: "Jeunes Permis Acceptés", en: "Young Drivers Welcome", ar: "رخص جديدة مقبولة", es: "Jóvenes Conductores", it: "Neopatentati Benvenuti", de: "Fahranfänger willkommen", nl: "Jonge rijbewijzen welkom"
  },
  "innovation.feat2.desc": {
    fr: "Contrairement aux agences traditionnelles, nous faisons confiance aux jeunes conducteurs. Véhicule suréquipé et esthétique VIP au même tarif, sans restrictions d'âge abusives.",
    en: "Unlike traditional agencies, we trust young drivers. Premium equipped vehicles and VIP aesthetics at the same rate, no abusive age restrictions.",
    ar: "على عكس الوكالات التقليدية، نثق بالسائقين الشباب. مركبات مجهزة بالكامل وجمالية VIP بنفس السعر، بدون قيود عمرية مبالغة.",
    es: "A diferencia de las agencias tradicionales, confiamos en los jóvenes conductores. Vehículo sobreequipado y estética VIP al mismo precio, sin restricciones de edad abusivas.",
    it: "A differenza delle agenzie tradizionali, ci fidiamo dei giovani conducenti. Veicoli super equipaggiati e estetica VIP alla stessa tariffa, senza restrizioni d'età eccessive.",
    de: "Anders als traditionelle Agenturen vertrauen wir jungen Fahrern. Voll ausgestattete Fahrzeuge und VIP-Ästhetik zum gleichen Tarif, ohne übermäßige Altersbeschränkungen.",
    nl: "In tegenstelling tot traditionele bureaus vertrouwen wij jonge bestuurders. Volledig uitgerust voertuig en VIP-esthetiek voor hetzelfde tarief, zonder buitensporige leeftijdsbeperkingen."
  },
  "innovation.feat3.title": {
    fr: "Livraison VIP Aéroport", en: "VIP Airport Delivery", ar: "توصيل VIP للمطار", es: "Entrega VIP Aeropuerto", it: "Consegna VIP Aeroporto", de: "VIP Flughafen-Lieferung", nl: "VIP Luchthaven Bezorging"
  },
  "innovation.feat3.desc": {
    fr: "Votre véhicule vous attend dès votre sortie de l'aéroport Marrakech-Menara ou directement à votre hôtel/villa. Enregistrement express garanti.",
    en: "Your vehicle awaits you at the exit of Marrakech-Menara airport or directly at your hotel/villa. Express check-in guaranteed.",
    ar: "سيارتك بانتظارك عند خروجك من مطار مراكش المنارة أو مباشرة في فندقك/فيلتك. تسجيل سريع مضمون.",
    es: "Tu vehículo te espera a la salida del aeropuerto Marrakech-Menara o directamente en tu hotel/villa. Check-in express garantizado.",
    it: "Il tuo veicolo ti attende all'uscita dell'aeroporto di Marrakech-Menara o direttamente al tuo hotel/villa. Check-in express garantito.",
    de: "Ihr Fahrzeug wartet am Ausgang des Flughafens Marrakesch-Menara oder direkt an Ihrem Hotel/Villa. Express Check-in garantiert.",
    nl: "Uw voertuig wacht op u bij de uitgang van Marrakech-Menara luchthaven of direct bij uw hotel/villa. Express check-in gegarandeerd."
  },
  "innovation.feat4.title": {
    fr: "Fiabilité & Discrétion", en: "Reliability & Discretion", ar: "موثوقية وسرية", es: "Fiabilidad y Discreción", it: "Affidabilità e Discrezione", de: "Zuverlässigkeit & Diskretion", nl: "Betrouwbaarheid & Discretie"
  },
  "innovation.feat4.desc": {
    fr: "Flotte 100% neuve, assistance 7j/7 et véhicules livrés dans un état de propreté clinique.",
    en: "100% new fleet, 24/7 assistance and vehicles delivered in clinical cleanliness.",
    ar: "أسطول جديد 100%، مساعدة 7/7 ومركبات تُسلّم بنظافة سريرية.",
    es: "Flota 100% nueva, asistencia 7/7 y vehículos entregados en estado de limpieza clínica.",
    it: "Flotta 100% nuova, assistenza 7/7 e veicoli consegnati in condizioni di pulizia clinica.",
    de: "100% neue Flotte, 7/7-Assistance und Fahrzeuge in klinischer Sauberkeit geliefert.",
    nl: "100% nieuw wagenpark, 7/7 assistentie en voertuigen geleverd in klinische netheid."
  },

  // Fleet
  "fleet.badge": {
    fr: "Notre flotte", en: "Our Fleet", ar: "أسطولنا", es: "Nuestra flota", it: "La nostra flotta", de: "Unsere Flotte", nl: "Onze vloot"
  },
  "fleet.title": {
    fr: "Choisissez votre style", en: "Choose Your Style", ar: "اختر أسلوبك", es: "Elige tu estilo", it: "Scegli il tuo stile", de: "Wählen Sie Ihren Stil", nl: "Kies uw stijl"
  },
  "fleet.subtitle": {
    fr: "De l'innovation au frisson, trouvez le véhicule qui correspond à votre aventure à Marrakech.",
    en: "From innovation to thrill, find the vehicle that matches your Marrakech adventure.",
    ar: "من الابتكار إلى الإثارة، اعثر على السيارة التي تناسب مغامرتك في مراكش.",
    es: "De la innovación a la emoción, encuentra el vehículo que corresponda a tu aventura en Marrakech.",
    it: "Dall'innovazione al brivido, trova il veicolo che corrisponde alla tua avventura a Marrakech.",
    de: "Von Innovation bis Nervenkitzel – finden Sie das Fahrzeug für Ihr Marrakesch-Abenteuer.",
    nl: "Van innovatie tot sensatie, vind het voertuig dat past bij uw Marrakech-avontuur."
  },
  "fleet.from": {
    fr: "À partir de", en: "From", ar: "ابتداءً من", es: "Desde", it: "A partire da", de: "Ab", nl: "Vanaf"
  },
  "fleet.perday": {
    fr: "/jour", en: "/day", ar: "/يوم", es: "/día", it: "/giorno", de: "/Tag", nl: "/dag"
  },
  "fleet.book": {
    fr: "Réserver", en: "Book Now", ar: "احجز الآن", es: "Reservar", it: "Prenota", de: "Buchen", nl: "Boeken"
  },
  "fleet.dates": {
    fr: "Vérifier les dates", en: "Check Dates", ar: "تحقق من التواريخ", es: "Verificar fechas", it: "Verifica date", de: "Termine prüfen", nl: "Data controleren"
  },

  // Vehicles
  "vehicle.clio.name": {
    fr: "Renault Clio 5 — Starlight", en: "Renault Clio 5 — Starlight", ar: "رينو كليو 5 — ستارلايت", es: "Renault Clio 5 — Starlight", it: "Renault Clio 5 — Starlight", de: "Renault Clio 5 — Starlight", nl: "Renault Clio 5 — Starlight"
  },
  "vehicle.clio.desc": {
    fr: "Ciel étoilé • LED Ambiance • Climatisation • Bluetooth",
    en: "Starlight ceiling • LED Ambiance • A/C • Bluetooth",
    ar: "سقف نجمي • أجواء LED • تكييف • بلوتوث",
    es: "Cielo estrellado • LED Ambiente • Aire acondicionado • Bluetooth",
    it: "Cielo stellato • LED Ambiente • Climatizzazione • Bluetooth",
    de: "Sternenhimmel • LED-Ambiente • Klimaanlage • Bluetooth",
    nl: "Sterrenhemel • LED-sfeer • Airco • Bluetooth"
  },
  "vehicle.208.name": {
    fr: "Peugeot 208 — Starlight", en: "Peugeot 208 — Starlight", ar: "بيجو 208 — ستارلايت", es: "Peugeot 208 — Starlight", it: "Peugeot 208 — Starlight", de: "Peugeot 208 — Starlight", nl: "Peugeot 208 — Starlight"
  },
  "vehicle.208.desc": {
    fr: "Ciel étoilé • LED Ambiance • Écran tactile • Caméra de recul",
    en: "Starlight ceiling • LED Ambiance • Touchscreen • Rear camera",
    ar: "سقف نجمي • أجواء LED • شاشة لمس • كاميرا خلفية",
    es: "Cielo estrellado • LED Ambiente • Pantalla táctil • Cámara trasera",
    it: "Cielo stellato • LED Ambiente • Touchscreen • Telecamera posteriore",
    de: "Sternenhimmel • LED-Ambiente • Touchscreen • Rückfahrkamera",
    nl: "Sterrenhemel • LED-sfeer • Touchscreen • Achteruitrijcamera"
  },
  "vehicle.logan.name": {
    fr: "Dacia Logan — Essentiel", en: "Dacia Logan — Essential", ar: "داسيا لوغان — أساسي", es: "Dacia Logan — Esencial", it: "Dacia Logan — Essential", de: "Dacia Logan — Essential", nl: "Dacia Logan — Essential"
  },
  "vehicle.logan.desc": {
    fr: "Climatisation • Spacieuse • Économique • GPS disponible",
    en: "A/C • Spacious • Economical • GPS available",
    ar: "تكييف • واسعة • اقتصادية • GPS متاح",
    es: "Aire acondicionado • Espacioso • Económico • GPS disponible",
    it: "Climatizzazione • Spazioso • Economico • GPS disponibile",
    de: "Klimaanlage • Geräumig • Wirtschaftlich • GPS verfügbar",
    nl: "Airco • Ruim • Zuinig • GPS beschikbaar"
  },
  "vehicle.tmax.name": {
    fr: "Yamaha TMAX 560", en: "Yamaha TMAX 560", ar: "ياماها TMAX 560", es: "Yamaha TMAX 560", it: "Yamaha TMAX 560", de: "Yamaha TMAX 560", nl: "Yamaha TMAX 560"
  },
  "vehicle.tmax.desc": {
    fr: "560cc • Automatique • Confort premium • Permis A requis",
    en: "560cc • Automatic • Premium comfort • License A required",
    ar: "560 سي سي • أوتوماتيك • راحة فاخرة • رخصة A مطلوبة",
    es: "560cc • Automático • Confort premium • Permiso A requerido",
    it: "560cc • Automatico • Comfort premium • Patente A richiesta",
    de: "560cc • Automatik • Premium-Komfort • Führerschein A erforderlich",
    nl: "560cc • Automatisch • Premium comfort • Rijbewijs A vereist"
  },
  "vehicle.tracer.name": {
    fr: "Yamaha Tracer 900", en: "Yamaha Tracer 900", ar: "ياماها تريسر 900", es: "Yamaha Tracer 900", it: "Yamaha Tracer 900", de: "Yamaha Tracer 900", nl: "Yamaha Tracer 900"
  },
  "vehicle.tracer.desc": {
    fr: "900cc • Sport-touring • Puissante • Permis A requis",
    en: "900cc • Sport-touring • Powerful • License A required",
    ar: "900 سي سي • سبورت-تورينغ • قوية • رخصة A مطلوبة",
    es: "900cc • Sport-touring • Potente • Permiso A requerido",
    it: "900cc • Sport-touring • Potente • Patente A richiesta",
    de: "900cc • Sport-Touring • Leistungsstark • Führerschein A erforderlich",
    nl: "900cc • Sport-touring • Krachtig • Rijbewijs A vereist"
  },

  // Booking
  "booking.badge": {
    fr: "Réservation simplifiée", en: "Simplified Booking", ar: "حجز مبسط", es: "Reserva simplificada", it: "Prenotazione semplificata", de: "Vereinfachte Buchung", nl: "Vereenvoudigd boeken"
  },
  "booking.title": {
    fr: "Réservez en 3 étapes", en: "Book in 3 Steps", ar: "احجز في 3 خطوات", es: "Reserva en 3 pasos", it: "Prenota in 3 passaggi", de: "Buchen in 3 Schritten", nl: "Boek in 3 stappen"
  },
  "booking.subtitle": {
    fr: "Notre processus Fast-Track élimine toute attente. Recevez vos clés instantanément.",
    en: "Our Fast-Track process eliminates all waiting. Get your keys instantly.",
    ar: "عمليتنا السريعة تزيل كل الانتظار. استلم مفاتيحك فوراً.",
    es: "Nuestro proceso Fast-Track elimina toda espera. Recibe tus llaves al instante.",
    it: "Il nostro processo Fast-Track elimina ogni attesa. Ricevi le chiavi all'istante.",
    de: "Unser Fast-Track-Prozess eliminiert jede Wartezeit. Erhalten Sie Ihre Schlüssel sofort.",
    nl: "Ons Fast-Track-proces elimineert alle wachttijd. Ontvang uw sleutels direct."
  },
  "booking.step1.title": {
    fr: "Planifiez votre séjour", en: "Plan Your Stay", ar: "اختر تواريخك", es: "Elige tus fechas", it: "Scegli le tue date", de: "Wählen Sie Ihre Termine", nl: "Kies uw data"
  },
  "booking.step1.desc": {
    fr: "Indiquez vos dates de location sur le site, puis basculez sur WhatsApp pour confirmer la disponibilité de votre véhicule en un clic.",
    en: "Select your rental period on our interactive calendar. Check availability in real-time.",
    ar: "حدد فترة الإيجار على تقويمنا التفاعلي. تحقق من التوفر في الوقت الفعلي.",
    es: "Selecciona el período de alquiler en nuestro calendario interactivo. Verifica la disponibilidad en tiempo real.",
    it: "Seleziona il periodo di noleggio sul nostro calendario interattivo. Verifica la disponibilità in tempo reale.",
    de: "Wählen Sie Ihren Mietzeitraum in unserem interaktiven Kalender. Verfügbarkeit in Echtzeit prüfen.",
    nl: "Selecteer uw huurperiode op onze interactieve kalender. Controleer beschikbaarheid in realtime."
  },
  "booking.step2.title": {
    fr: "Enregistrement Express", en: "Express Registration", ar: "تسجيل سريع", es: "Registro Express", it: "Registrazione Express", de: "Express-Registrierung", nl: "Express Registratie"
  },
  "booking.step2.desc": {
    fr: "Téléversez votre permis de conduire et passeport/CIN. Votre contrat sera pré-rempli à votre arrivée.",
    en: "Upload your driver's license and passport/ID. Your contract will be pre-filled on arrival.",
    ar: "قم بتحميل رخصة القيادة وجواز السفر/بطاقة الهوية. سيتم ملء عقدك مسبقاً عند وصولك.",
    es: "Sube tu licencia de conducir y pasaporte/DNI. Tu contrato estará prerrellenado a tu llegada.",
    it: "Carica la tua patente e passaporto/carta d'identità. Il tuo contratto sarà precompilato al tuo arrivo.",
    de: "Laden Sie Ihren Führerschein und Reisepass/Ausweis hoch. Ihr Vertrag wird bei Ankunft vorausgefüllt.",
    nl: "Upload uw rijbewijs en paspoort/ID. Uw contract wordt bij aankomst vooraf ingevuld."
  },
  "booking.step3.title": {
    fr: "Récupérez les clés", en: "Get Your Keys", ar: "استلم المفاتيح", es: "Recoge las llaves", it: "Ritira le chiavi", de: "Schlüssel abholen", nl: "Haal uw sleutels op"
  },
  "booking.step3.desc": {
    fr: "Zéro attente. Votre véhicule propre et assuré vous attend. Signez et partez.",
    en: "Zero waiting. Your clean and insured vehicle is ready. Sign and go.",
    ar: "بدون انتظار. سيارتك النظيفة والمؤمنة جاهزة. وقّع وانطلق.",
    es: "Cero espera. Tu vehículo limpio y asegurado te espera. Firma y vete.",
    it: "Zero attesa. Il tuo veicolo pulito e assicurato ti aspetta. Firma e parti.",
    de: "Keine Wartezeit. Ihr sauberes und versichertes Fahrzeug wartet. Unterschreiben und losfahren.",
    nl: "Geen wachttijd. Uw schone en verzekerde voertuig staat klaar. Tekenen en vertrekken."
  },

  // Footer
  "footer.tagline": {
    fr: "Kech Night Drive — Location premium à Marrakech. L'expérience Starlight, accessible à tous.",
    en: "Kech Night Drive — Premium rental in Marrakech. The Starlight experience, accessible to all.",
    ar: "Kech Night Drive — تأجير فاخر في مراكش. تجربة ستارلايت، في متناول الجميع.",
    es: "Kech Night Drive — Alquiler premium en Marrakech. La experiencia Starlight, accesible para todos.",
    it: "Kech Night Drive — Noleggio premium a Marrakech. L'esperienza Starlight, accessibile a tutti.",
    de: "Kech Night Drive — Premium-Vermietung in Marrakesch. Das Starlight-Erlebnis, für alle zugänglich.",
    nl: "Kech Night Drive — Premium verhuur in Marrakech. De Starlight-ervaring, toegankelijk voor iedereen."
  },
  "footer.links": {
    fr: "Liens rapides", en: "Quick Links", ar: "روابط سريعة", es: "Enlaces rápidos", it: "Link rapidi", de: "Schnelllinks", nl: "Snelkoppelingen"
  },
  "footer.contact": {
    fr: "Contact", en: "Contact", ar: "اتصل بنا", es: "Contacto", it: "Contatto", de: "Kontakt", nl: "Contact"
  },
  "footer.legal": {
    fr: "Mentions légales", en: "Legal Notice", ar: "إشعار قانوني", es: "Aviso legal", it: "Note legali", de: "Impressum", nl: "Juridische kennisgeving"
  },
  "footer.privacy": {
    fr: "Politique de confidentialité", en: "Privacy Policy", ar: "سياسة الخصوصية", es: "Política de privacidad", it: "Informativa sulla privacy", de: "Datenschutz", nl: "Privacybeleid"
  },
  "footer.terms": {
    fr: "Conditions générales", en: "Terms & Conditions", ar: "الشروط والأحكام", es: "Términos y condiciones", it: "Termini e condizioni", de: "AGB", nl: "Algemene voorwaarden"
  },
  "footer.rights": {
    fr: "Tous droits réservés.", en: "All rights reserved.", ar: "جميع الحقوق محفوظة.", es: "Todos los derechos reservados.", it: "Tutti i diritti riservati.", de: "Alle Rechte vorbehalten.", nl: "Alle rechten voorbehouden."
  },
  "footer.whatsapp": {
    fr: "Nous contacter sur WhatsApp", en: "Contact us on WhatsApp", ar: "تواصل معنا عبر واتساب", es: "Contáctanos por WhatsApp", it: "Contattaci su WhatsApp", de: "Kontaktieren Sie uns auf WhatsApp", nl: "Neem contact op via WhatsApp"
  },

  // Check-in Express
  "checkin.title": {
    fr: "Enregistrement Express", en: "Express Registration", ar: "تسجيل سريع", es: "Registro Express", it: "Registrazione Express", de: "Express-Registrierung", nl: "Express Registratie"
  },
  "checkin.desc": {
    fr: "Gagnez du temps en pré-enregistrant vos documents. Récupérez votre véhicule sans attente.",
    en: "Save time by pre-registering your documents. Pick up your vehicle with zero wait.",
    ar: "وفر الوقت بتسجيل مستنداتك مسبقاً. استلم سيارتك بدون انتظار.",
    es: "Ahorra tiempo pre-registrando tus documentos. Recoge tu vehículo sin esperar.",
    it: "Risparmia tempo pre-registrando i tuoi documenti. Ritira il tuo veicolo senza attese.",
    de: "Sparen Sie Zeit durch Vorab-Registrierung Ihrer Dokumente. Holen Sie Ihr Fahrzeug ohne Wartezeit ab.",
    nl: "Bespaar tijd door uw documenten vooraf te registreren. Haal uw voertuig op zonder wachttijd."
  },
  "checkin.name": {
    fr: "Nom complet", en: "Full Name", ar: "الاسم الكامل", es: "Nombre completo", it: "Nome completo", de: "Vollständiger Name", nl: "Volledige naam"
  },
  "checkin.email": {
    fr: "Email", en: "Email", ar: "البريد الإلكتروني", es: "Email", it: "Email", de: "E-Mail", nl: "E-mail"
  },
  "checkin.phone": {
    fr: "Téléphone", en: "Phone", ar: "الهاتف", es: "Teléfono", it: "Telefono", de: "Telefon", nl: "Telefoon"
  },
  "checkin.license": {
    fr: "Photo du permis de conduire", en: "Driver's License Photo", ar: "صورة رخصة القيادة", es: "Foto del permiso de conducir", it: "Foto della patente", de: "Führerscheinfoto", nl: "Foto rijbewijs"
  },
  "checkin.id": {
    fr: "Passeport ou CIN", en: "Passport or ID", ar: "جواز السفر أو بطاقة الهوية", es: "Pasaporte o DNI", it: "Passaporto o carta d'identità", de: "Reisepass oder Ausweis", nl: "Paspoort of ID"
  },
  "checkin.upload": {
    fr: "Cliquez pour téléverser", en: "Click to upload", ar: "انقر للتحميل", es: "Haz clic para subir", it: "Clicca per caricare", de: "Klicken zum Hochladen", nl: "Klik om te uploaden"
  },
  "checkin.submit": {
    fr: "Envoyer mes documents", en: "Submit My Documents", ar: "إرسال مستنداتي", es: "Enviar mis documentos", it: "Invia i miei documenti", de: "Dokumente einreichen", nl: "Mijn documenten indienen"
  },
  "checkin.success": {
    fr: "Documents envoyés ! Nous vous contacterons sous 24h.",
    en: "Documents sent! We'll contact you within 24h.",
    ar: "تم إرسال المستندات! سنتواصل معك خلال 24 ساعة.",
    es: "¡Documentos enviados! Te contactaremos en 24h.",
    it: "Documenti inviati! Ti contatteremo entro 24 ore.",
    de: "Dokumente gesendet! Wir kontaktieren Sie innerhalb von 24 Stunden.",
    nl: "Documenten verzonden! We nemen binnen 24 uur contact met u op."
  },

  // Booking modal
  "modal.title": {
    fr: "Réserver ce véhicule", en: "Book This Vehicle", ar: "احجز هذه السيارة", es: "Reservar este vehículo", it: "Prenota questo veicolo", de: "Dieses Fahrzeug buchen", nl: "Dit voertuig boeken"
  },
  "modal.start": {
    fr: "Date de début", en: "Start Date", ar: "تاريخ البداية", es: "Fecha de inicio", it: "Data di inizio", de: "Startdatum", nl: "Startdatum"
  },
  "modal.end": {
    fr: "Date de fin", en: "End Date", ar: "تاريخ النهاية", es: "Fecha de fin", it: "Data di fine", de: "Enddatum", nl: "Einddatum"
  },
  "modal.confirm": {
    fr: "Confirmer la réservation", en: "Confirm Booking", ar: "تأكيد الحجز", es: "Confirmar reserva", it: "Conferma prenotazione", de: "Buchung bestätigen", nl: "Reservering bevestigen"
  },
  "modal.whatsapp": {
    fr: "Finaliser sur WhatsApp", en: "Finalize on WhatsApp", ar: "إنهاء عبر واتساب", es: "Finalizar en WhatsApp", it: "Finalizza su WhatsApp", de: "Auf WhatsApp abschließen", nl: "Afronden op WhatsApp"
  },

  // Categories
  "cat.starlight": {
    fr: "Gamme Starlight", en: "Starlight Range", ar: "مجموعة ستارلايت", es: "Gama Starlight", it: "Gamma Starlight", de: "Starlight-Reihe", nl: "Starlight-reeks"
  },
  "cat.essential": {
    fr: "Gamme Essentiel", en: "Essential Range", ar: "المجموعة الأساسية", es: "Gama Esencial", it: "Gamma Essential", de: "Essential-Reihe", nl: "Essential-reeks"
  },
  "cat.adrenaline": {
    fr: "Gamme Adrénaline", en: "Adrenaline Range", ar: "مجموعة الأدرينالين", es: "Gama Adrenalina", it: "Gamma Adrenalina", de: "Adrenalin-Reihe", nl: "Adrenaline-reeks"
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
