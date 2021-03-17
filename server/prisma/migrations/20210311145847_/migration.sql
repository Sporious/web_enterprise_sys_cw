/*
  Warnings:

  - You are about to drop the column `uuid` on the `abtest` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `abtestresults` table. All the data in the column will be lost.
  - You are about to drop the column `abtest` on the `abtestresults` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "abtestresults.uuid_unique";

-- DropIndex
DROP INDEX "abtest.uuid_unique";

-- AlterTable
ALTER TABLE "abtest" DROP COLUMN "uuid";

-- AlterTable
ALTER TABLE "abtestresults" DROP COLUMN "uuid",
DROP COLUMN "abtest",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD PRIMARY KEY ("id");
