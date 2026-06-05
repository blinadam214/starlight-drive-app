import { useLanguage } from "@/contexts/LanguageContext";
import { MessageCircle, MapPin, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logobon from "@/assets/logobon.png";

const FooterSection = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <img src={logobon} alt="Kech Night Drive — Location Premium Marrakech" className="h-16 w-auto object-contain mix-blend-screen" />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-6">
              {t("footer.tagline")}
            </p>
            <a
              href="https://wa.me/33635121205"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-neon inline-flex items-center gap-2 !px-6 !py-3 text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              {t("footer.whatsapp")}
            </a>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t("footer.links")}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="/#fleet" className="hover:text-primary transition-colors">{t("nav.fleet")}</a></li>
              <li><a href="/#concept" className="hover:text-primary transition-colors">{t("nav.concept")}</a></li>
              <li><a href="/#booking" className="hover:text-primary transition-colors">{t("nav.booking")}</a></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">{t("footer.terms")}</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">{t("footer.contact")}</Link></li>
              
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t("footer.contact")}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                Marrakech, Maroc
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-primary flex-shrink-0" />
                +33 6 35 12 12 05
              </li>
              <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary flex-shrink-0" />
              contact@kechnightdrive.ma
            </li>
            <li className="flex items-center gap-2">
              <Instagram className="w-4 h-4 text-primary flex-shrink-0" />
              @kechnightdrive
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Kech Night Drive. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
