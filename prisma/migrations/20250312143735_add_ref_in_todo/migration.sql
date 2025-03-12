/*
  Warnings:

  - You are about to drop the `PrivateTodo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PrivateTodo" DROP CONSTRAINT "PrivateTodo_userId_fkey";

-- AlterTable
ALTER TABLE "to_do" ADD COLUMN     "userId" INTEGER;

-- DropTable
DROP TABLE "PrivateTodo";

-- AddForeignKey
ALTER TABLE "to_do" ADD CONSTRAINT "to_do_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
