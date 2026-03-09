import { useState } from "react";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { Menu, X, Globe, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoB26 from "@/assets/logo-b26.png";

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navLinks = [
    { href: "#fleet", label: t("nav.fleet") },
    { href: "#concept", label: t("nav.concept") },
    { href: "#booking", label: t("nav.booking") },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: "fr", label: "FR" },
    { code: "en", label: "EN" },
  ];

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center group">
            <img src={logoB26} alt="B26 Location de voiture Marrakech" className="h-12 lg:h-14 w-auto object-contain" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-medium tracking-wide"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass text-sm font-medium text-foreground hover:border-primary/30 transition-all"
              >
                <Globe className="w-4 h-4 text-primary" />
                {language.toUpperCase()}
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 mt-2 glass-strong rounded-lg overflow-hidden min-w-[80px]"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                        className={`block w-full px-4 py-2 text-sm text-left transition-colors ${
                          language === lang.code ? "text-primary" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Check-in Express */}
            <button
              onClick={() => scrollTo("#booking")}
              className="hidden sm:flex items-center gap-2 btn-neon text-sm !px-5 !py-2"
            >
              <Zap className="w-4 h-4" />
              {t("nav.checkin")}
            </button>

            {/* Mobile menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-foreground"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-strong border-t border-border overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="block w-full text-left text-foreground text-lg font-medium py-2"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("#booking")}
                className="btn-neon w-full flex items-center justify-center gap-2 text-sm mt-4"
              >
                <Zap className="w-4 h-4" />
                {t("nav.checkin")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
