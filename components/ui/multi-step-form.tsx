"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { wholesaleFormSchema } from "@/lib/form-schema"
import type { WholesaleFormData } from "@/lib/form-schema"
import { FormInput } from "@/components/ui/form-input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { interestOptions } from "@/lib/form-schema"

const steps = [
  {
    title: "Contact Information",
    description: "Tell us about you",
  },
  {
    title: "Business Details",
    description: "Tell us about your business",
  },
  {
    title: "Business Interest",
    description: "Help us understand your needs",
  },
]

export function MultiStepForm() {
  const [step, setStep] = React.useState(1)
  const [formId, setFormId] = React.useState<string>("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<WholesaleFormData>({
    resolver: zodResolver(wholesaleFormSchema),
    mode: "onBlur",
  })

  const saveStep1 = async (data: WholesaleFormData) => {
    try {
      setIsSubmitting(true)
      const response = await fetch("/api/wholesale", {
        method: "POST",
        body: JSON.stringify({
          step: 1,
          firstName: data.firstName,
          lastName: data.lastName,
          mobileNumber: data.mobileNumber,
          email: data.email,
        }),
      })
      const result = await response.json()
      if (result.id) {
        setFormId(result.id)
        setStep(2)
      }
    } catch (error) {
      console.error("Error saving step 1:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const saveStep2 = async (data: WholesaleFormData) => {
    try {
      setIsSubmitting(true)
      const response = await fetch("/api/wholesale", {
        method: "POST",
        body: JSON.stringify({
          step: 2,
          id: formId,
          businessName: data.businessName,
          businessTaxId: data.businessTaxId,
          ...data.address,
        }),
      })
      const result = await response.json()
      if (result.success) {
        setStep(3)
      }
    } catch (error) {
      console.error("Error saving step 2:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const saveStep3 = async (data: WholesaleFormData) => {
    try {
      setIsSubmitting(true)
      const response = await fetch("/api/wholesale", {
        method: "POST",
        body: JSON.stringify({
          step: 3,
          id: formId,
          interest: data.interest,
        }),
      })
      const result = await response.json()
      if (result.success) {
        setStep(4)
      }
    } catch (error) {
      console.error("Error saving step 3:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const onSubmit = async (data: WholesaleFormData) => {
    if (step === 1) {
      const isValid = await trigger([
        "firstName",
        "lastName",
        "mobileNumber",
        "email",
      ])
      if (isValid) await saveStep1(data)
    } else if (step === 2) {
      const isValid = await trigger([
        "businessName",
        "address.street1",
        "address.city",
        "address.state",
        "address.postalCode",
        "address.country",
      ])
      if (isValid) await saveStep2(data)
    } else if (step === 3) {
      const isValid = await trigger(["interest"])
      if (isValid) await saveStep3(data)
    }
  }

  const handleInterestChange = (value: string) => {
    setValue("interest", value as WholesaleFormData["interest"])
  }

  return (
    <div className="max-w-2xl w-full mx-auto backdrop-blur-md bg-white/60 dark:bg-black/60 rounded-2xl p-4 md:p-8 space-y-6 md:space-y-8 shadow-lg">
      {/* Progress Steps */}
      <div className="flex justify-between mb-6 md:mb-8">
        {steps.map((s, i) => (
          <div key={s.title} className="flex flex-col items-center text-center">
            <div
              className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center ${
                step > i + 1
                  ? "bg-[#9aca3c] text-white"
                  : step === i + 1
                  ? "bg-[#9aca3c] text-white"
                  : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
              }`}
            >
              {i + 1}
            </div>
            <div className="text-xs md:text-sm mt-2 hidden md:block">{s.title}</div>
            <div className="text-[10px] md:text-xs text-[#000005]/60 dark:text-white/60 hidden md:block">
              {s.description}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-xl md:text-2xl font-bold mb-4 font-['Built_Titling'] text-[#000005] dark:text-white">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                placeholder="First Name"
                {...register("firstName")}
                error={errors.firstName?.message}
                label="First Name"
              />
              <FormInput
                placeholder="Last Name"
                {...register("lastName")}
                error={errors.lastName?.message}
                label="Last Name"
              />
            </div>
            <FormInput
              placeholder="Mobile Number"
              {...register("mobileNumber")}
              error={errors.mobileNumber?.message}
              label="Mobile Number"
            />
            <FormInput
              placeholder="Email"
              type="email"
              {...register("email")}
              error={errors.email?.message}
              label="Email"
            />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-xl md:text-2xl font-bold mb-4 font-['Built_Titling'] text-[#000005] dark:text-white">
              Business Details
            </h2>
            <FormInput
              placeholder="Business Name"
              {...register("businessName")}
              error={errors.businessName?.message}
              label="Business Name"
            />
            <FormInput
              placeholder="Business Tax ID (Optional)"
              {...register("businessTaxId")}
              label="Business Tax ID"
            />
            <FormInput
              placeholder="Street Address"
              {...register("address.street1")}
              error={errors.address?.street1?.message}
              label="Street Address"
            />
            <FormInput
              placeholder="Apt, Suite, etc. (optional)"
              {...register("address.street2")}
              label="Address Line 2"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                placeholder="City"
                {...register("address.city")}
                error={errors.address?.city?.message}
                label="City"
              />
              <FormInput
                placeholder="State"
                {...register("address.state")}
                error={errors.address?.state?.message}
                label="State"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                placeholder="Postal Code"
                {...register("address.postalCode")}
                error={errors.address?.postalCode?.message}
                label="Postal Code"
              />
              <FormInput
                placeholder="Country"
                {...register("address.country")}
                error={errors.address?.country?.message}
                label="Country"
              />
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-xl md:text-2xl font-bold mb-4 font-['Built_Titling'] text-[#000005] dark:text-white">
              Business Interest
            </h2>
            <Select onValueChange={handleInterestChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select your interest level" />
              </SelectTrigger>
              <SelectContent>
                {interestOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.interest && (
              <p className="text-red-500 text-sm">{errors.interest.message}</p>
            )}
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4 py-6 md:py-8"
          >
            <div className="text-[#9aca3c] text-5xl md:text-6xl mb-4">✓</div>
            <h2 className="text-xl md:text-2xl font-bold font-['Built_Titling'] text-[#000005] dark:text-white">
              Thank You!
            </h2>
            <p className="text-sm md:text-base text-[#000005]/80 dark:text-white/80 font-['Avenir_Next']">
              Your wholesale inquiry has been submitted successfully. Our team will
              review your application and contact you soon.
            </p>
          </motion.div>
        )}

        {step < 4 && (
          <div className="flex justify-between pt-4 md:pt-6">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep((s) => s - 1)}
                disabled={isSubmitting}
                className="text-sm md:text-base"
              >
                Previous
              </Button>
            )}
            <Button
              type="submit"
              className="bg-[#9aca3c] hover:bg-[#8bbb36] text-white ml-auto text-sm md:text-base"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Saving..."
                : step === 3
                ? "Submit"
                : "Save & Continue"}
            </Button>
          </div>
        )}
      </form>
    </div>
  )
}
