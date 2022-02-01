import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import { AuthenticationError } from "../errors/authentication.errors";
import { UserLoginSchema } from "../schema/user.schema";
import { GenerateAccessToken } from "../utils/jtwTokens";

const prisma = new PrismaClient();

function AddPrismaMiddleware(prisma: any) {
  prisma.$use(async (params: any, next: any) => {
    if (params.model == "User" && params.action == "create") {
      // Logic only runs for delete action and Post model
      let user = params.args.data;
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(user.password, salt);
      user.password = hash;
    }
    return next(params);
  });
}

export async function GetAuthTokenByUserId(userId: string) {
  const prisma = new PrismaClient();
  return await prisma.authToken.findUnique({ where: { userId: userId } });
}

export async function GetAuthTokenByToken(token: string) {
  const prisma = new PrismaClient();
  return await prisma.authToken.findUnique({ where: { token: token } });
}

export async function GetRoleByUserAndRole(userId: string, roleName: string) {
  const prisma = new PrismaClient();
  return await prisma.userRoles.findMany({
    where: { userId: userId, role: { is: { name: roleName } } },
  });
}

export async function CreateUser(payload: any) {
  const prisma = new PrismaClient();
  AddPrismaMiddleware(prisma);
  const data = await prisma.user.create({ data: payload });
  return data;
}

export async function LoginUserService(payload: any) {
  const prisma = new PrismaClient();
  //Get the user
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  if (user === null) {
    throw new AuthenticationError("Invalid username or password");
  }
  //compare the two passwords with bcypt moduel
  const passwordResult = await bcrypt.compare(payload.password, user.password);
  if (passwordResult) {
    const token = await GenerateAccessToken(user.id);
    return token;
  } else {
    throw new AuthenticationError("Invalid username or password");
  }
}
