import React from "react";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  className,
  delay = 0,
}) => {
  const baseStyles = "opacity-0 animate-fade-in";
  const animationDelay = { animationDelay: `${delay}ms` };

  return (
    <div className={cn(baseStyles, className)} style={animationDelay}>
      {children}
    </div>
  );
};
