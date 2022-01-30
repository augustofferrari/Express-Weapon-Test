import { PrismaClient } from "@prisma/client";

export async function SelectAllWeapons() {
  const prisma = new PrismaClient();
  return await prisma.weapon.findMany();
}

export async function SelectWeaponTypes() {
  const prisma = new PrismaClient();
  return await prisma.weaponType.findMany();
}

async function FilterWeapons() {}
