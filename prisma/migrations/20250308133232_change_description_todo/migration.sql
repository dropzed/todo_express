/*
  Warnings:

  - You are about to drop the column `descriptiron` on the `to_do` table. All the data in the column will be lost.
  - Added the required column `description` to the `to_do` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "to_do" DROP COLUMN "descriptiron",
ADD COLUMN     "description" TEXT NOT NULL;
