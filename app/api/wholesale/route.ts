import { NextRequest, NextResponse } from "next/server"
import { saveFormStep1, updateFormStep2, completeForm } from "@/lib/db"
import { wholesaleFormSchema } from "@/lib/form-schema"
import { withValidation, withErrorHandler } from "@/lib/api-middleware"
import { z } from "zod"

const step1Schema = wholesaleFormSchema.pick({
  firstName: true,
  lastName: true,
  mobileNumber: true,
  email: true,
  businessName: true,
  businessTaxId: true,
})

const step2Schema = z.object({
  id: z.string(),
  ...wholesaleFormSchema.shape.address.shape
})

const step3Schema = z.object({
  id: z.string(),
  interest: wholesaleFormSchema.shape.interest
})

type Step1Data = z.infer<typeof step1Schema>
type Step2Data = z.infer<typeof step2Schema>
type Step3Data = z.infer<typeof step3Schema>

export const POST = withErrorHandler(async (req: NextRequest) => {
  const data = await req.json()
  const step = data.step

  switch (step) {
    case 1:
      return withValidation<Step1Data>(async (_, validData) => {
        const result = await saveFormStep1(validData)
        return NextResponse.json({ id: result.id })
      }, step1Schema)(req)

    case 2:
      return withValidation<Step2Data>(async (_, validData) => {
        const { id, ...address } = validData
        const result = await updateFormStep2(id, address)
        return NextResponse.json({ success: true })
      }, step2Schema)(req)

    case 3:
      return withValidation<Step3Data>(async (_, validData) => {
        const { id, interest } = validData
        const result = await completeForm(id, { interest })
        return NextResponse.json({ success: true })
      }, step3Schema)(req)

    default:
      return NextResponse.json(
        { error: "Invalid step" },
        { status: 400 }
      )
  }
})
