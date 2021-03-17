/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[uuid]` on the table `accounts`. If there are existing duplicate values, the migration will fail.
  - Added the required column `uuid` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "uuid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "accounts.uuid_unique" ON "accounts"("uuid");
