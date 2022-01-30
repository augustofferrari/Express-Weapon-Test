import { Request, Response, NextFunction } from "express";
import { Joi } from "joi";

const validate =
  (schema: Joi.object) => (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    try {
      schema.validate(body);
    } catch (e: any) {
      return res.status(400).send(e.errors);
    }
  };
export default validate;
