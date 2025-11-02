import type { ComponentType } from "react";
import { motion } from "framer-motion";

interface ActionButtonProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  onClick?: () => void;
  variant?: "default" | "danger";
}

export const ActionButton = ({ 
  icon: Icon, 
  label, 
  onClick,
  variant = "default" 
}: ActionButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        flex items-center gap-3 w-full bg-card shadow-md p-4 rounded-xl 
        transition-all duration-300 hover:shadow-md group
        ${variant === "danger" ? "hover:border-destructive/50" : "hover:border-primary/50"}
      `}
    >
      <div className={`
        p-2 rounded-lg transition-colors
        ${variant === "danger" 
          ? "bg-destructive/10 text-destructive group-hover:bg-destructive/20" 
          : "bg-primary/10 text-primary group-hover:bg-primary/20"
        }
      `}>
        <Icon className="h-5 w-5" />
      </div>
      <span className={`
        font-semibold text-sm md:text-base
        ${variant === "danger" ? "text-destructive" : "text-foreground"}
      `}>
        {label}
      </span>
    </motion.button>
  );
};
