import { Router } from "express";
import { BaseCreationClass } from "../controller/basecontroller.controller";
import { LoginUser, RegisterUser } from "../controller/user.controller";
import { RoleCreationSchema } from "../schema/role.schema";

const userRoutes = Router();
userRoutes.post("/login", LoginUser);
userRoutes.post("/register", RegisterUser);

export default userRoutes;
