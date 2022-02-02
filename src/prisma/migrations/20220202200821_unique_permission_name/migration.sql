/*
  Warnings:

  - You are about to drop the column `mame` on the `permission` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `permission` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `permission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "permission" DROP COLUMN "mame",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "permission_name_key" ON "permission"("name");
