/*
  Warnings:

  - Made the column `usersId` on table `Cars` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Cars" DROP CONSTRAINT "Cars_usersId_fkey";

-- AlterTable
ALTER TABLE "Cars" ALTER COLUMN "usersId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Cars" ADD CONSTRAINT "Cars_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
