import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import Joi from "joi";
import { ValidationError } from "joi";

export class BaseCreationClass {
  req: Request;
  res: Response;
  schema: Joi.object;
  model: string = "";
  responseMessage: string = "";

  constructor(
    req: Request,
    res: Response,
    schema: Joi.object,
    model: string,
    responseMessage: string
  ) {
    this.req = req;
    this.res = res;
    this.schema = schema;
    this.model = model;
    this.responseMessage = responseMessage;
  }

  async post() {
    try {
      const { error, value } = await this.schema.validateAsync(this.req.body);
      if (error === undefined) {
        const prisma = new PrismaClient();
        const object = await prisma[this.model].create({ data: this.req.body });
        return this.res.status(200).send(this.responseMessage);
        //its ok, continue with the post
      } else {
        return this.res.status(400).send(error.details);
      }
    } catch (e: any) {
      if (e instanceof ValidationError) {
        return this.res.status(400).send(e.details.message);
      } else {
        return this.res.status(500).send(e.errors);
      }
    }
  }
}
