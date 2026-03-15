import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqSections = [
  {
    title: "Réservation et Disponibilité",
    items: [
      {
        q: "Quel est l'âge minimum pour louer chez Kech Night Drive ?",
        a: "Nous sommes fiers d'être l'une des rares agences premium à faire confiance aux jeunes conducteurs. Il vous suffit d'être majeur (18 ans) et titulaire d'un permis de conduire valide. Aucun surcoût n'est appliqué pour les \"jeunes permis\".",
      },
      {
        q: "Quels sont les documents requis pour louer un véhicule ?",
        a: "La simplicité avant tout : une pièce d'identité (ou passeport) valide, votre permis de conduire, et une carte bancaire pour la caution.",
      },
      {
        q: "Puis-je modifier ou annuler ma réservation ?",
        a: "Oui, vous pouvez modifier votre réservation gratuitement jusqu'à 48h avant la prise en charge du véhicule.",
      },
    ],
  },
  {
    title: "Tarifs, Caution et Paiement",
    items: [
      {
        q: "Comment fonctionne la caution ?",
        a: "La caution est bloquée sur votre carte bancaire (via pré-autorisation) mais n'est pas débitée. Elle est immédiatement libérée lors de la restitution du véhicule après vérification de l'état des lieux.",
      },
      {
        q: "Quels sont les moyens de paiement acceptés ?",
        a: "Nous acceptons les cartes bancaires (Visa, Mastercard), les paiements en ligne sécurisés et les espèces (Euros ou Dirhams).",
      },
    ],
  },
  {
    title: "Utilisation des Véhicules",
    items: [
      {
        q: "Les véhicules sont-ils livrés à l'aéroport ?",
        a: "Oui ! Nous offrons un service de livraison VIP gratuit à l'aéroport Marrakech-Menara, ainsi qu'à votre hôtel ou villa dans le centre de Marrakech.",
      },
      {
        q: "Les installations lumineuses (Starlight/LED) déchargent-elles la batterie ?",
        a: "Absolument pas. Nos systèmes sont professionnels, à très basse consommation, et s'éteignent automatiquement lors de la fermeture du véhicule.",
      },
      {
        q: "Peut-on sortir de Marrakech avec le véhicule ?",
        a: "Oui, vous êtes libres de circuler sur tout le territoire marocain. La sortie du territoire national est en revanche strictement interdite.",
      },
      {
        q: "Que faire en cas de panne ou d'accident ?",
        a: "Tous nos véhicules sont neufs et sous garantie. En cas d'imprévu, notre assistance est disponible 7j/7. Un numéro d'urgence vous est remis lors de la remise des clés.",
      },
    ],
  },
];

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border/50">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-5 text-left rtl:text-right gap-4"
      >
        <span className="font-medium text-foreground">{q}</span>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 pb-5" : "max-h-0"}`}
      >
        <p className="text-muted-foreground text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full glass text-xs font-semibold tracking-wider uppercase text-primary mb-4">
              FAQ
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 font-serif">
              Foire Aux Questions
            </h1>
            <p className="text-muted-foreground text-lg">
              Tout ce que vous devez savoir avant de prendre le volant.
            </p>
          </motion.div>

          {faqSections.map((section, si) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: si * 0.1 }}
              className="mb-12"
            >
              <h2 className="text-xl font-bold text-foreground mb-4 font-serif flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg gradient-neon flex items-center justify-center text-xs text-primary-foreground font-bold">
                  {si + 1}
                </span>
                {section.title}
              </h2>
              <div className="glass rounded-2xl px-6">
                {section.items.map((item) => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default FAQ;
