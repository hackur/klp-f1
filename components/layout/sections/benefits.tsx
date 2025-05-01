import React from "react";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

interface Benefit {
  title: string;
  description: string;
}

interface BenefitsSectionProps {
  title: string;
  items: Benefit[];
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({
  title,
  items,
}) => {
  return (
    <section id="benefits" className="py-16 md:py-24">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-heading text-center mb-12">
          {title}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="mt-1">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {item.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
