# Wholesale Inquiry Form Implementation

## Overview

The wholesale inquiry form is implemented as a multi-step wizard using React Hook Form, Zod for validation, and shadcn/ui components. The form collects business information through three distinct steps while providing a smooth user experience.

## Components Structure

```
components/
└── ui/
    └── multi-step-form.tsx    # Main form component
lib/
└── form-schema.ts            # Validation schema and types
```

## Form Schema

The form data is validated using Zod with the following structure:

```typescript
type WholesaleFormData = {
  // Step 1: Contact Information
  firstName: string; // min 2 chars
  lastName: string; // min 2 chars
  mobileNumber: string; // min 10 chars
  email: string; // valid email
  businessName: string; // min 2 chars
  businessTaxId?: string; // optional

  // Step 2: Business Address
  address: {
    street1: string; // required
    street2?: string; // optional
    city: string; // required
    state: string; // required
    postalCode: string; // required
    country: string; // required
  };

  // Step 3: Business Interest
  interest:
    | "PRICING_ONLY"
    | "READY_TO_BUY"
    | "CUSTOM_READY"
    | "CUSTOM_LATER"
    | "MULTI_LOCATION_SMALL"
    | "MULTI_LOCATION_MEDIUM"
    | "CHAIN_BULK";
};
```

## Features

1. Step Progress Indicator

   - Visual representation of current step
   - Step titles and descriptions
   - Connecting lines between steps

2. Form Validation

   - Real-time field validation
   - Error messages
   - Required field indicators
   - Step completion checking

3. Navigation
   - Previous/Next buttons
   - Disabled states for invalid fields
   - Final submit on last step

## Usage

To use the form in a component:

```tsx
import { MultiStepForm } from "@/components/ui/multi-step-form";

export function MyComponent() {
  return (
    <div>
      <MultiStepForm />
    </div>
  );
}
```

## Form Steps

### Step 1: Contact Information

- Collects basic business contact details
- Grid layout for paired fields
- All fields required except Business Tax ID

### Step 2: Business Address

- Full international address support
- Optional second address line
- Country selection with common options

### Step 3: Business Interest

- Dropdown selection of business needs
- Options for different business scales
- Custom branding interest levels

## Styling

The form uses Tailwind CSS classes for styling:

- Grid layouts for field pairs
- Consistent spacing with gap-4
- Responsive design breakpoints
- Theme-aware colors

## Error Handling

Errors are displayed:

- Under individual fields
- Before allowing step progression
- With clear error messages
- In theme-appropriate colors

## Accessibility

The form implements:

- Proper ARIA labels
- Keyboard navigation
- Focus management
- Error announcements

## Future Improvements

Possible enhancements:

1. Form State Persistence

   - Save progress in localStorage
   - Allow returning to incomplete forms

2. Enhanced Validation

   - Phone number formatting
   - Address verification
   - Business ID validation

3. API Integration

   - Submit to backend API
   - Handle submission states
   - Success/error feedback

4. Analytics
   - Step completion rates
   - Field error frequencies
   - Submission success rates
