import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { RoleCreationSchema } from "../schema/role.schema";
import { BaseCreationClass } from "./basecontroller.controller";
