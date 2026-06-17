import { useLanguage } from "@/contexts/LanguageContext";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

// Bouton WhatsApp flottant, présent sur toutes les pages
const StickyWhatsApp = () => {
  const { language } = useLanguage();
  const url = buildWhatsAppUrl({ lang: language });

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110"
      style={{
        backgroundColor: "#25D366",
        boxShadow: "0 4px 20px rgba(37, 211, 102, 0.5)",
      }}
    >
      <MessageCircle className="w-7 h-7 text-white" fill="white" />
      <span className="absolute inline-flex h-full w-full rounded-full opacity-40 animate-ping" style={{ backgroundColor: "#25D366" }} />
    </a>
  );
};

export default StickyWhatsApp;
