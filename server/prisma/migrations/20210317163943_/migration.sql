/*
  Warnings:

  - You are about to drop the column `resultfirst` on the `abtestresults` table. All the data in the column will be lost.
  - You are about to drop the column `resultsecond` on the `abtestresults` table. All the data in the column will be lost.
  - You are about to drop the column `salt` on the `accounts` table. All the data in the column will be lost.
  - Added the required column `testId` to the `abtestresults` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `abtestresults` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resultFirst` to the `abtestresults` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resultSecond` to the `abtestresults` table without a default value. This is not possible if the table is not empty.
  - Added the required column `millis` to the `abtestresults` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "abtestresults" DROP COLUMN "resultfirst",
DROP COLUMN "resultsecond",
ADD COLUMN     "testId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD COLUMN     "resultFirst" INTEGER NOT NULL,
ADD COLUMN     "resultSecond" INTEGER NOT NULL,
ADD COLUMN     "millis" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "salt";
