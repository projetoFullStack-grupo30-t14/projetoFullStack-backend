-- CreateEnum
CREATE TYPE "FuelType" AS ENUM ('electric', 'gas', 'hybrid');

-- CreateTable
CREATE TABLE "Cars" (
    "id" TEXT NOT NULL,
    "brand" VARCHAR(50) NOT NULL,
    "model" VARCHAR(50) NOT NULL,
    "year" TIMESTAMP(3) NOT NULL,
    "fuel" "FuelType" NOT NULL,
    "mileage" INTEGER NOT NULL,
    "color" VARCHAR(20) NOT NULL,
    "price_FIPE" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "cover_image" VARCHAR(120) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cars_pkey" PRIMARY KEY ("id")
);
