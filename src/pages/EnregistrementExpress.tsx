import { useState } from "react";
import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";
import { motion } from "framer-motion";
import { User, Mail, Phone, CalendarDays, Car, FileImage, CheckCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const vehicles = [
  "Renault Clio 5 — Starlight",
  "Peugeot 208 — Starlight",
  "Dacia Logan — Essentiel",
  "Yamaha TMAX 560",
  "Yamaha Tracer 900",
];

const EnregistrementExpress = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    vehicle: "",
    startDate: "",
    endDate: "",
  });
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [idFile, setIdFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Enregistrement envoyé avec succès ! Nous vous contacterons sous 24h.");
    setForm({ lastName: "", firstName: "", email: "", phone: "", vehicle: "", startDate: "", endDate: "" });
    setLicenseFile(null);
    setIdFile(null);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full glass text-xs font-semibold tracking-wider uppercase text-primary mb-4">
              Enregistrement Express
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 font-serif">
              Réservation rapide
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Gagnez du temps en pré-enregistrant vos informations. Récupérez votre véhicule sans attente à votre arrivée.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="glass-strong rounded-2xl p-8 sm:p-10">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Nom / Prénom */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <User className="w-4 h-4" /> Nom
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={form.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl glass border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="Alami"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <User className="w-4 h-4" /> Prénom
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={form.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl glass border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="Mohammed"
                    />
                  </div>
                </div>

                {/* Email / Téléphone */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4" /> Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl glass border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="email@exemple.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Téléphone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl glass border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="+212 6XX XXX XXX"
                    />
                  </div>
                </div>

                {/* Choix du véhicule */}
                <div>
                  <label className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                    <Car className="w-4 h-4" /> Véhicule souhaité
                  </label>
                  <select
                    name="vehicle"
                    required
                    value={form.vehicle}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl glass border-border/50 text-foreground focus:outline-none focus:border-primary/50 transition-colors bg-transparent"
                  >
                    <option value="" disabled>Sélectionnez un véhicule</option>
                    {vehicles.map((v) => (
                      <option key={v} value={v} className="bg-background text-foreground">{v}</option>
                    ))}
                  </select>
                </div>

                {/* Dates */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <CalendarDays className="w-4 h-4" /> Date de début
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      required
                      value={form.startDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl glass border-border/50 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <CalendarDays className="w-4 h-4" /> Date de fin
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      required
                      value={form.endDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl glass border-border/50 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>

                {/* Documents */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <FileImage className="w-4 h-4" /> Permis de conduire
                    </label>
                    <label className="flex flex-col items-center justify-center w-full h-28 rounded-xl glass border-dashed border-2 border-border/50 cursor-pointer hover:border-primary/40 transition-colors">
                      {licenseFile ? (
                        <span className="flex items-center gap-2 text-sm text-primary">
                          <CheckCircle className="w-4 h-4" /> {licenseFile.name}
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground">Cliquez pour téléverser</span>
                      )}
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => setLicenseFile(e.target.files?.[0] || null)} />
                    </label>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <FileImage className="w-4 h-4" /> Passeport ou CIN
                    </label>
                    <label className="flex flex-col items-center justify-center w-full h-28 rounded-xl glass border-dashed border-2 border-border/50 cursor-pointer hover:border-primary/40 transition-colors">
                      {idFile ? (
                        <span className="flex items-center gap-2 text-sm text-primary">
                          <CheckCircle className="w-4 h-4" /> {idFile.name}
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground">Cliquez pour téléverser</span>
                      )}
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => setIdFile(e.target.files?.[0] || null)} />
                    </label>
                  </div>
                </div>

                <button type="submit" className="btn-neon w-full text-base mt-4 flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  Envoyer mon enregistrement
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default EnregistrementExpress;
