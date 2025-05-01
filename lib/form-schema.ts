import * as z from "zod"

export const wholesaleFormSchema = z.object({
  // Step 1: Contact Information
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  mobileNumber: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),

  // Step 2: Business Details
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  businessTaxId: z.string().optional(),
  address: z.object({
    street1: z.string().min(1, "Street address is required"),
    street2: z.string().optional(),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    country: z.string().min(1, "Country is required"),
  }),

  // Step 3: Business Interest
  interest: z.enum(
    [
      "PRICING_ONLY",
      "READY_TO_BUY",
      "CUSTOM_READY",
      "CUSTOM_LATER",
      "MULTI_LOCATION_SMALL",
      "MULTI_LOCATION_MEDIUM",
      "CHAIN_BULK",
    ],
    {
      required_error: "Please select your interest level",
    }
  ),
})

export type WholesaleFormData = z.infer<typeof wholesaleFormSchema>

export const interestOptions = [
  {
    value: "PRICING_ONLY",
    label: "Just looking for now, would like to see wholesale pricing first",
  },
  {
    value: "READY_TO_BUY",
    label: "I would like to get Kashers in my store and am ready to buy today",
  },
  {
    value: "CUSTOM_READY",
    label:
      "I would like custom Kashers with my logo engraved and am ready to buy today",
  },
  {
    value: "CUSTOM_LATER",
    label: "I would like custom Kashers but am not quite ready to buy yet",
  },
  {
    value: "MULTI_LOCATION_SMALL",
    label:
      "I have several store locations (2-3) and would like to get Kashers into them all",
  },
  {
    value: "MULTI_LOCATION_MEDIUM",
    label: "I have multiple stores (4-10) and would like to purchase in bulk",
  },
  {
    value: "CHAIN_BULK",
    label: "I buy for a chain of stores and would like bulk pricing options",
  },
]
