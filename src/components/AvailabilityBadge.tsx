import { useLanguage } from "@/contexts/LanguageContext";

interface AvailabilityBadgeProps {
  total: number;
  available: number;
}

const AvailabilityBadge = ({ total, available }: AvailabilityBadgeProps) => {
  const { t } = useLanguage();
  const inStock = available > 0;

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-border/30">
      <span className="relative flex h-2.5 w-2.5">
        {inStock && (
          <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ backgroundColor: "#10B981" }} />
        )}
        <span
          className="relative inline-flex rounded-full h-2.5 w-2.5"
          style={{
            backgroundColor: inStock ? "#10B981" : "#EF4444",
            boxShadow: inStock ? "0 0 8px #10B981" : "0 0 8px #EF4444",
          }}
        />
      </span>
      <span className="text-xs font-medium text-foreground">
        {inStock
          ? `${available}/${total} ${available > 1 ? t("avail.plural") : t("avail.single")}`
          : t("avail.none")}
      </span>
    </div>
  );
};

export default AvailabilityBadge;
