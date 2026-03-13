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
    fr: "Check-in Express", en: "Express Check-in", ar: "تسجيل سريع", es: "Check-in Express", it: "Check-in Express", de: "Express Check-in", nl: "Express Check-in"
  },

  // Hero
  "hero.tagline": {
    fr: "Location Premium à Marrakech", en: "Premium Rental in Marrakech", ar: "تأجير فاخر في مراكش", es: "Alquiler Premium en Marrakech", it: "Noleggio Premium a Marrakech", de: "Premium-Vermietung in Marrakesch", nl: "Premium verhuur in Marrakech"
  },
  "hero.title1": {
    fr: "MAÎTRISEZ LA NUIT.", en: "MASTER THE NIGHT.", ar: "سَيطِر على الليل.", es: "DOMINA LA NOCHE.", it: "DOMINA LA NOTTE.", de: "BEHERRSCHE DIE NACHT.", nl: "BEHEERS DE NACHT."
  },
  "hero.slogan": {
    fr: "Prenez le volant de vos nuits.", en: "Take the wheel of your nights.", ar: "خُذ مِقوَد ليالِيك.", es: "Toma el volante de tus noches.", it: "Prendi il volante delle tue notti.", de: "Übernimm das Steuer deiner Nächte.", nl: "Neem het stuur van je nachten."
  },
  "hero.subtitle": {
    fr: "Découvrez nos citadines transformées avec ciel étoilé et ambiance LED. Le luxe accessible, la nuit à Marrakech.",
    en: "Discover our city cars transformed with starlight ceilings and LED ambiance. Affordable luxury, Marrakech by night.",
    ar: "اكتشف سياراتنا المدنية المحولة بسقف نجمي وأجواء LED. الفخامة في متناول الجميع، مراكش ليلاً.",
    es: "Descubre nuestros coches urbanos transformados con techo estrellado y ambiente LED. Lujo accesible, Marrakech de noche.",
    it: "Scopri le nostre city car trasformate con cielo stellato e illuminazione LED. Lusso accessibile, Marrakech di notte.",
    de: "Entdecken Sie unsere Stadtautos mit Sternenhimmel und LED-Ambiente. Erschwinglicher Luxus, Marrakesch bei Nacht.",
    nl: "Ontdek onze stadsauto's met sterrenhemel en LED-sfeer. Betaalbare luxe, Marrakech bij nacht."
  },
  "hero.cta": {
    fr: "Découvrir la flotte", en: "Explore the Fleet", ar: "استكشف الأسطول", es: "Explorar la flota", it: "Esplora la flotta", de: "Flotte entdecken", nl: "Ontdek de vloot"
  },
  "hero.cta2": {
    fr: "Réserver maintenant", en: "Book Now", ar: "احجز الآن", es: "Reservar ahora", it: "Prenota ora", de: "Jetzt buchen", nl: "Nu boeken"
  },

  // Innovation
  "innovation.badge": {
    fr: "L'innovation B-LINE 26", en: "The B-LINE 26 Innovation", ar: "ابتكار B-LINE 26", es: "La innovación B-LINE 26", it: "L'innovazione B-LINE 26", de: "Die B-LINE 26 Innovation", nl: "De B-LINE 26 innovatie"
  },
  "innovation.title": {
    fr: "L'expérience Starlight", en: "The Starlight Experience", ar: "تجربة ستارلايت", es: "La experiencia Starlight", it: "L'esperienza Starlight", de: "Das Starlight-Erlebnis", nl: "De Starlight-ervaring"
  },
  "innovation.subtitle": {
    fr: "Des citadines ordinaires, une expérience extraordinaire. Nos Clio 5 et Peugeot 208 sont équipées de ciels étoilés et d'éclairages LED d'ambiance.",
    en: "Ordinary city cars, an extraordinary experience. Our Clio 5 and Peugeot 208 come equipped with starlight ceilings and LED ambient lighting.",
    ar: "سيارات مدنية عادية، تجربة استثنائية. سياراتنا Clio 5 و Peugeot 208 مجهزة بسقوف نجمية وإضاءة LED محيطية.",
    es: "Coches urbanos ordinarios, una experiencia extraordinaria. Nuestros Clio 5 y Peugeot 208 están equipados con techos estrellados e iluminación LED ambiental.",
    it: "City car ordinarie, un'esperienza straordinaria. Le nostre Clio 5 e Peugeot 208 sono dotate di cielo stellato e illuminazione LED ambientale.",
    de: "Gewöhnliche Stadtautos, ein außergewöhnliches Erlebnis. Unsere Clio 5 und Peugeot 208 sind mit Sternenhimmel und LED-Ambiente ausgestattet.",
    nl: "Gewone stadsauto's, een buitengewone ervaring. Onze Clio 5 en Peugeot 208 zijn uitgerust met sterrenhemel en LED-sfeerverlichting."
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
    fr: "Ambiance LED", en: "LED Ambiance", ar: "أجواء LED", es: "Ambiente LED", it: "Ambiente LED", de: "LED-Ambiente", nl: "LED-sfeer"
  },
  "innovation.feat2.desc": {
    fr: "Éclairage d'ambiance multicolore pour une atmosphère unique à chaque trajet.",
    en: "Multicolor ambient lighting for a unique atmosphere on every ride.",
    ar: "إضاءة محيطية متعددة الألوان لأجواء فريدة في كل رحلة.",
    es: "Iluminación ambiental multicolor para una atmósfera única en cada trayecto.",
    it: "Illuminazione ambientale multicolore per un'atmosfera unica ad ogni viaggio.",
    de: "Mehrfarbige Ambientebeleuchtung für eine einzigartige Atmosphäre bei jeder Fahrt.",
    nl: "Meerkleurige sfeerverlichting voor een unieke sfeer bij elke rit."
  },
  "innovation.feat3.title": {
    fr: "Luxe Abordable", en: "Affordable Luxury", ar: "فخامة بأسعار معقولة", es: "Lujo Asequible", it: "Lusso Accessibile", de: "Erschwinglicher Luxus", nl: "Betaalbare luxe"
  },
  "innovation.feat3.desc": {
    fr: "L'expérience VIP sans le prix VIP. Le confort premium au tarif citadine.",
    en: "The VIP experience without the VIP price. Premium comfort at city car rates.",
    ar: "تجربة VIP بدون سعر VIP. راحة فاخرة بأسعار السيارات المدنية.",
    es: "La experiencia VIP sin el precio VIP. Confort premium a precio de coche urbano.",
    it: "L'esperienza VIP senza il prezzo VIP. Comfort premium a tariffe da city car.",
    de: "Das VIP-Erlebnis ohne VIP-Preis. Premium-Komfort zum Stadtwagen-Tarif.",
    nl: "De VIP-ervaring zonder VIP-prijs. Premium comfort tegen stadsautotarieven."
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
    fr: "Choisissez vos dates", en: "Choose Your Dates", ar: "اختر تواريخك", es: "Elige tus fechas", it: "Scegli le tue date", de: "Wählen Sie Ihre Termine", nl: "Kies uw data"
  },
  "booking.step1.desc": {
    fr: "Sélectionnez la période de location sur notre calendrier interactif. Vérifiez la disponibilité en temps réel.",
    en: "Select your rental period on our interactive calendar. Check availability in real-time.",
    ar: "حدد فترة الإيجار على تقويمنا التفاعلي. تحقق من التوفر في الوقت الفعلي.",
    es: "Selecciona el período de alquiler en nuestro calendario interactivo. Verifica la disponibilidad en tiempo real.",
    it: "Seleziona il periodo di noleggio sul nostro calendario interattivo. Verifica la disponibilità in tempo reale.",
    de: "Wählen Sie Ihren Mietzeitraum in unserem interaktiven Kalender. Verfügbarkeit in Echtzeit prüfen.",
    nl: "Selecteer uw huurperiode op onze interactieve kalender. Controleer beschikbaarheid in realtime."
  },
  "booking.step2.title": {
    fr: "Check-in Express", en: "Express Check-in", ar: "تسجيل سريع", es: "Check-in Express", it: "Check-in Express", de: "Express Check-in", nl: "Express Check-in"
  },
  "booking.step2.desc": {
    fr: "Uploadez votre permis de conduire et passeport/CIN. Votre contrat sera pré-rempli à votre arrivée.",
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
    fr: "Location premium à Marrakech. L'expérience Starlight, accessible à tous.",
    en: "Premium rental in Marrakech. The Starlight experience, accessible to all.",
    ar: "تأجير فاخر في مراكش. تجربة ستارلايت، في متناول الجميع.",
    es: "Alquiler premium en Marrakech. La experiencia Starlight, accesible para todos.",
    it: "Noleggio premium a Marrakech. L'esperienza Starlight, accessibile a tutti.",
    de: "Premium-Vermietung in Marrakesch. Das Starlight-Erlebnis, für alle zugänglich.",
    nl: "Premium verhuur in Marrakech. De Starlight-ervaring, toegankelijk voor iedereen."
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
    fr: "Check-in Express", en: "Express Check-in", ar: "تسجيل سريع", es: "Check-in Express", it: "Check-in Express", de: "Express Check-in", nl: "Express Check-in"
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
    fr: "Cliquez pour uploader", en: "Click to upload", ar: "انقر للتحميل", es: "Haz clic para subir", it: "Clicca per caricare", de: "Klicken zum Hochladen", nl: "Klik om te uploaden"
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
