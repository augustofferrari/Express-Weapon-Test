-- CreateEnum
CREATE TYPE "WeaponSize" AS ENUM ('SMALL', 'MID', 'BIG');

-- CreateTable
CREATE TABLE "WeaponType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" "WeaponSize" NOT NULL DEFAULT E'SMALL',
    "is_ranged_weapon" BOOLEAN NOT NULL,

    CONSTRAINT "WeaponType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weapon" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "attack" INTEGER NOT NULL DEFAULT 1,
    "is_one_hand" BOOLEAN NOT NULL DEFAULT false,
    "weapon_type_id" TEXT NOT NULL,

    CONSTRAINT "Weapon_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Weapon" ADD CONSTRAINT "Weapon_weapon_type_id_fkey" FOREIGN KEY ("weapon_type_id") REFERENCES "WeaponType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
