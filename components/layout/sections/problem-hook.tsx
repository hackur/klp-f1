import React from "react";

interface ProblemHookProps {
  content: string;
}

export const ProblemHookSection = ({ content }: ProblemHookProps) => {
  return (
    <section className="container mx-auto py-16 md:py-24 text-center">
      <div className="max-w-3xl mx-auto">
        <p className="text-xl md:text-2xl font-medium text-foreground/90 leading-relaxed whitespace-pre-line">
          {content}
        </p>
      </div>
    </section>
  );
};
