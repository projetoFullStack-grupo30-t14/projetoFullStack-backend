-- DropForeignKey
ALTER TABLE "Cars" DROP CONSTRAINT "Cars_usersId_fkey";

-- AddForeignKey
ALTER TABLE "Cars" ADD CONSTRAINT "Cars_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
