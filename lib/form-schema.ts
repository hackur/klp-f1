import { z } from "zod";

// Step 1 Schema
export const step1Schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  interest: z.string().min(1, "Please select your interest"),
  submittedAt: z.string().optional(),
});

// Step 2 Schema
export const step2Schema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  businessTaxId: z.string().optional(),
  mobileNumber: z
    .string()
    .min(1, "Mobile number is required")
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/, "Invalid phone number format"),
  submittedAt: z.string().optional(),
});

// Step 3 Schema
export const step3Schema = z.object({
  address: z.object({
    street1: z.string().min(1, "Street address is required"),
    street2: z.string().optional(),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    country: z.string().min(1, "Country is required"),
  }),
  submittedAt: z.string().optional(),
});

// Full Form Schema
export const wholesaleFormSchema = z.object({
  ...step1Schema.shape,
  ...step2Schema.shape,
  ...step3Schema.shape,
});

export type WholesaleFormData = z.infer<typeof wholesaleFormSchema>;

export const interestOptions = [
  { value: "PRICING_ONLY", label: "Get Wholesale Pricing" },
  { value: "PARTNERSHIP", label: "Become a Partner" },
  { value: "DISTRIBUTION", label: "Distribution Opportunities" },
  { value: "CONSULTATION", label: "Business Consultation" },
  { value: "OTHER", label: "Other Inquiries" },
];
