import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, FileText, Rocket } from "lucide-react";

interface FinalCTAProps {
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

export const FinalCTASection = ({
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
}: FinalCTAProps) => {
  return (
    <section className="container py-16 md:py-24 bg-muted/50">
      <div className="max-w-5xl mx-auto text-center">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {description}
          </p>
          <h3 className="text-2xl font-semibold text-primary">{subtitle}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="group hover:border-primary transition-colors">
            <CardContent className="p-6">
              <div className="mb-4">
                <Phone className="h-8 w-8 text-primary mx-auto" />
              </div>
              <Button variant="outline" className="w-full mb-4">
                {buttonConsultation}
              </Button>
              <p className="text-sm text-muted-foreground">
                {consultationSubtitle}
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:border-primary transition-colors">
            <CardContent className="p-6">
              <div className="mb-4">
                <FileText className="h-8 w-8 text-primary mx-auto" />
              </div>
              <Button variant="outline" className="w-full mb-4">
                {buttonMockup}
              </Button>
              <p className="text-sm text-muted-foreground">{mockupSubtitle}</p>
            </CardContent>
          </Card>

          <Card className="group hover:border-primary transition-colors">
            <CardContent className="p-6">
              <div className="mb-4">
                <Rocket className="h-8 w-8 text-primary mx-auto" />
              </div>
              <Button variant="default" className="w-full mb-4">
                {buttonClaimSpot}
              </Button>
              <p className="text-sm text-muted-foreground">
                {claimSpotSubtitle}
              </p>
            </CardContent>
          </Card>
        </div>

        <p className="text-lg text-muted-foreground whitespace-pre-line">
          {outro}
        </p>
      </div>
    </section>
  );
};
