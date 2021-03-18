/*
  Warnings:

  - You are about to drop the column `count` on the `abtestresults` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "abtestresults" DROP COLUMN "count",
ADD COLUMN     "resCount" INTEGER NOT NULL DEFAULT 0;
