import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title: string;
  items: FAQ[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({ title, items }) => {
  return (
    <section id="faq" className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-heading text-center mb-12">
          {title}
        </h2>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {items.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border rounded-lg px-6"
              >
                <AccordionTrigger className="text-lg py-4 hover:no-underline hover:text-primary text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground pb-4 whitespace-pre-line">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
