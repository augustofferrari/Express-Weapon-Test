import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { GetAuthTokenByUserId } from "../services/users.service";

export function ValidateBearerToken(token: string) {}

export function CheckValidToken(creationDate: Date): boolean {
  /**
   * Receives the token creation time and verify if is still
   * available or not
   */
  const currentTime = new Date();
  const timeDifference = Math.abs(
    currentTime.getTime() - creationDate.getTime()
  );
  if (timeDifference >= process.env.TOKEN_EXPIRATION_TIME) {
    //token expired
    return false;
  }
  return true;
}

export function _NewAccessToken(username: string) {
  /**
   * This method generates an access token from a user's username
   */
  return jwt.sign({ data: username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
}

export async function GenerateAccessToken(userId: string): Promise<string> {
  /**
   * This method receives an userId.
   * Check if the user has a valid token or generate a new one
   * and then return it .
   */
  const prisma = new PrismaClient();
  //Check `if the user has a token
  const authToken = await GetAuthTokenByUserId(userId);
  //Check if the user has a token
  if (authToken === null) {
    //User without token, create new one
    const token = _NewAccessToken(userId);
    const data = { token: token, userId: userId };
    await prisma.authToken.create({ data: data });
    return token;
  } else {
    // check if the token is expired
    const tokenAvailable = CheckValidToken(authToken.created);
    if (tokenAvailable) {
      return authToken.token;
    } else {
      const token = _NewAccessToken(userId);
      const data = { token: token, created: new Date() };
      await prisma.authToken.update({ where: { userId: userId }, data: data });
      return token;
    }
  }
}
