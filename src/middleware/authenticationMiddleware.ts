import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

export function JwtAuthentication(req: Request, res: Response, next: any) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);

  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}
