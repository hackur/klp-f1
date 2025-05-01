import React from "react";
import { Card } from "@/components/ui/card";
import { Clock, Shield, Trophy, Users, Gift, Award } from "lucide-react";

interface SalesPoint {
  trigger: string;
  text: string;
}

interface SalesPsychologySectionProps {
  title: string;
  points: SalesPoint[];
}

// Map trigger words to icons
const triggerIcons: Record<string, React.ReactNode> = {
  Urgency: <Clock className="w-6 h-6" />,
  Scarcity: <Shield className="w-6 h-6" />,
  FOMO: <Trophy className="w-6 h-6" />,
  "Social Proof": <Users className="w-6 h-6" />,
  Reciprocity: <Gift className="w-6 h-6" />,
  Authority: <Award className="w-6 h-6" />,
};

export const SalesPsychologySection: React.FC<SalesPsychologySectionProps> = ({
  title,
  points,
}) => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-heading text-center mb-12">
          {title}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {points.map((point, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="mt-1">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {triggerIcons[point.trigger] || triggerIcons["Authority"]}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-medium mb-2">{point.trigger}</h3>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {point.text}
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
