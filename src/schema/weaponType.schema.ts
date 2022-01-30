import Joi from "joi";

import { PrismaClient } from "@prisma/client";

export const createWeaponTypeSchema = Joi.object({
  name: Joi.string().min(3).max(200).required(),
  size: Joi.string().min(3).max(600).required(),
  isRangedWeapon: Joi.boolean().required(),
});
