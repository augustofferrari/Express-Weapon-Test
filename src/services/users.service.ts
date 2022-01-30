import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import { UserLoginSchema } from "../schema/user.schema";
import { generateAccessToken } from "../utils/jtwTokens";

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

  //compare the two passwords with bcypt moduel
  const passwordResult = bcrypt.compare(payload.password, user.password);
  if (passwordResult) {
    const token = generateAccessToken(payload.email);
    console.log(token);
    return "token";
  } else {
    return "error";
  }
}

//export async function GenerateAccessToken(username: string) {
//  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
//}
