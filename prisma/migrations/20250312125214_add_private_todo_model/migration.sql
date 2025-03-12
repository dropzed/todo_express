/*
  Warnings:

  - You are about to drop the `private_to_do` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "private_to_do" DROP CONSTRAINT "private_to_do_userId_fkey";

-- DropTable
DROP TABLE "private_to_do";

-- CreateTable
CREATE TABLE "PrivateTodo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "PrivateTodo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PrivateTodo" ADD CONSTRAINT "PrivateTodo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
