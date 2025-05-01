import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AnimatedBackground from "@/components/ui/animated-background";

interface FinalCTASectionProps {
  title: string;
  description: string;
  subtitle: string;
  buttonConsultation: string;
  consultationSubtitle: string;
  buttonMockup: string;
  mockupSubtitle: string;
  buttonClaimSpot: string;
  claimSpotSubtitle: string;
  outro: string;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({
  title,
  description,
  subtitle,
  buttonConsultation,
  consultationSubtitle,
  buttonMockup,
  mockupSubtitle,
  buttonClaimSpot,
  claimSpotSubtitle,
  outro,
}) => {
  return (
    <AnimatedBackground type="vivid" className="py-32 md:py-40">
      <div className="container relative">
        {/* Main Content */}
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-6">
          <h2 className="text-3xl md:text-5xl font-heading">{title}</h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            {description}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="relative max-w-5xl mx-auto">
          <div className="bg-card/30 backdrop-blur-[2px] border rounded-2xl p-8 md:p-12 transition-all duration-700 hover:bg-card/40 hover:border-primary/20">
            <h3 className="text-2xl md:text-3xl font-heading text-center mb-12">
              {subtitle}
            </h3>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Consultation Button */}
              <div className="group space-y-4 text-center transition-all duration-500 hover:translate-y-[-4px]">
                <Button
                  asChild
                  size="lg"
                  className="w-full transition-all duration-500 group-hover:shadow-lg group-hover:shadow-primary/30 group-hover:scale-[1.02]"
                >
                  <Link href="#contact">
                    <span className="relative inline-block transition-transform duration-300 group-hover:-translate-y-1">
                      {buttonConsultation}
                    </span>
                  </Link>
                </Button>
                <p className="text-sm text-muted-foreground">
                  {consultationSubtitle}
                </p>
              </div>

              {/* Mockup Button */}
              <div className="group space-y-4 text-center transition-all duration-500 hover:translate-y-[-4px]">
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full bg-card/50 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-primary/30 group-hover:scale-[1.02]"
                >
                  <Link href="#mockup">
                    <span className="relative inline-block transition-transform duration-300 group-hover:-translate-y-1">
                      {buttonMockup}
                    </span>
                  </Link>
                </Button>
                <p className="text-sm text-muted-foreground">
                  {mockupSubtitle}
                </p>
              </div>

              {/* Claim Spot Button */}
              <div className="group space-y-4 text-center transition-all duration-500 hover:translate-y-[-4px]">
                <Button
                  asChild
                  size="lg"
                  className="w-full transition-all duration-500 group-hover:shadow-lg group-hover:shadow-primary/30 group-hover:scale-[1.02]"
                >
                  <Link href="#claim">
                    <span className="relative inline-block transition-transform duration-300 group-hover:-translate-y-1">
                      {buttonClaimSpot}
                    </span>
                  </Link>
                </Button>
                <p className="text-sm text-muted-foreground">
                  {claimSpotSubtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Outro */}
          <div className="mt-16 text-center">
            <p className="text-lg md:text-xl whitespace-pre-line">{outro}</p>
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
};
