import { PrismaClient } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resources.errors";
export async function GetPermissionById(permissionId: string) {
  const prisma = new PrismaClient();
  const permission = await prisma.permissions.findUnique({
    where: { id: permissionId },
  });
  if (permission == null) {
    throw new ResourceNotFoundError("Permission not found");
  } else {
    return permission;
  }
}
