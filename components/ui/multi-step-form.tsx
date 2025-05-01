"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Building,
  CheckCircle2,
  FileText,
  HelpCircle,
  Info,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Save,
  Send,
  User,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  WholesaleFormData,
  wholesaleFormSchema,
  interestOptions,
  step1Schema,
  step2Schema,
  step3Schema,
} from "@/lib/form-schema";

type Step = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  fieldGroups: string[];
};

const steps: Step[] = [
  {
    id: 1,
    title: "Initial Information",
    description: "Basic contact details and interest",
    icon: <User className="h-5 w-5" />,
    fieldGroups: ["firstName", "lastName", "email", "interest"],
  },
  {
    id: 2,
    title: "Business Details",
    description: "Tell us about your business",
    icon: <Building className="h-5 w-5" />,
    fieldGroups: ["businessName", "businessTaxId", "mobileNumber"],
  },
  {
    id: 3,
    title: "Business Location",
    description: "Provide your business address",
    icon: <MapPin className="h-5 w-5" />,
    fieldGroups: ["address"],
  },
];

// Storage key for form persistence
const FORM_STORAGE_KEY = "kasher-wholesale-form";

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Default form values
  const defaultValues: WholesaleFormData = {
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    businessName: "",
    businessTaxId: "",
    address: {
      street1: "",
      street2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    interest: "PRICING_ONLY",
  };

  // Initialize form
  const form = useForm<WholesaleFormData>({
    resolver: zodResolver(wholesaleFormSchema),
    defaultValues,
    mode: "onSubmit", // Validate on form submission
    reValidateMode: "onChange", // But re-validate on change after submission
  });

  // Load saved form data on initial render
  useEffect(() => {
    const savedForm = localStorage.getItem(FORM_STORAGE_KEY);
    if (savedForm) {
      try {
        const parsedData = JSON.parse(savedForm);
        form.reset(parsedData);

        // Determine which step to show based on saved data
        if (parsedData.address?.street1) {
          setCurrentStep(3);
        } else if (parsedData.businessName) {
          setCurrentStep(2);
        } else {
          setCurrentStep(1);
        }
      } catch (error) {
        console.error("Error loading saved form data:", error);
      }
    }
  }, [form]);

  // Save form data and log state when values change
  useEffect(() => {
    const subscription = form.watch((value) => {
      console.log("Form values updated:", value);
      console.log("Form state:", {
        isDirty: form.formState.isDirty,
        isValid: form.formState.isValid,
        errors: form.formState.errors,
      });
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Calculate completion percentage
  const calculateCompletion = () => {
    const formData = form.getValues();
    const allFields = steps.flatMap((step) => step.fieldGroups);
    let completedFields = 0;
    let totalRequiredFields = 0;

    // Count basic fields
    ["firstName", "lastName", "mobileNumber", "email", "businessName"].forEach(
      (field) => {
        totalRequiredFields++;
        if (formData[field as keyof typeof formData]) completedFields++;
      }
    );

    // Count address fields
    ["street1", "city", "state", "postalCode", "country"].forEach((field) => {
      totalRequiredFields++;
      if (
        formData.address &&
        formData.address[field as keyof typeof formData.address]
      )
        completedFields++;
    });

    // Count interest
    totalRequiredFields++;
    if (formData.interest) completedFields++;

    return Math.round((completedFields / totalRequiredFields) * 100);
  };

  async function onSubmit(data: WholesaleFormData) {
    console.log(`Starting submission for step ${currentStep}`);
    console.log("Current form data:", data);
    setIsLoading(true);

    try {
      // First validate current step
      console.log("Validating current step...");
      const isValid = await validateCurrentStep();
      if (!isValid) {
        console.log("Step validation failed");
        setIsLoading(false);
        return;
      }
      console.log("Step validation successful");

      // Get current step data
      const currentStepData = steps[currentStep - 1].fieldGroups.reduce(
        (acc, field) => {
          if (field === "address") {
            return { ...acc, address: data.address };
          }
          return { ...acc, [field]: data[field as keyof WholesaleFormData] };
        },
        {}
      );

      console.log(`Submitting step ${currentStep} data:`, currentStepData);

      try {
        // Submit current step
        const response = await fetch("/api/submit-form", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            step: currentStep,
            data: currentStepData,
            timestamp: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log(`Step ${currentStep} API response:`, result);

        // Only proceed if API call was successful
        if (result.success) {
          // Clear any existing errors
          form.clearErrors();

          // Handle step progression
          if (currentStep < steps.length) {
            console.log(`Moving to step ${currentStep + 1}`);
            setCurrentStep((current) => current + 1);
          } else {
            console.log("Form completed, showing success state");
            // Final step - show completion
            localStorage.removeItem(FORM_STORAGE_KEY);
            setIsSubmitted(true);
          }
        } else {
          throw new Error("API returned success: false");
        }
      } catch (apiError) {
        console.error("API error:", apiError);
        form.setError("root" as any, {
          type: "submit",
          message: "Failed to save. Please try again.",
        });
        return; // Don't proceed to next step if API call failed
      }
    } catch (error) {
      console.error("Form error:", error);
      form.setError("root" as any, {
        type: "submit",
        message: "Please fix the errors above and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Function to validate the current step
  const validateCurrentStep = async () => {
    console.log(`Validating step ${currentStep}...`);
    const currentData = form.getValues();

    try {
      let validation;
      if (currentStep === 1) {
        validation = await step1Schema.safeParseAsync({
          firstName: currentData.firstName,
          lastName: currentData.lastName,
          email: currentData.email,
          interest: currentData.interest,
        });
      } else if (currentStep === 2) {
        validation = await step2Schema.safeParseAsync({
          businessName: currentData.businessName,
          businessTaxId: currentData.businessTaxId,
          mobileNumber: currentData.mobileNumber,
        });
      } else if (currentStep === 3) {
        validation = await step3Schema.safeParseAsync({
          address: currentData.address,
        });
      }

      if (!validation?.success) {
        console.log("Validation failed:", validation?.error?.errors);
        // Show validation errors in the form
        if (validation?.error?.errors) {
          validation.error.errors.forEach((error) => {
            form.setError(error.path.join(".") as any, {
              message: error.message,
            });
          });
        }
        return false;
      }

      console.log("Validation successful");
      return true;
    } catch (error) {
      console.error("Validation error:", error);
      return false;
    }
  };

  const StepIndicator = ({ step }: { step: Step }) => {
    const isCompleted = currentStep > step.id;
    const isCurrent = currentStep === step.id;

    return (
      <div
        className={`flex items-center ${
          isCurrent
            ? "text-primary"
            : isCompleted
            ? "text-primary/80"
            : "text-muted-foreground"
        }`}
      >
        <div
          className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mr-3
          ${
            isCurrent
              ? "border-primary bg-primary/10"
              : isCompleted
              ? "border-primary/80 bg-primary/5"
              : "border-muted-foreground"
          } transition-all duration-300`}
        >
          {isCompleted ? (
            <CheckCircle2 className="h-5 w-5 text-primary" />
          ) : (
            step.icon
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium">{step.title}</h3>
          <p className="text-xs">{step.description}</p>
        </div>
      </div>
    );
  };

  // Reset form and restart
  const handleReset = () => {
    localStorage.removeItem(FORM_STORAGE_KEY);
    form.reset(defaultValues);
    setCurrentStep(1);
    setIsSubmitted(false);
  };

  // If form is submitted successfully, show thank you message
  if (isSubmitted) {
    return (
      <div className="space-y-8 w-full max-w-2xl mx-auto">
        <Card className="border-green-500">
          <CardHeader className="bg-green-50 dark:bg-green-950/30">
            <CardTitle className="flex items-center text-green-600">
              <CheckCircle2 className="mr-2 h-6 w-6" />
              Thank You!
            </CardTitle>
            <CardDescription>
              Your wholesale inquiry has been submitted successfully.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Submission Complete
              </h3>
              <p className="text-muted-foreground mb-6">
                Our team will review your information and get back to you
                shortly.
              </p>
              <Button onClick={handleReset}>Submit Another Inquiry</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full max-w-2xl mx-auto">
      {/* Progress Indicator */}
      <div className="relative">
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <StepIndicator step={step} />
              {index < steps.length - 1 && (
                <div className="flex-1 relative">
                  <div className="absolute top-5 left-0 right-0 border-t-2 border-muted my-4 mx-4" />
                  <div
                    className="absolute top-5 left-0 border-t-2 border-primary transition-all duration-500 my-4 mx-4"
                    style={{
                      width: currentStep > index + 1 ? "100%" : "0%",
                    }}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full bg-muted h-2 rounded-full mt-4">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${calculateCompletion()}%` }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs text-muted-foreground">Progress</span>
          <span className="text-xs font-medium">{calculateCompletion()}%</span>
        </div>
      </div>

      <Card className="border shadow-sm relative">
        {/* Show step-specific errors */}
        {form.formState.errors.root && (
          <div className="absolute -top-4 left-0 right-0 p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-md">
            <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              {form.formState.errors.root.message}
            </p>
          </div>
        )}
        <CardHeader className="bg-muted/30">
          <CardTitle className="flex items-center">
            {steps[currentStep - 1].icon}
            <span className="ml-2">{steps[currentStep - 1].title}</span>
          </CardTitle>
          <CardDescription>
            {steps[currentStep - 1].description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            First Name{" "}
                            <span className="text-red-500 ml-1">*</span>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className="h-3.5 w-3.5 text-muted-foreground ml-1 cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Your legal first name</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                placeholder="John"
                                className="pl-10"
                              />
                              <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            Last Name{" "}
                            <span className="text-red-500 ml-1">*</span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                placeholder="Doe"
                                className="pl-10"
                              />
                              <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          Email Address{" "}
                          <span className="text-red-500 ml-1">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type="email"
                              placeholder="you@example.com"
                              className="pl-10"
                            />
                            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="interest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          What would you like to start?{" "}
                          <span className="text-red-500 ml-1">*</span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-3.5 w-3.5 text-muted-foreground ml-1 cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  Select the option that best describes your
                                  current needs
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="pl-10">
                              <Building className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                              <SelectValue placeholder="Select your interest" />
                            </SelectTrigger>
                            <SelectContent>
                              {interestOptions.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          Business Name{" "}
                          <span className="text-red-500 ml-1">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              placeholder="Acme Corporation"
                              className="pl-10"
                            />
                            <Building className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="businessTaxId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          Business Tax ID
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-3.5 w-3.5 text-muted-foreground ml-1 cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Federal EIN or Tax ID (optional)</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              placeholder="XX-XXXXXXX"
                              className="pl-10"
                            />
                            <FileText className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          </div>
                        </FormControl>
                        <FormDescription className="text-xs">
                          Format: XX-XXXXXXX (optional)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mobileNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          Mobile Number{" "}
                          <span className="text-red-500 ml-1">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type="tel"
                              placeholder="(555) 123-4567"
                              className="pl-10"
                            />
                            <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          </div>
                        </FormControl>
                        <FormDescription className="text-xs">
                          Format: (XXX) XXX-XXXX
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="address.street1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          Street Address{" "}
                          <span className="text-red-500 ml-1">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              placeholder="123 Business Ave"
                              className="pl-10"
                            />
                            <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address.street2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Line 2</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              placeholder="Suite 100 (Optional)"
                              className="pl-10"
                            />
                            <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="address.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            City <span className="text-red-500 ml-1">*</span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                placeholder="San Francisco"
                                className="pl-10"
                              />
                              <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address.state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            State / Province{" "}
                            <span className="text-red-500 ml-1">*</span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                placeholder="California"
                                className="pl-10"
                              />
                              <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="address.postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            Postal / Zip Code{" "}
                            <span className="text-red-500 ml-1">*</span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                placeholder="94103"
                                className="pl-10"
                              />
                              <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address.country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            Country <span className="text-red-500 ml-1">*</span>
                          </FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="pl-10">
                                <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                <SelectValue placeholder="Select a country" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="US">
                                  United States
                                </SelectItem>
                                <SelectItem value="CA">Canada</SelectItem>
                                <SelectItem value="MX">Mexico</SelectItem>
                                <SelectItem value="GB">
                                  United Kingdom
                                </SelectItem>
                                <SelectItem value="AU">Australia</SelectItem>
                                <SelectItem value="DE">Germany</SelectItem>
                                <SelectItem value="FR">France</SelectItem>
                                <SelectItem value="JP">Japan</SelectItem>
                                <SelectItem value="CN">China</SelectItem>
                                <SelectItem value="BR">Brazil</SelectItem>
                                <SelectItem value="IN">India</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              <CardFooter className="flex justify-between px-0 pb-0 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.clearErrors();
                    setCurrentStep((current) => Math.max(1, current - 1));
                  }}
                  disabled={currentStep === 1 || isLoading}
                  className="gap-1"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    "gap-1 min-w-[120px] relative",
                    isLoading && "cursor-not-allowed opacity-80"
                  )}
                >
                  <span className={cn(isLoading && "invisible")}>
                    {currentStep === steps.length ? (
                      <>
                        <Send className="h-4 w-4 mr-1" />
                        Submit
                      </>
                    ) : (
                      <>
                        Next
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </>
                    )}
                  </span>
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
