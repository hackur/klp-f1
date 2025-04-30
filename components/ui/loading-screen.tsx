import React from "react";
import AnimatedBackground from "./animated-background";
import Image from "next/image";

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50">
      <AnimatedBackground className="w-full h-full flex items-center justify-center">
        <div className="animate-bounce">
          <Image
            src="/hero-image-light.jpeg"
            alt="Kasher Logo"
            width={64}
            height={64}
            className="rounded-xl dark:hidden"
          />
          <Image
            src="/hero-image-dark.jpeg"
            alt="Kasher Logo"
            width={64}
            height={64}
            className="rounded-xl hidden dark:block"
          />
        </div>
      </AnimatedBackground>
    </div>
  );
};
