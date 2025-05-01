# Multi-Step Form Component

## Overview

A reusable, step-by-step form component for handling complex data collection workflows. Implements progressive disclosure, validation, and state management for a wholesale inquiry form.

## Features

- Multi-step navigation with visual progress indicator
- Auto-save functionality with local storage
- Form validation using React Hook Form and Zod
- Responsive design with Tailwind CSS
- Interactive tooltips for form field guidance
- Visual feedback for form completion

## Usage

1. **Import the component**:

```tsx
import { MultiStepForm } from "@/components/ui/multi-step-form";
```

2. **Use in your application**:

```tsx
export default function MyPage() {
  return (
    <div className="p-8">
      <MultiStepForm />
    </div>
  );
}
```

## Form Structure

The form consists of three main steps:

1. **Contact Information** - Basic personal and business details
2. **Business Address** - Location information
3. **Business Interest** - Selection of business needs

## Key Files

- **`multi-step-form.tsx`** - Main component implementation
- **`form-schema.ts`** - Zod validation schema
- **`types.ts`** - Type definitions

## Development

- Requires React 18+ and Tailwind CSS
- Uses React Hook Form for state management
- Implements local storage persistence

## Contributing

Please follow the project's contribution guidelines. For documentation improvements, ensure all technical details are accurately reflected in the README.

### Guidelines

- Use consistent formatting
- Keep descriptions clear and concise
- Verify all code examples work as expected
- Update documentation when implementation changes
