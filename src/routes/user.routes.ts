import { Router } from "express";
import { LoginUser, RegisterUser } from "../controller/user.controller";

const userRoutes = Router();
userRoutes.post("/login", LoginUser);
userRoutes.post("/register", RegisterUser);

export default userRoutes;
