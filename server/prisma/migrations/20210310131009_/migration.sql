/*
  Warnings:

  - The migration will change the primary key for the `accounts` table. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `accounts` table. All the data in the column will be lost.
  - The migration will add a unique constraint covering the columns `[username]` on the table `accounts`. If there are existing duplicate values, the migration will fail.
  - Added the required column `updatedAt` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "userId" SERIAL NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD PRIMARY KEY ("userId");

-- CreateIndex
CREATE UNIQUE INDEX "accounts.username_unique" ON "accounts"("username");
