import { Router } from "express";
import { BaseCreationClass } from "../controller/basecontroller.controller";
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
