import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import "./flipping-card.css";

interface FlippingCardProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  className?: string;
}

export function FlippingCard({
  frontContent,
  backContent,
  className,
}: FlippingCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className={cn("w-full max-w-md", className)}>
      <div className="text-center">
        <div className="flex justify-center space-x-5 mb-6">
          <span className="text-sm font-semibold uppercase">Front Side</span>
          <span className="text-sm font-semibold uppercase">Back Side</span>
        </div>
        <div className="relative inline-block">
          <input
            type="checkbox"
            id="card-flip"
            className="hidden"
            checked={isFlipped}
            onChange={() => setIsFlipped(!isFlipped)}
          />
          <label
            htmlFor="card-flip"
            className="relative block w-16 h-4 bg-primary mx-auto my-2 rounded-full cursor-pointer"
          >
            <span
              className="absolute flex items-center justify-center w-9 h-9 rounded-full bg-white text-primary -top-2.5 -left-2.5 transition-transform duration-500 ease-out shadow-md"
              style={{
                transform: isFlipped
                  ? "translateX(44px) rotate(-270deg)"
                  : "none",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 1l4 4-4 4"></path>
                <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                <path d="M7 23l-4-4 4-4"></path>
                <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
              </svg>
            </span>
          </label>
          <div className="card-3d-wrap relative w-full h-[400px] perspective-[800px]">
            <div
              className="card-3d-wrapper w-full h-full absolute transition-all duration-600 ease-out transform-style-3d preserve-3d"
              style={{ transform: isFlipped ? "rotateY(180deg)" : "none" }}
            >
              <Card className="card-front absolute w-full h-full rounded-md transform-style-3d backface-hidden">
                <CardContent className="absolute inset-0 p-8 flex flex-col items-center justify-center">
                  {frontContent}
                </CardContent>
              </Card>

              <Card
                className="card-back absolute w-full h-full rounded-md transform-style-3d backface-hidden"
                style={{ transform: "rotateY(180deg)" }}
              >
                <CardContent className="absolute inset-0 p-8 flex flex-col items-center justify-center">
                  {backContent}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
