import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { InvalidTokenError } from "../errors/authentication.errors";
import {
  GetAuthTokenByToken,
  GetAuthTokenByUserId,
  GetRoleByUserAndRole,
} from "../services/users.service";
import { CheckValidToken } from "../utils/jtwTokens";

function _GetTokenFromHeader(req: Request): string {
  /**
   * Receive a request and parse the headers to obtain the authentication
   * token
   *
   * @param req request to be parse
   * @returns string token or raise InvalidTokenError
   * @returns InvalidToken in case of :
   *  - authorization header not be in request
   *  - invalid token type
   *  - null token
   */
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    throw new InvalidTokenError("authorization header not in request");
  }
  const tokenType = authHeader.split(" ")[0];
  const token = authHeader.split(" ")[1];

  if (tokenType !== "Bearer") {
    throw new InvalidTokenError("Invalid token type");
  }

  if (token == null) throw new InvalidTokenError("Token null");
  return token;
}

export async function JwtAuthentication(
  req: Request,
  res: Response,
  next: any
) {
  /**
   * Middleware that checks if the user is authenticated or not
   *
   * @param req user request
   * @param res user response
   * @param next function to retrieve
   *
   * @returns 403 in case of InvalidTokenError
   * @returns 403 in case token not in AuthToken model
   * @returns 403 in case of Token expired
   *
   * @returns next function in case of valid token
   */
  let token = "";
  //Get token from header
  try {
    token = _GetTokenFromHeader(req);
  } catch (error) {
    if (error instanceof InvalidTokenError) {
      return res.status(403).send(error.message);
    }
  }
  //get token from db
  const authToken = await GetAuthTokenByToken(token);
  if (authToken === null) {
    return res.status(403).send("Invalid token");
  }
  //check if is expired
  const isValidToken = CheckValidToken(authToken.created);
  if (!isValidToken) {
    return res.status(403).send("Token expired");
  }
  // return next or raise error
  req.user = authToken.userId;
  return next();
}

export function UserHasPermission(role: string) {
  return async function (req: Request, res: Response, next: any) {
    console.log("pasa por el has permissions");
    if (req.user === null) {
      return res.status(401).send("Invalid user in request");
    }
    //Get user and role
    const hasRole = await GetRoleByUserAndRole(req.user, role);
    if (hasRole.length === 0) {
      return res.status(401).send("User has not permissions to do that");
    }
    return next();
    /**
     * Check if the user has some roles
     *
     */
  };
}

/**
 * Authentication:
 *
 * Db model:
 * AuthToken:
 *  user: User @unique
 *  token: string
 *  expiration_time: datetime
 *
 *
 * Roles
 *  id:
 *  name:
 *  description
 *
 * Group:
 *  id:
 *  name:
 *  description:
 *  roles: Role[]
 *
 * User:
 *  email:
 *  username:
 *  password
 *
 *
 * UserGroups:
 *  user
 *  group
 *
 * UserRole:
 *  user
 *  role
 *
 * Middleware that control roles
 * user has_group_or_permission(group, role)
 *   - if group is not null:
 *      - check if user has group
 *      - return true/false
 *   - if role is not null:
 *      - check if user has role
 *      - return true/false
 *
 *
 * Middleware isAuthenticated
 *   - if token:
 *        verify
 *   - else:
 *      return 403
 *
 *
 * Features:
 *  User can have many roles
 *  User can have one or more groups
 *
 *
 */

/**
 * Login: si el login esta ok, generar un nuevo token con string random.
 * ese token se almacena en la base de datos .
 *  - Verificar si el usuario ya tiene un token, entonces eliminarlo.
 *  - Si no tiene un token, crearlo.
 *
 */
