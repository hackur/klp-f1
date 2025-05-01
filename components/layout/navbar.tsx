"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ToggleTheme } from "./toogle-theme";

interface RouteProps {
  href: string;
  label: string;
}

interface FeatureProps {
  title: string;
  description: string;
}

const routeList: RouteProps[] = [
  {
    href: "#how-it-works",
    label: "How It Works",
  },
  {
    href: "#benefits",
    label: "Benefits",
  },
  {
    href: "#faq",
    label: "FAQ",
  },
  {
    href: "#funding",
    label: "Funding",
  },
];

const featureList: FeatureProps[] = [
  {
    title: "Custom Branded Kashers",
    description:
      "High-quality, laser-engraved Kasher multitools with your logo.",
  },
  {
    title: "QR Code Integration",
    description:
      "Smart QR codes that connect physical products to digital engagement.",
  },
  {
    title: "Rewards Program",
    description:
      "Complete referral and loyalty system to drive repeat business.",
  },
];

export const Navbar = () => {
  return (
    <header className="header-adjustments sticky relative container top-5 mx-auto z-40 rounded-2xl flex justify-between items-center p-4 backdrop-blur-[2px]">
      <Link href="/" className="font-bold text-lg flex items-center">
        <Image
          src="/logos/KasherLogoHorizontal_WordmarkAndShieldVariation_CMYK_LightBackground_copy_300x.png"
          width={150}
          height={50}
          alt="Kasher Logo"
          className="mr-2 dark:hidden rounded-md"
        />
        <Image
          src="/logos/KasherLogoHorizontal_WordmarkAndShieldVariation_CMYK_LightBackground_copy_300x.png"
          width={150}
          height={50}
          alt="Kasher Logo"
          className="mr-2 hidden dark:block rounded-md"
        />
        Kasher
      </Link>
      <NavigationMenu className="hidden lg:block">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-base">
              Features
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[600px] grid-cols-2 gap-5 p-4">
                <Image
                  src="/hero-image-light.jpeg"
                  alt="Kasher Product Demonstration"
                  className="h-full w-full rounded-md object-cover"
                  width={600}
                  height={600}
                />
                <ul className="flex flex-col gap-2">
                  {featureList.map(({ title, description }) => (
                    <li
                      key={title}
                      className="rounded-md p-3 text-sm hover:bg-muted"
                    >
                      <p className="mb-1 font-semibold leading-none text-foreground">
                        {title}
                      </p>
                      <p className="line-clamp-2 text-muted-foreground">
                        {description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            {routeList.map(({ href, label }) => (
              <NavigationMenuLink key={href} asChild>
                <Link
                  href={href}
                  className="text-sm px-3 text-muted-foreground hover:text-foreground"
                >
                  {label}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="hidden lg:flex">
        <ToggleTheme />

        <Button
          asChild
          size="sm"
          variant="ghost"
          aria-label="Visit Kasher's Main Website"
        >
          <Link
            aria-label="Visit Kasher's Main Website"
            href="https://mykasher.com"
            target="_blank"
          >
            <span className="text-sm">Main Site</span>
          </Link>
        </Button>
      </div>
      <NavigationMenu className="hidden lg:block">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-base">
              Black Titanium Collection
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[600px] grid-cols-3 gap-5 p-4">
                {/* Black Titanium Images */}
                {["001-Titanium2_600x.webp", "002-Titanium1_800x.webp", "K-Ti_BLK_600x.webp", "K-Ti_BLK-L_600x.webp", "K-Ti_gld_800x-1.webp", "K-Ti_gld_800x.webp", "K-Ti_gld-L_600x.webp", "SidePic-Titanium_600x.webp", "Titanium-Back_600x.webp", "TitaniumFront_600x.webp"].map((filename) => (
                  <Image
                    key={filename}
                    src={`/black-titanium/${filename}`}
                    alt={filename}
                    width={200}
                    height={200}
                    className="rounded-md object-cover"
                  />
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
