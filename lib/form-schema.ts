import { z } from "zod";

// Step 1 Schema
export const step1Schema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name is too long"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name is too long"),
  email: z
    .string()
    .email("Invalid email address")
    .min(5, "Email is required")
    .max(100, "Email is too long"),
  interest: z.enum(
    ["PRICING_ONLY", "PARTNERSHIP", "DISTRIBUTION", "CONSULTATION", "OTHER"],
    {
      required_error: "Please select your interest",
    }
  ),
  submittedAt: z.string().optional(),
});

// Step 2 Schema
export const step2Schema = z.object({
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters")
    .max(100, "Business name is too long"),
  businessTaxId: z
    .string()
    .regex(/^\d{2}-\d{7}$/, "Invalid Tax ID format (XX-XXXXXXX)")
    .optional(),
  mobileNumber: z
    .string()
    .regex(
      /^\(\d{3}\) \d{3}-\d{4}$/,
      "Invalid phone format. Use (XXX) XXX-XXXX"
    )
    .min(14, "Phone number is required"),
  submittedAt: z.string().optional(),
});

// Step 3 Schema
export const step3Schema = z.object({
  address: z.object({
    street1: z
      .string()
      .min(5, "Street address must be at least 5 characters")
      .max(100, "Street address is too long"),
    street2: z
      .string()
      .max(100, "Street address line 2 is too long")
      .optional(),
    city: z
      .string()
      .min(2, "City must be at least 2 characters")
      .max(50, "City name is too long"),
    state: z
      .string()
      .min(2, "State must be at least 2 characters")
      .max(50, "State name is too long"),
    postalCode: z
      .string()
      .min(5, "Postal code must be at least 5 characters")
      .max(10, "Postal code is too long")
      .regex(/^[A-Z0-9\s-]+$/i, "Invalid postal code format"),
    country: z
      .string()
      .min(2, "Country must be at least 2 characters")
      .max(50, "Country name is too long"),
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
