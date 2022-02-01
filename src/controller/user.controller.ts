import { Request, Response } from "express";
import { AuthenticationError } from "../errors/authentication.errors";
import { UserLoginSchema, UserSchema } from "../schema/user.schema";
import { CreateUser, LoginUserService } from "../services/users.service";

export async function RegisterUser(req: Request, res: Response) {
  const { error, data } = UserSchema.validate(req.body);
  console.log(error);
  if (error === undefined) {
    const data = await CreateUser(req.body);
    res.status(200).send(data);
  } else {
    return res.status(400).send(error.details);
  }
}

export async function LoginUser(req: Request, res: Response) {
  const { error, data } = UserLoginSchema.validate(req.body);
  if (error === undefined) {
    try {
      const data = await LoginUserService(req.body);
      return res.status(200).send(data);
    } catch (error) {
      if (error instanceof AuthenticationError) {
        return res.status(401).send(error.message);
      }
      console.log(error);
      return res.status(500).send("error");
    }
  } else {
    return res.status(400).send(error.details);
  }
}
