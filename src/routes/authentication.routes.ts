import { Router } from "express";
import { BaseCreationClass } from "../controller/basecontroller.controller";
import {
  CreatePermission,
  GetPermission,
  GetPermissions,
} from "../controller/permission.controller";
import { RoleCreationSchema } from "../schema/role.schema";

export const authRoutes = new Router();
authRoutes.post("/role", (req: Request, res: Response) =>
  new BaseCreationClass(
    req,
    res,
    RoleCreationSchema,
    "role",
    "Role created"
  ).post()
);

authRoutes.get("/permission/:id", GetPermission);

authRoutes.post("/permission", CreatePermission);

authRoutes.get("/permissions", (req: Request, res: Response) => GetPermissions);
