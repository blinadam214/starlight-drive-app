import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface BookingModalProps {
  vehicle: { nameKey: string; price: number };
  onClose: () => void;
}

const BookingModal = ({ vehicle, onClose }: BookingModalProps) => {
  const { t } = useLanguage();
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  const days = startDate && endDate
    ? Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)))
    : 0;

  const total = days * vehicle.price;

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Bonjour B-LINE 26! Je souhaite réserver: ${t(vehicle.nameKey)}\nDu: ${startDate?.toLocaleDateString()}\nAu: ${endDate?.toLocaleDateString()}\nTotal: ${total} €`
    );
    window.open(`https://wa.me/212600000000?text=${msg}`, "_blank");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-strong rounded-2xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-foreground">{t("modal.title")}</h3>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <p className="text-primary font-semibold mb-6">{t(vehicle.nameKey)}</p>

          <div className="space-y-4 mb-6">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">{t("modal.start")}</label>
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                disabled={(date) => date < new Date()}
                className={cn("p-3 pointer-events-auto glass rounded-xl")}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">{t("modal.end")}</label>
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                disabled={(date) => date < (startDate || new Date())}
                className={cn("p-3 pointer-events-auto glass rounded-xl")}
              />
            </div>
          </div>

          {days > 0 && (
            <div className="glass rounded-xl p-4 mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">{days} {days > 1 ? "jours" : "jour"} × {vehicle.price} €</span>
                <span className="text-foreground font-semibold">{total} €</span>
              </div>
            </div>
          )}

          <button
            onClick={handleWhatsApp}
            disabled={!startDate || !endDate}
            className="btn-neon w-full flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <MessageCircle className="w-5 h-5" />
            {t("modal.whatsapp")}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingModal;
