/*
  Warnings:

  - The migration will change the primary key for the `accounts` table. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `uuid` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `accounts` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "accounts.uuid_unique";

-- AlterTable
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_pkey",
DROP COLUMN "uuid",
DROP COLUMN "userId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD PRIMARY KEY ("id");
