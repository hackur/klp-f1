"use client";
import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";

const LOGO_SIZE = 100;

const sponsors = [
  {
    name: "Lionheart Dispensary",
    logo: "/logos/sponsor1.png",
  },
  {
    name: "High Mountain",
    logo: "/logos/sponsor2.png",
  },
  {
    name: "Lifted Supply",
    logo: "/logos/sponsor3.png",
  },
  {
    name: "GreenHaus",
    logo: "/logos/sponsor4.png",
  },
  {
    name: "Fuller Dreamz",
    logo: "/logos/sponsor5.png",
  },
];

export const SponsorsSection = () => {
  return (
    <section className="py-12 md:py-16 overflow-hidden bg-card/50 backdrop-blur-sm border-y">
      <div className="container">
        <div className="text-center mb-8">
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            Trusted by Industry Leaders
          </h3>
        </div>

        {/* Infinite Scrolling Logo Row */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10" />

          {/* Scrolling Container */}
          <div className="flex gap-16 animate-[scroll_20s_linear_infinite] hover:pause">
            {/* First set of logos */}
            {sponsors.map((sponsor, i) => (
              <Card
                key={`first-${i}`}
                className="shrink-0 flex items-center justify-center p-6 bg-card/50 hover:bg-card/80 transition-colors"
              >
                <div className="w-[100px] h-[60px] relative grayscale hover:grayscale-0 transition-all">
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </Card>
            ))}
            {/* Duplicate set for seamless scrolling */}
            {sponsors.map((sponsor, i) => (
              <Card
                key={`second-${i}`}
                className="shrink-0 flex items-center justify-center p-6 bg-card/50 hover:bg-card/80 transition-colors"
              >
                <div className="w-[100px] h-[60px] relative grayscale hover:grayscale-0 transition-all">
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
