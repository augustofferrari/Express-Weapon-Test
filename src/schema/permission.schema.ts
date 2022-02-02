import Joi from "joi";
import { ValidationError } from "joi";
import { PrismaClient } from "@prisma/client";

const checkUniquePermission = async (value: string, helpers: any) => {
  const prisma = new PrismaClient();
  const existingPermission = await prisma.permissions.findUnique({
    where: { name: value },
  });
  if (existingPermission === null) {
    return value;
  }
  throw new ValidationError("The permission already exists", "title");
};

export const PermissionCreationSchema = Joi.object({
  name: Joi.string().external(checkUniquePermission).min(3).max(50).required(),
});

export const PermissionGetSchema = Joi.object({
  id: Joi.string().required(),
});
