-- AlterTable
ALTER TABLE "private_to_do" ALTER COLUMN "userId" DROP DEFAULT;
DROP SEQUENCE "private_to_do_userid_seq";
