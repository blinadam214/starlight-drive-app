import React, { createContext, useContext, useState, ReactNode } from "react";

export type Language = "fr" | "en";

type Translations = {
  [key: string]: { fr: string; en: string };
};

export const translations: Translations = {
  // Header
  "nav.fleet": { fr: "La Flotte", en: "Fleet" },
  "nav.concept": { fr: "Le Concept", en: "Concept" },
  "nav.booking": { fr: "Réservation", en: "Booking" },
  "nav.checkin": { fr: "Check-in Express", en: "Express Check-in" },
  
  // Hero
  "hero.tagline": { fr: "Location Premium à Marrakech", en: "Premium Rental in Marrakech" },
  "hero.title1": { fr: "Conduisez sous", en: "Drive Under" },
  "hero.title2": { fr: "les étoiles", en: "the Stars" },
  "hero.subtitle": { 
    fr: "Découvrez nos citadines transformées avec ciel étoilé et ambiance LED. Le luxe accessible, la nuit à Marrakech.", 
    en: "Discover our city cars transformed with starlight ceilings and LED ambiance. Affordable luxury, Marrakech by night." 
  },
  "hero.cta": { fr: "Découvrir la flotte", en: "Explore the Fleet" },
  "hero.cta2": { fr: "Réserver maintenant", en: "Book Now" },

  // Innovation
  "innovation.badge": { fr: "L'innovation B-LINE 26", en: "The B-LINE 26 Innovation" },
  "innovation.title": { fr: "L'expérience Starlight", en: "The Starlight Experience" },
  "innovation.subtitle": { 
    fr: "Des citadines ordinaires, une expérience extraordinaire. Nos Clio 5 et Peugeot 208 sont équipées de ciels étoilés et d'éclairages LED d'ambiance.", 
    en: "Ordinary city cars, an extraordinary experience. Our Clio 5 and Peugeot 208 come equipped with starlight ceilings and LED ambient lighting." 
  },
  "innovation.feat1.title": { fr: "Ciel Étoilé", en: "Starlight Ceiling" },
  "innovation.feat1.desc": { fr: "Des centaines de fibres optiques transforment le plafond en voûte céleste.", en: "Hundreds of fiber optics transform the ceiling into a celestial vault." },
  "innovation.feat2.title": { fr: "Ambiance LED", en: "LED Ambiance" },
  "innovation.feat2.desc": { fr: "Éclairage d'ambiance multicolore pour une atmosphère unique à chaque trajet.", en: "Multicolor ambient lighting for a unique atmosphere on every ride." },
  "innovation.feat3.title": { fr: "Luxe Abordable", en: "Affordable Luxury" },
  "innovation.feat3.desc": { fr: "L'expérience VIP sans le prix VIP. Le confort premium au tarif citadine.", en: "The VIP experience without the VIP price. Premium comfort at city car rates." },

  // Fleet
  "fleet.badge": { fr: "Notre flotte", en: "Our Fleet" },
  "fleet.title": { fr: "Choisissez votre style", en: "Choose Your Style" },
  "fleet.subtitle": { fr: "De l'innovation au frisson, trouvez le véhicule qui correspond à votre aventure à Marrakech.", en: "From innovation to thrill, find the vehicle that matches your Marrakech adventure." },
  "fleet.from": { fr: "À partir de", en: "From" },
  "fleet.perday": { fr: "/jour", en: "/day" },
  "fleet.book": { fr: "Réserver", en: "Book Now" },
  "fleet.dates": { fr: "Vérifier les dates", en: "Check Dates" },
  
  // Vehicles
  "vehicle.clio.name": { fr: "Renault Clio 5 — Starlight", en: "Renault Clio 5 — Starlight" },
  "vehicle.clio.desc": { fr: "Ciel étoilé • LED Ambiance • Climatisation • Bluetooth", en: "Starlight ceiling • LED Ambiance • A/C • Bluetooth" },
  "vehicle.208.name": { fr: "Peugeot 208 — Starlight", en: "Peugeot 208 — Starlight" },
  "vehicle.208.desc": { fr: "Ciel étoilé • LED Ambiance • Écran tactile • Caméra de recul", en: "Starlight ceiling • LED Ambiance • Touchscreen • Rear camera" },
  "vehicle.logan.name": { fr: "Dacia Logan — Essentiel", en: "Dacia Logan — Essential" },
  "vehicle.logan.desc": { fr: "Climatisation • Spacieuse • Économique • GPS disponible", en: "A/C • Spacious • Economical • GPS available" },
  "vehicle.tmax.name": { fr: "Yamaha TMAX 560", en: "Yamaha TMAX 560" },
  "vehicle.tmax.desc": { fr: "560cc • Automatique • Confort premium • Permis A requis", en: "560cc • Automatic • Premium comfort • License A required" },
  "vehicle.tracer.name": { fr: "Yamaha Tracer 900", en: "Yamaha Tracer 900" },
  "vehicle.tracer.desc": { fr: "900cc • Sport-touring • Puissante • Permis A requis", en: "900cc • Sport-touring • Powerful • License A required" },

  // Booking
  "booking.badge": { fr: "Réservation simplifiée", en: "Simplified Booking" },
  "booking.title": { fr: "Réservez en 3 étapes", en: "Book in 3 Steps" },
  "booking.subtitle": { fr: "Notre processus Fast-Track élimine toute attente. Recevez vos clés instantanément.", en: "Our Fast-Track process eliminates all waiting. Get your keys instantly." },
  "booking.step1.title": { fr: "Choisissez vos dates", en: "Choose Your Dates" },
  "booking.step1.desc": { fr: "Sélectionnez la période de location sur notre calendrier interactif. Vérifiez la disponibilité en temps réel.", en: "Select your rental period on our interactive calendar. Check availability in real-time." },
  "booking.step2.title": { fr: "Check-in Express", en: "Express Check-in" },
  "booking.step2.desc": { fr: "Uploadez votre permis de conduire et passeport/CIN. Votre contrat sera pré-rempli à votre arrivée.", en: "Upload your driver's license and passport/ID. Your contract will be pre-filled on arrival." },
  "booking.step3.title": { fr: "Récupérez les clés", en: "Get Your Keys" },
  "booking.step3.desc": { fr: "Zéro attente. Votre véhicule propre et assuré vous attend. Signez et partez.", en: "Zero waiting. Your clean and insured vehicle is ready. Sign and go." },

  // Footer
  "footer.tagline": { fr: "Location premium à Marrakech. L'expérience Starlight, accessible à tous.", en: "Premium rental in Marrakech. The Starlight experience, accessible to all." },
  "footer.links": { fr: "Liens rapides", en: "Quick Links" },
  "footer.contact": { fr: "Contact", en: "Contact" },
  "footer.legal": { fr: "Mentions légales", en: "Legal Notice" },
  "footer.privacy": { fr: "Politique de confidentialité", en: "Privacy Policy" },
  "footer.terms": { fr: "Conditions générales", en: "Terms & Conditions" },
  "footer.rights": { fr: "Tous droits réservés.", en: "All rights reserved." },
  "footer.whatsapp": { fr: "Nous contacter sur WhatsApp", en: "Contact us on WhatsApp" },

  // Check-in Express
  "checkin.title": { fr: "Check-in Express", en: "Express Check-in" },
  "checkin.desc": { fr: "Gagnez du temps en pré-enregistrant vos documents. Récupérez votre véhicule sans attente.", en: "Save time by pre-registering your documents. Pick up your vehicle with zero wait." },
  "checkin.name": { fr: "Nom complet", en: "Full Name" },
  "checkin.email": { fr: "Email", en: "Email" },
  "checkin.phone": { fr: "Téléphone", en: "Phone" },
  "checkin.license": { fr: "Photo du permis de conduire", en: "Driver's License Photo" },
  "checkin.id": { fr: "Passeport ou CIN", en: "Passport or ID" },
  "checkin.upload": { fr: "Cliquez pour uploader", en: "Click to upload" },
  "checkin.submit": { fr: "Envoyer mes documents", en: "Submit My Documents" },
  "checkin.success": { fr: "Documents envoyés ! Nous vous contacterons sous 24h.", en: "Documents sent! We'll contact you within 24h." },

  // Booking modal
  "modal.title": { fr: "Réserver ce véhicule", en: "Book This Vehicle" },
  "modal.start": { fr: "Date de début", en: "Start Date" },
  "modal.end": { fr: "Date de fin", en: "End Date" },
  "modal.confirm": { fr: "Confirmer la réservation", en: "Confirm Booking" },
  "modal.whatsapp": { fr: "Finaliser sur WhatsApp", en: "Finalize on WhatsApp" },

  // Categories
  "cat.starlight": { fr: "Gamme Starlight", en: "Starlight Range" },
  "cat.essential": { fr: "Gamme Essentiel", en: "Essential Range" },
  "cat.adrenaline": { fr: "Gamme Adrénaline", en: "Adrenaline Range" },
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("fr");

  const t = (key: string): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
