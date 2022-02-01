import { Express, Request, Response, Router } from "express";
import userRoutes from "./routes/user.routes";
import weaponRouter from "./routes/weapon.routes";
import { authRoutes } from "./routes/authentication.routes";
const baseApi = "/api";

const routes = Router();
routes.use(baseApi + "/weapons", weaponRouter);
routes.use(baseApi + "/user", userRoutes);
routes.use(baseApi + "/auth", authRoutes);
export default routes;
