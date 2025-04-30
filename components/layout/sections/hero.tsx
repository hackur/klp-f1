"use client";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import AnimatedBackground from "@/components/ui/animated-background";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Define form data structure
interface FormData {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  businessName: string;
  taxId: string;
  streetAddress: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  inquiryType: string;
}

export const HeroSection = () => {
  const { theme } = useTheme();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    businessName: "",
    taxId: "",
    streetAddress: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    inquiryType: "",
  });

  const totalSteps = 3;

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle Select change specifically if needed (depends on Select component setup)
  const handleSelectChange = (id: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle final form submission logic here
    console.log("Form Submitted:", formData);
    alert("Inquiry submitted! We will reach out soon.");
    // Optionally reset form
    // setCurrentStep(1);
    // setFormData({...initial empty state...});
  };

  // Inquiry types from image
  const inquiryTypes = [
    "Just looking for now, would like to see wholesale pricing first.",
    "I would like to get Kashers in my store and am ready to buy today.",
    "I would like custom Kashers with my logo engraved and am ready to buy today.",
    "I would like custom Kashers but am not quite ready to buy yet.",
    "I have several store locations (2-3) and would like to get Kashers into them all.",
    "I have multiple stores (4-10) and would like to purchase in bulk.",
    "I buy for a chain of stores and would like bulk pricing options.",
  ];

  return (
    <AnimatedBackground type="subtle-white" className="w-full">
      <section className="container w-full">
        <div className="grid lg:grid-cols-2 place-items-center lg:max-w-screen-xl gap-16 xl:gap-24 mx-auto py-24 md:py-36">
          <div className="text-center lg:text-left space-y-10">
            <Badge variant="outline" className="text-sm py-2">
              <span className="mr-2 text-primary">
                <Badge>New</Badge>
              </span>
              <span> Design is out now! </span>
            </Badge>

            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight drop-shadow-sharp-black">
              <h1>
                Experience the
                <span className="text-transparent px-2 bg-gradient-to-r from-kasher-dark-green-2 to-kasher-green bg-clip-text">
                  Kasher
                </span>
                Advantage
              </h1>
            </div>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {`We&apos;re more than just a tool, we&apos;re a community of passionate
              creators. Get access to exclusive resources, tutorials, and support.`}
            </p>
          </div>

          <div className="w-full flex justify-center items-stretch self-stretch">
            <Card className="w-full h-full flex flex-col">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">
                  WHOLESALE INQUIRY
                </CardTitle>
                <CardDescription className="text-base">
                  Interested in getting a wholesale account set up? Fill out
                  this form real quick and we&apos;ll reach out!
                  <br />
                  For a general inquiry fill out our{" "}
                  <Link
                    href="/contact"
                    className="text-primary hover:underline"
                  >
                    contact us form here
                  </Link>
                  .
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-grow space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Step 1: Contact Information */}
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg text-center">
                        Step 1: Contact Information
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="form-group">
                          <Label htmlFor="firstName">
                            First Name{" "}
                            <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            placeholder="John"
                          />
                        </div>
                        <div className="form-group">
                          <Label htmlFor="lastName">
                            Last Name{" "}
                            <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <Label htmlFor="mobile">
                          Mobile Number{" "}
                          <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="mobile"
                          type="tel"
                          value={formData.mobile}
                          onChange={handleChange}
                          required
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div className="form-group">
                        <Label htmlFor="email">
                          Email Address{" "}
                          <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="john.doe@example.com"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Business Information */}
                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg text-center">
                        Step 2: Business Information
                      </h3>
                      <div className="form-group">
                        <Label htmlFor="businessName">
                          Business Name{" "}
                          <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="businessName"
                          value={formData.businessName}
                          onChange={handleChange}
                          required
                          placeholder="Acme Corp"
                        />
                      </div>
                      <div className="form-group">
                        <Label htmlFor="taxId">
                          Business Tax ID (Optional)
                        </Label>
                        <Input
                          id="taxId"
                          value={formData.taxId}
                          onChange={handleChange}
                          placeholder="XX-XXXXXXX"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 3: Business Address & Inquiry */}
                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg text-center">
                        Step 3: Address & Inquiry
                      </h3>
                      <div className="form-group">
                        <Label htmlFor="streetAddress">
                          Street Address{" "}
                          <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="streetAddress"
                          value={formData.streetAddress}
                          onChange={handleChange}
                          required
                          placeholder="123 Main St"
                        />
                      </div>
                      <div className="form-group">
                        <Label htmlFor="addressLine2">
                          Address Line 2 (Optional)
                        </Label>
                        <Input
                          id="addressLine2"
                          value={formData.addressLine2}
                          onChange={handleChange}
                          placeholder="Apt, suite, unit, building, floor, etc."
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="form-group">
                          <Label htmlFor="city">
                            City <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            placeholder="Anytown"
                          />
                        </div>
                        <div className="form-group">
                          <Label htmlFor="state">
                            State <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                            placeholder="CA"
                          />
                        </div>
                        <div className="form-group">
                          <Label htmlFor="zip">
                            Postal / Zip Code{" "}
                            <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="zip"
                            value={formData.zip}
                            onChange={handleChange}
                            required
                            placeholder="90210"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <Label htmlFor="country">
                          Country <span className="text-destructive">*</span>
                        </Label>
                        {/* Basic input for now, replace with Country Select component if available */}
                        <Input
                          id="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                          placeholder="United States"
                        />
                      </div>
                      <div className="form-group">
                        <Label htmlFor="inquiryType">
                          What would you like to start?{" "}
                          <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={formData.inquiryType}
                          onValueChange={(value) =>
                            handleSelectChange("inquiryType", value)
                          }
                          required
                        >
                          <SelectTrigger id="inquiryType">
                            <SelectValue placeholder="- Select -" />
                          </SelectTrigger>
                          <SelectContent>
                            {inquiryTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </form>
              </CardContent>

              <CardFooter className="flex justify-between border-t pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                {currentStep < totalSteps ? (
                  <Button type="button" onClick={nextStep}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" onClick={handleSubmit}>
                    Submit Inquiry
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </AnimatedBackground>
  );
};
