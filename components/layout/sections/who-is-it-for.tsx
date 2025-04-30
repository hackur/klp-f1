import React from "react";
import { Card } from "@/components/ui/card";
import { Target } from "lucide-react";

interface WhoIsItForSectionProps {
  title: string;
  description: string;
  types: string[];
}

export const WhoIsItForSection: React.FC<WhoIsItForSectionProps> = ({
  title,
  description,
  types,
}) => {
  return (
    <section id="who-is-it-for" className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Target className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-heading mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {types.map((type, index) => (
            <Card
              key={index}
              className="p-4 flex items-center justify-center text-center hover:bg-primary/5 transition-colors"
            >
              <span className="text-base md:text-lg">{type}</span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
