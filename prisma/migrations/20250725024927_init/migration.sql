/*
  Warnings:

  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "otpExpiry" TIMESTAMP(3),
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "name" SET NOT NULL;
