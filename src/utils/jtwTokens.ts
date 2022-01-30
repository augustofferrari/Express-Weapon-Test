import jwt from "jsonwebtoken";
import "dotenv/config";

export function generateAccessToken(username: string) {
  /**
   * This method generates an access token from a user's username
   */
  return jwt.sign({ data: username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
}
