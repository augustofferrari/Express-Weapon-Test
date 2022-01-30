import Joi from "joi";

import { PrismaClient } from "@prisma/client";

const checkWeaponTypeExists = (value: string, helper: any) => {
  const client = new PrismaClient();
  const weaponType = client.weaponType.findUnique({
    where: {
      id: value,
    },
  });
  let weaponObject = null;
  weaponType.then(
    (weaponObject = (result: any) => {
      console.log("RESULT");
      console.log(result);
      return result;
    })
  );

  console.log(weaponObject);

  if (weaponObject == null) {
    return helper.message("The weapon type does not exist");
  } else {
    return value;
  }
};

export const createWeaponSchema = Joi.object({
  name: Joi.string().min(3).max(200).required(),
  description: Joi.string().min(3).max(600).required(),
  price: Joi.number().min(0).max(100000).required(),
  attack: Joi.number().integer().min(1).max(4000).required(),
  isOneHand: Joi.boolean().required(),
  weaponTypeId: Joi.string()
    .custom(checkWeaponTypeExists, "Weapon Type")
    .required(),
});
