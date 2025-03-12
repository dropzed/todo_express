-- AlterTable
CREATE SEQUENCE private_to_do_userid_seq;
ALTER TABLE "private_to_do" ALTER COLUMN "userId" SET DEFAULT nextval('private_to_do_userid_seq');
ALTER SEQUENCE private_to_do_userid_seq OWNED BY "private_to_do"."userId";
