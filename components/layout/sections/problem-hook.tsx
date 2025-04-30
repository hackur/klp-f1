import React from "react";

interface ProblemHookProps {
  content: string;
}

export const ProblemHookSection = ({ content }: ProblemHookProps) => {
  return (
    <section className="container mx-auto py-12 md:py-16 text-center">
      <div className="max-w-3xl mx-auto">
        <p className="text-lg md:text-xl font-medium text-muted-foreground leading-relaxed whitespace-pre-line">
          {content}
        </p>
      </div>
    </section>
  );
};
