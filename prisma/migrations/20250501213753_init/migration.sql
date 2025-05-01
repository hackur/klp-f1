-- CreateTable
CREATE TABLE "wholesale_forms" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "step" INTEGER NOT NULL DEFAULT 1,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "firstName" TEXT,
    "lastName" TEXT,
    "mobileNumber" TEXT,
    "email" TEXT,
    "businessName" TEXT,
    "businessTaxId" TEXT,
    "street1" TEXT,
    "street2" TEXT,
    "city" TEXT,
    "state" TEXT,
    "postalCode" TEXT,
    "country" TEXT,
    "interest" TEXT,

    CONSTRAINT "wholesale_forms_pkey" PRIMARY KEY ("id")
);
