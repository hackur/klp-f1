"use client";
import { Badge } from "@/components/ui/badge";
import AnimatedBackground from "@/components/ui/animated-background";
import { useTheme } from "next-themes";

// Define props interface
interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
}

// Accept props
export const HeroSection = ({
  title,
  subtitle,
  description,
}: HeroSectionProps) => {
  const { theme } = useTheme();

  return (
    <AnimatedBackground type="subtle-white" className="w-full">
      <section className="container mx-auto py-24 md:py-36 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-primary">
            {subtitle}
          </h2>

          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight drop-shadow-sharp-black">
            <h1>{title}</h1>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed whitespace-pre-line">
            {description}
          </p>
        </div>
      </section>
    </AnimatedBackground>
  );
};
