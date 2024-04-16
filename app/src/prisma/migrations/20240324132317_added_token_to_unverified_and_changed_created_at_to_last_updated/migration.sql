/*
  Warnings:

  - You are about to drop the column `createdAt` on the `UnverifiedUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UnverifiedUser" DROP COLUMN "createdAt",
ADD COLUMN     "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "token" TEXT;
