/*
  Warnings:

  - A unique constraint covering the columns `[razorpayOrderId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[razorpaySubscriptionId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "razorpayOrderId" TEXT,
ADD COLUMN     "razorpayPlanId" TEXT,
ADD COLUMN     "razorpaySubscriptionId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_razorpayOrderId_key" ON "User"("razorpayOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "User_razorpaySubscriptionId_key" ON "User"("razorpaySubscriptionId");
