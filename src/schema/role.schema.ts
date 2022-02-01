import Joi from "joi";
import { ValidationError } from "joi";
import { PrismaClient } from "@prisma/client";

const checkRoleAlreadyExists = async (value: string, helpers: any) => {
  const prisma = new PrismaClient();
  const existingRole = await prisma.role.findUnique({ where: { name: value } });
  if (existingRole === null) {
    return value;
  }
  throw new ValidationError("The role already exists", "title");
};

export const RoleCreationSchema = Joi.object({
  name: Joi.string().external(checkRoleAlreadyExists).min(3).max(50).required(),
  description: Joi.string().min(5).max(120).required(),
});
