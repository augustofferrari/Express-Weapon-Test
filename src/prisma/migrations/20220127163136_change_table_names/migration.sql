/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Weapon` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WeaponType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Weapon" DROP CONSTRAINT "Weapon_weapon_type_id_fkey";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "Weapon";

-- DropTable
DROP TABLE "WeaponType";

-- CreateTable
CREATE TABLE "weapon_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" "WeaponSize" NOT NULL DEFAULT E'SMALL',
    "is_ranged_weapon" BOOLEAN NOT NULL,

    CONSTRAINT "weapon_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weapons" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "attack" INTEGER NOT NULL DEFAULT 1,
    "is_one_hand" BOOLEAN NOT NULL DEFAULT false,
    "weapon_type_id" TEXT NOT NULL,

    CONSTRAINT "weapons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "weapons" ADD CONSTRAINT "weapons_weapon_type_id_fkey" FOREIGN KEY ("weapon_type_id") REFERENCES "weapon_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
