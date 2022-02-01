import { Router } from "express";
import { GetAllWeapons, GetWeaponTypes } from "../controller/weapon.controller";
import { BaseCreationClass } from "../controller/basecontroller.controller";
import {
  JwtAuthentication,
  UserHasPermission,
} from "../middleware/authenticationMiddleware";
import { createWeaponSchema } from "../schema/weapon.schema";
import { createWeaponTypeSchema } from "../schema/weaponType.schema";

const weaponRouter = new Router();

//Add authentication middleware
weaponRouter.use(JwtAuthentication);

weaponRouter.get("", UserHasPermission("Player"), GetAllWeapons);
weaponRouter.post("", (req: Request, res: Response) =>
  new BaseCreationClass(
    req,
    res,
    createWeaponSchema,
    "weapon",
    "Weapon created"
  ).post()
);

weaponRouter.get("/weapon-type", GetWeaponTypes);
weaponRouter.post("/weapon-type", (req: Request, res: Response) =>
  new BaseCreationClass(
    req,
    res,
    createWeaponTypeSchema,
    "weaponType",
    "Weapon Type created"
  ).post()
);

export default weaponRouter;
