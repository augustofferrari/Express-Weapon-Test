import { Request, Response } from "express";
import {
  SelectAllWeapons,
  SelectWeaponTypes,
} from "../services/weapon.service";
import { PrismaClient } from "@prisma/client";
import Joi from "joi";

export async function GetAllWeapons(req: Request, res: Response) {
  const weapons = await SelectAllWeapons();
  return res.status(200).send(weapons);
}

export async function GetWeaponTypes(req: Request, res: Response) {
  const weaponTypes = await SelectWeaponTypes();
  return res.status(200).send(weaponTypes);
}
