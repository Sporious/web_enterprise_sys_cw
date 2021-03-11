/*
  Warnings:

  - You are about to drop the column `password` on the `accounts` table. All the data in the column will be lost.
  - Added the required column `hashedPassword` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salt` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "password",
ADD COLUMN     "hashedPassword" TEXT NOT NULL,
ADD COLUMN     "salt" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "abtestresults" (
    "uuid" TEXT NOT NULL,
    "abtest" TEXT NOT NULL,
    "resultfirst" DOUBLE PRECISION NOT NULL,
    "resultsecond" DOUBLE PRECISION NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "abtestresults.uuid_unique" ON "abtestresults"("uuid");
