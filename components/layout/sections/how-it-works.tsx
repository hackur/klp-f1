import React from "react";
import { Card } from "@/components/ui/card";

interface Step {
  id: number;
  title: string;
  description: string;
}

interface HowItWorksSectionProps {
  title: string;
  subtitle: string;
  description: string;
  steps: Step[];
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  title,
  subtitle,
  description,
  steps,
}) => {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-heading mb-4">{title}</h2>
          <h3 className="text-xl md:text-2xl font-medium mb-6">{subtitle}</h3>
          <p className="text-lg text-muted-foreground whitespace-pre-line">
            {description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step) => (
            <Card key={step.id} className="p-6 flex flex-col">
              {/* Step Number */}
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold mb-4">
                {step.id}
              </div>

              {/* Step Content */}
              <h4 className="text-xl font-medium mb-3">{step.title}</h4>
              <p className="text-muted-foreground whitespace-pre-line flex-grow">
                {step.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
