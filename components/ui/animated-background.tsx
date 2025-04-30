import React from "react";
import { cn } from "@/lib/utils";
// import "./animated-background.css"; // Import the original CSS
import "./animated-background-gradient.css"; // Import the new gradient CSS

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  className?: string;
  type?: "vivid" | "metal" | "silk" | "default"; // Add "default"
  // speedFactor?: number; // Speed is now controlled by variants via CSS variables
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  children,
  className,
  type = "default",
  // speedFactor = 4, // Removed prop
}) => {
  // Construct class names based on type
  const backgroundClasses = cn(
    "fake-shader-gradient", // Use the new base class
    {
      vivid: type === "vivid",
      metal: type === "metal",
      silk: type === "silk",
      // No extra class for "default"
    },
    className
  );

  // Style object for CSS variables if needed - currently using variants
  // const style: React.CSSProperties = {
  //   "--speed-factor": speedFactor,
  // } as React.CSSProperties;

  return <div className={backgroundClasses}>{children}</div>;
};

export default AnimatedBackground;
