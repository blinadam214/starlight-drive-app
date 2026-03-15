import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";
import { motion } from "framer-motion";

const articles = [
  {
    title: "Article 1 — État du véhicule",
    content:
      "Le véhicule est livré dans un état de propreté irréprochable et avec le plein de carburant. Il doit être restitué dans les mêmes conditions. L'état des lieux (vidéo/photos) est validé à la livraison et au retour.",
  },
  {
    title: "Article 2 — Comportement & Infractions",
    content:
      "Le locataire est entièrement et personnellement responsable des infractions au code de la route commises pendant la durée du contrat. Il est strictement interdit de fumer à l'intérieur des véhicules (frais de nettoyage approfondi applicables).",
  },
  {
    title: "Article 3 — Assurance",
    content:
      "Nos véhicules bénéficient d'une assurance « Tous Risques » avec une franchise plafonnée qui reste à la charge du locataire en cas d'accident responsable ou de dommages sans tiers identifié.",
  },
];

const Terms = () => {
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
              CGL
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 font-serif">
              Conditions Générales de Location
            </h1>
            <p className="text-muted-foreground text-lg">
              Les règles qui encadrent votre expérience Kech Night Drive.
            </p>
          </motion.div>

          <div className="space-y-8">
            {articles.map((article, i) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-2xl p-8"
              >
                <h2 className="text-lg font-bold text-foreground mb-3 font-serif">
                  {article.title}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {article.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default Terms;
