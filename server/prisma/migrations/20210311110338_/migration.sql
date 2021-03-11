/*
  Warnings:

  - You are about to alter the column `resultfirst` on the `abtestresults` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `resultsecond` on the `abtestresults` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "abtestresults" ALTER COLUMN "resultfirst" SET DATA TYPE INTEGER,
ALTER COLUMN "resultsecond" SET DATA TYPE INTEGER;
