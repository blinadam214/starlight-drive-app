import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { Menu, X, Globe, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoKND from "@/assets/logobon.png";
import ThemeToggle from "./ThemeToggle";

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "ar", label: "العربية", flag: "🇲🇦" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱" },
];

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { href: "#fleet", label: t("nav.fleet") },
    { href: "#concept", label: t("nav.concept") },
    { href: "#booking", label: t("nav.booking") },
    { href: "/faq", label: "FAQ", isRoute: true },
    { href: "/contact", label: t("footer.contact"), isRoute: true },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const currentLang = LANGUAGES.find((l) => l.code === language)!;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const scrollTo = (href: string, isRoute?: boolean) => {
    setMobileOpen(false);
    if (isRoute) {
      navigate(href);
      return;
    }
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return;
    }
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-0 group">
            <img src={logoKND} alt="Kech Night Drive — Location Premium Marrakech" className="h-15 w-15 md:h-20 md:w-20 object-contain mix-blend-screen" />
            <span className="inline font-serif font-bold tracking-tight text-[12px] md:text-base text-amber-200/90 drop-shadow-[0_1px_4px_rgba(200,170,80,0.3)] whitespace-nowrap -ml-2">
              {"KECH NIGHT DRIVE".split("").map((char, i) => {
                if (char === " ") return <span key={i}>&nbsp;</span>;
                const shouldAnimate = i % 3 === 0;
                return (
                  <span
                    key={i}
                    className={`neon-letter-gold${shouldAnimate ? " animate-neon-gold" : ""}`}
                    style={shouldAnimate ? {
                      "--neon-duration": `${3.5 + (i % 5) * 0.5}s`,
                      "--neon-delay": `${(i * 0.4) % 3}s`,
                    } as React.CSSProperties : undefined}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href, (link as any).isRoute)}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-medium tracking-wide"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl glass text-sm font-medium text-foreground hover:border-primary/30 transition-all duration-300 group"
              >
                <Globe className="w-4 h-4 text-primary transition-transform duration-300 group-hover:rotate-45" />
                <span className="text-base">{currentLang.flag}</span>
                <motion.svg
                  animate={{ rotate: langOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-3 h-3 text-muted-foreground"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 rounded-xl overflow-hidden min-w-[180px] border border-border/30"
                    style={{
                      background: "rgba(15, 15, 20, 0.85)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                    }}
                  >
                    <div className="py-1.5">
                      {LANGUAGES.map((lang, i) => (
                        <motion.button
                          key={lang.code}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                          onClick={() => {
                            setLanguage(lang.code);
                            setLangOpen(false);
                          }}
                          className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm text-left rtl:text-right transition-all duration-200 group/item ${
                            language === lang.code
                              ? "text-primary bg-primary/10"
                              : "text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--primary)/0.08)]"
                          }`}
                        >
                          <span className="text-base">{lang.flag}</span>
                          <span className="flex-1 font-medium">{lang.label}</span>
                          {language === lang.code && (
                            <motion.div
                              layoutId="activeLang"
                              className="w-1.5 h-1.5 rounded-full bg-primary"
                              style={{ boxShadow: "0 0 8px hsl(var(--primary))" }}
                            />
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden lg:block">
              <ThemeToggle />
            </div>

            <button
              onClick={() => { setMobileOpen(false); navigate("/enregistrement"); }}
              className="hidden sm:flex items-center gap-2 btn-neon text-sm !px-5 !py-2"
            >
              <Zap className="w-4 h-4" />
              {t("nav.checkin")}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-foreground"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

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
                  onClick={() => scrollTo(link.href, (link as any).isRoute)}
                  className="block w-full text-left rtl:text-right text-foreground text-lg font-medium py-2"
                >
                  {link.label}
                </button>
              ))}

              <div className="pt-4 border-t border-border/30">
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        language === lang.code
                          ? "bg-primary/15 text-primary border border-primary/30"
                          : "glass text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.code.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => { setMobileOpen(false); navigate("/enregistrement"); }}
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
