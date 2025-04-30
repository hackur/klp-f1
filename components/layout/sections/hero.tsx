"use client";
import { Badge } from "@/components/ui/badge";
import AnimatedBackground from "@/components/ui/animated-background";
import { useTheme } from "next-themes";
import { MultiStepForm } from "@/components/ui/multi-step-form";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
}

export const HeroSection = ({
  title,
  subtitle,
  description,
}: HeroSectionProps) => {
  const { theme } = useTheme();

  return (
    <AnimatedBackground type="vivid" className="w-full min-h-screen">
      <section className="container mx-auto py-32 md:py-40">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in text-left md:pr-8">
            <h2 className="text-xl md:text-2xl font-semibold text-primary/90 animate-[fadeIn_1s_ease-out_0.2s_forwards] opacity-0">
              {subtitle}
            </h2>

            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight drop-shadow-sharp-black animate-[fadeIn_1s_ease-out_0.4s_forwards] opacity-0">
              <h1>{title}</h1>
            </div>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed whitespace-pre-line animate-[fadeIn_1s_ease-out_0.6s_forwards] opacity-0">
              {description}
            </p>

            <div className="flex gap-4 pt-4 animate-[fadeIn_1s_ease-out_0.8s_forwards] opacity-0">
              <Badge variant="outline" className="text-sm px-4 py-2">
                🎯 Higher Sales
              </Badge>
              <Badge variant="outline" className="text-sm px-4 py-2">
                🔄 More Returns
              </Badge>
              <Badge variant="outline" className="text-sm px-4 py-2">
                📈 Growing ROI
              </Badge>
            </div>
          </div>

          {/* Right Form */}
          <div className="animate-[fadeIn_1s_ease-out_1s_forwards] opacity-0">
            <MultiStepForm />
          </div>
        </div>
      </section>
    </AnimatedBackground>
  );
};
