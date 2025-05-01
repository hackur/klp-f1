-- CreateEnum
CREATE TYPE "BusinessInterest" AS ENUM ('PRICING_ONLY', 'READY_TO_BUY', 'CUSTOM_READY', 'CUSTOM_LATER', 'MULTI_LOCATION_SMALL', 'MULTI_LOCATION_MEDIUM', 'CHAIN_BULK');

-- CreateTable
CREATE TABLE "WholesaleInquiry" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "businessTaxId" TEXT,
    "street1" TEXT NOT NULL,
    "street2" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "interest" "BusinessInterest" NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,

    CONSTRAINT "WholesaleInquiry_pkey" PRIMARY KEY ("id")
);
