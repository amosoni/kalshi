/*
  Warnings:

  - The primary key for the `Points` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Points` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Points` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Points` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Points_user_id_key";

-- AlterTable
ALTER TABLE "Points" DROP CONSTRAINT "Points_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "updatedAt",
ALTER COLUMN "balance" SET DEFAULT 0,
ALTER COLUMN "total_earned" SET DEFAULT 0,
ALTER COLUMN "total_spent" SET DEFAULT 0,
ADD CONSTRAINT "Points_pkey" PRIMARY KEY ("user_id");

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT,
ADD COLUMN     "username" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
