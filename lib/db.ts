import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export type WholesaleFormStep1 = {
  firstName: string
  lastName: string
  mobileNumber: string
  email: string
  businessName: string
  businessTaxId?: string
}

export type WholesaleFormStep2 = {
  street1: string
  street2?: string
  city: string
  state: string
  postalCode: string
  country: string
}

export type WholesaleFormStep3 = {
  interest: string
}

export async function saveFormStep1(data: WholesaleFormStep1) {
  return await prisma.wholesaleForm.create({
    data: {
      ...data,
      step: 1
    }
  })
}

export async function updateFormStep2(id: string, data: WholesaleFormStep2) {
  return await prisma.wholesaleForm.update({
    where: { id },
    data: {
      ...data,
      step: 2
    }
  })
}

export async function completeForm(id: string, data: WholesaleFormStep3) {
  return await prisma.wholesaleForm.update({
    where: { id },
    data: {
      ...data,
      step: 3,
      completed: true
    }
  })
}

export async function getFormById(id: string) {
  return await prisma.wholesaleForm.findUnique({
    where: { id }
  })
}
