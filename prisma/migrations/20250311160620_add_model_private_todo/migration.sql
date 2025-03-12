-- CreateTable
CREATE TABLE "private_to_do" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" SERIAL NOT NULL,

    CONSTRAINT "private_to_do_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "private_to_do" ADD CONSTRAINT "private_to_do_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
