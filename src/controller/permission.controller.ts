import { Request, Response } from "express";
import {
  PermissionCreationSchema,
  PermissionGetSchema,
} from "../schema/permission.schema";
import { PrismaClient } from "@prisma/client";
import { ValidationError } from "joi";
import { GetPermissionById } from "../services/permission.service";
import { ResourceNotFoundError } from "../errors/resources.errors";

export async function CreatePermission(req: Request, res: Response) {
  try {
    const { error, value } = await PermissionCreationSchema.validateAsync(
      req.body
    );
    if (error === undefined) {
      const prisma = new PrismaClient();
      const object = await prisma.permissions.create({ data: req.body });
      return res.status(200).send(object);
      //its ok, continue with the post
    } else {
      return res.status(400).send(error.details);
    }
  } catch (e: any) {
    if (e instanceof ValidationError) {
      return res.status(400).send(e.message);
    } else {
      return res.status(500).send(e.errors);
    }
  }
}

export async function GetPermission(req: Request, res: Response) {
  /**
   * Return a permission by id
   */
  const { error, value } = PermissionGetSchema.validate(req.params);
  if (error === undefined) {
    try {
      const permission = await GetPermissionById(req.params.id);
      return res.status(200).send(permission);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).send("Permission not found");
      }
      return res.status(500).send("Service error");
    }
  } else {
    return res.status(400).send(error.details);
  }
}

export async function GetPermissions(req: Request, res: Response) {}
