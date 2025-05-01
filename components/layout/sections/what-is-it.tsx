import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";

interface WhatIsItSectionProps {
  title: string;
  description: string;
  qrDestinations: string[];
  modelsIntro: string;
  models: string[];
  modelsOutro: string;
}

export const WhatIsItSection: React.FC<WhatIsItSectionProps> = ({
  title,
  description,
  qrDestinations,
  modelsIntro,
  models,
  modelsOutro,
}) => {
  return (
    <section id="what-is-it" className="py-16 md:py-24">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Column: Image */}
          <Card className="relative aspect-square w-full overflow-hidden">
            <Image
              src="/hero-image-light.jpeg"
              alt="Kasher Product Demonstration"
              fill
              className="object-cover dark:hidden"
            />
            <Image
              src="/hero-image-dark.jpeg"
              alt="Kasher Product Demonstration"
              fill
              className="object-cover hidden dark:block"
            />
          </Card>

          {/* Right Column: Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-heading">{title}</h2>
            <p className="text-lg text-muted-foreground whitespace-pre-line">
              {description}
            </p>

            {/* QR Destinations */}
            <ul className="space-y-2">
              {qrDestinations.map((destination, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-lg">{destination}</span>
                </li>
              ))}
            </ul>

            {/* Kasher Models */}
            <div className="space-y-4">
              <p className="text-lg font-medium">{modelsIntro}</p>
              <ul className="grid grid-cols-2 gap-4">
                {models.map((model, index) => (
                  <li
                    key={index}
                    className="bg-card p-4 rounded-lg border text-center"
                  >
                    {model}
                  </li>
                ))}
              </ul>
              <p className="text-lg text-muted-foreground">{modelsOutro}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
