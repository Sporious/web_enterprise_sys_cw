/*
  Warnings:

  - You are about to drop the column `testId` on the `abtestresults` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `abtestresults` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "abtestresults" DROP COLUMN "testId",
DROP COLUMN "userId";
