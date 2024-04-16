/*
  Warnings:

  - Made the column `token` on table `UnverifiedUser` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UnverifiedUser" ALTER COLUMN "token" SET NOT NULL;
