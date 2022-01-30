import { Express, Request, Response, Router } from "express";
import userRoutes from "./routes/user.routes";
import weaponRouter from "./routes/weapon.routes";

const routes = Router();
routes.use("/api/weapons", weaponRouter);
routes.use("/api/user", userRoutes);
export default routes;
