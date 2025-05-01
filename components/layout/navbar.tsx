"use client";
import { Menu } from "lucide-react";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
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
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <header className="container top-5 mx-auto sticky border border-border z-40 rounded-2xl flex justify-between items-center p-2 bg-card/50 backdrop-blur-[2px]">
      <Link href="/" className="font-bold text-lg flex items-center">
        <Image
          src="/logos/kasher-logo-wide-green.png"
          width={120}
          height={40}
          alt="Kasher"
          className="dark:hidden"
          priority
        />
        <Image
          src="/logos/kasher-logo-wide-green.png"
          width={120}
          height={40}
          alt="Kasher"
          className="hidden dark:block"
          priority
        />
      </Link>
      {/* <!-- Mobile --> */}
      <div className="flex items-center lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer lg:hidden"
            />
          </SheetTrigger>

          <SheetContent
            side="left"
            className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card/80 backdrop-blur-[2px] border-secondary"
          >
            <div>
              <SheetHeader className="mb-4 ml-4">
                <SheetTitle className="flex items-center">
                  <Link href="/" className="flex items-center">
                    <Image
                      src="/logos/kasher-logo-wide-green.png"
                      width={100}
                      height={35}
                      alt="Kasher"
                      className="dark:hidden"
                      priority
                    />
                    <Image
                      src="/logos/kasher-logo-wide-green.png"
                      width={100}
                      height={35}
                      alt="Kasher"
                      className="hidden dark:block"
                      priority
                    />
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2">
                {routeList.map(({ href, label }) => (
                  <Button
                    key={href}
                    onClick={() => setIsOpen(false)}
                    asChild
                    variant="ghost"
                    className="justify-start text-base"
                  >
                    <Link href={href}>{label}</Link>
                  </Button>
                ))}
              </div>
            </div>

            <SheetFooter className="flex-col sm:flex-col justify-start items-start">
              <Separator className="mb-2" />

              <ToggleTheme />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* <!-- Desktop --> */}
      <NavigationMenu className="hidden lg:block">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-card text-base">
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
    </header>
  );
};
