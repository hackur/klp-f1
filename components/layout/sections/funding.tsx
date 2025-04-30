import React from "react";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { MomAndPopLogo } from "@/components/icons/mom-and-pop-logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface FundingSectionProps {
  title: string;
  poweredBy: string;
  tagline: string;
  description: string;
  features: string[];
  outro: string;
  ctaPrequalify: string;
  ctaTalk: string;
  logoUrl: string;
}

export const FundingSection: React.FC<FundingSectionProps> = ({
  title,
  poweredBy,
  tagline,
  description,
  features,
  outro,
  ctaPrequalify,
  ctaTalk,
  logoUrl,
}) => {
  return (
    <section id="funding" className="py-16 md:py-24">
      <div className="container">
        <Card className="relative overflow-hidden backdrop-blur-[2px] bg-card/40 border transition-all duration-700 hover:bg-card/50 hover:border-primary/20">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] via-transparent to-accent/[0.06] animate-[gradientShift_40s_ease-in-out_infinite]" />

          {/* Content */}
          <div className="relative z-10 p-8 md:p-12">
            <div className="flex flex-col items-center text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-heading mb-2">
                {title}
              </h2>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span>{poweredBy}</span>
                <MomAndPopLogo />
              </div>
              <p className="text-sm text-muted-foreground mb-6">{tagline}</p>
              <p className="text-lg max-w-2xl">{description}</p>
            </div>

            {/* Features list */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg hover:bg-primary/[0.03] transition-colors"
                >
                  <div className="mt-1">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary/20">
                      <Check className="w-3 h-3 text-primary transition-all duration-300 group-hover:scale-110" />
                    </div>
                  </div>
                  <p className="text-base">{feature}</p>
                </div>
              ))}
            </div>

            {/* Outro and CTAs */}
            <div className="text-center space-y-6">
              <p className="text-lg font-medium">{outro}</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button asChild className="group" size="lg">
                  <Link href="mailto:angelina@mykasher.com">
                    <span className="relative inline-block transition-all duration-300 group-hover:-translate-y-1">
                      Get Prequalified
                    </span>
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="tel:503-891-3227">
                    <span className="relative inline-block transition-all duration-300 group-hover:-translate-y-1">
                      Talk to an Expert
                    </span>
                  </Link>
                </Button>
              </div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>{ctaPrequalify}</p>
                <p>{ctaTalk}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
