import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, error, label, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && <Label>{label}</Label>}
        <Input
          className={cn(
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    )
  }
)

FormInput.displayName = "FormInput"
