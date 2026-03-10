import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={`relative flex items-center justify-center w-10 h-10 rounded-xl border-2 transition-all duration-500 overflow-hidden ${
        isDark
          ? "bg-background border-[hsl(var(--neon-violet))] shadow-[0_0_12px_hsl(var(--neon-violet)/0.5)]"
          : "bg-muted border-foreground/20 shadow-sm"
      }`}
      aria-label={isDark ? "Activer le mode jour" : "Activer le mode nuit"}
    >
      {/* Animated inner glow for dark mode */}
      {isDark && (
        <motion.div
          className="absolute inset-0 rounded-[10px]"
          animate={{
            boxShadow: [
              "inset 0 0 8px hsl(270 60% 60% / 0.2)",
              "inset 0 0 16px hsl(270 60% 60% / 0.4)",
              "inset 0 0 8px hsl(270 60% 60% / 0.2)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Icon container with rotation animation */}
      <motion.div
        key={theme}
        initial={{ rotate: -90, scale: 0, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: 90, scale: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="relative z-10"
      >
        {isDark ? (
          <Moon className="w-[18px] h-[18px] text-[hsl(var(--neon-violet))]" />
        ) : (
          <Sun className="w-[18px] h-[18px] text-foreground" />
        )}
      </motion.div>

      {/* Tiny cockpit indicator dot */}
      <div
        className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-500 ${
          isDark
            ? "bg-[hsl(var(--neon-violet))] shadow-[0_0_6px_hsl(var(--neon-violet)/0.8)]"
            : "bg-foreground/30"
        }`}
      />
    </button>
  );
};

export default ThemeToggle;
