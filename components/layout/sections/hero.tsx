"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import AnimatedBackground from "@/components/ui/animated-background";
import { FlippingCard } from "@/components/ui/flipping-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const HeroSection = () => {
  const { theme } = useTheme();
  return (
    <AnimatedBackground type="silk" className="w-full">
      <section className="container w-full">
        <div className="grid lg:grid-cols-2 place-items-center lg:max-w-screen-xl gap-12 mx-auto py-20 md:py-32">
          <div className="text-center lg:text-left space-y-8">
            <Badge variant="outline" className="text-sm py-2">
              <span className="mr-2 text-primary">
                <Badge>New</Badge>
              </span>
              <span> Design is out now! </span>
            </Badge>

            <div className="text-4xl md:text-6xl font-bold">
              <h1>
                Experience the
                <span className="text-transparent px-2 bg-gradient-to-r from-kasher-dark-green-2 to-kasher-green bg-clip-text">
                  Kasher
                </span>
                Advantage
              </h1>
            </div>

            <p className="text-xl text-muted-foreground">
              {`We're more than just a tool, we're a community of passionate
              creators. Get access to exclusive resources, tutorials, and support.`}
            </p>
          </div>

          <div className="lg:mt-0 w-full flex justify-center">
            <FlippingCard
              className="w-full"
              frontContent={
                <div className="space-y-4 text-center w-full">
                  <h4 className="text-2xl font-bold font-heading text-card-foreground">
                    Log In
                  </h4>
                  <div className="form-group">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your@email.com"
                      className="bg-muted"
                    />
                  </div>
                  <div className="form-group">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Password"
                      className="bg-muted"
                    />
                  </div>
                  <Button className="w-full">Submit</Button>
                  <p className="text-sm">
                    <a
                      href="#"
                      className="link text-muted-foreground hover:text-primary"
                    >
                      Forgot password?
                    </a>
                  </p>
                </div>
              }
              backContent={
                <div className="space-y-4 text-center w-full">
                  <h4 className="text-2xl font-bold font-heading text-card-foreground">
                    Sign Up
                  </h4>
                  <div className="form-group">
                    <Label htmlFor="signup-name">Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Your Name"
                      className="bg-muted"
                    />
                  </div>
                  <div className="form-group">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your@email.com"
                      className="bg-muted"
                    />
                  </div>
                  <div className="form-group">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create Password"
                      className="bg-muted"
                    />
                  </div>
                  <Button className="w-full">Submit</Button>
                </div>
              }
            />
          </div>
        </div>
      </section>
    </AnimatedBackground>
  );
};
