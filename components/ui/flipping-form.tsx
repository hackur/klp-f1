"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, User } from "lucide-react";
import { Card } from "@/components/ui/card";

export const FlippingForm = () => {
  return (
    <div className="form w-full max-w-md mx-auto">
      <div className="text-center">
        <h6 className="mb-8">
          <span className="px-5 text-sm font-bold uppercase">Log In</span>
          <span className="px-5 text-sm font-bold uppercase">Sign Up</span>
        </h6>

        <input type="checkbox" className="hidden" id="reg-log" />
        <label
          htmlFor="reg-log"
          className="relative block w-[60px] h-4 mx-auto my-3 bg-primary rounded-lg cursor-pointer"
        >
          <span className="absolute flex items-center justify-center w-9 h-9 -top-2.5 -left-2.5 rounded-full bg-white text-primary transition-transform duration-500 transform hover:scale-105">
            <User className="w-5 h-5" />
          </span>
        </label>

        <div className="card-3d-wrap relative w-full h-[400px] mt-16 transform-gpu preserve-3d perspective-[800px]">
          <div className="card-3d-wrapper w-full h-full absolute top-0 left-0 transform-gpu preserve-3d transition-transform duration-600 ease-out [transform-style:preserve-3d] [input:checked~&]:rotate-y-180">
            {/* Front Card */}
            <div className="card-front w-full h-full absolute rounded-xl bg-card border">
              <div className="center-wrap absolute w-full px-8 top-1/2 left-0 -translate-y-1/2 translate-z-[35px] perspective-[100px] block z-20">
                <h4 className="heading text-2xl uppercase mb-5">Log In</h4>
                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="Your Email"
                      className="pl-12"
                    />
                    <Mail className="absolute top-3 left-4 h-5 w-5 text-primary" />
                  </div>
                  <div className="relative">
                    <Input
                      type="password"
                      placeholder="Your Password"
                      className="pl-12"
                    />
                    <Lock className="absolute top-3 left-4 h-5 w-5 text-primary" />
                  </div>
                  <Button className="w-full">Submit</Button>
                  <p className="text-center">
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      Forgot your password?
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Back Card */}
            <div className="card-back w-full h-full absolute rounded-xl bg-card border [transform:rotateY(180deg)]">
              <div className="center-wrap absolute w-full px-8 top-1/2 left-0 -translate-y-1/2 translate-z-[35px] perspective-[100px] block z-20">
                <h4 className="heading text-2xl uppercase mb-5">Sign Up</h4>
                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Your Name"
                      className="pl-12"
                    />
                    <User className="absolute top-3 left-4 h-5 w-5 text-primary" />
                  </div>
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="Your Email"
                      className="pl-12"
                    />
                    <Mail className="absolute top-3 left-4 h-5 w-5 text-primary" />
                  </div>
                  <div className="relative">
                    <Input
                      type="password"
                      placeholder="Your Password"
                      className="pl-12"
                    />
                    <Lock className="absolute top-3 left-4 h-5 w-5 text-primary" />
                  </div>
                  <Button className="w-full">Submit</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
