import { prisma } from "~/db.server";

export type { Role } from "@prisma/client";

export function getAllRoles() {
  return prisma.role.findMany();
}

export function getRoleByName(name: string) {
  return prisma.role.findUnique({ where: { name: name } });
}

export async function chooseRole(name: string, userEmail: string) {
  const user = await prisma.user.findUnique({ where: { email: userEmail } });
  await prisma.role.findUnique({ where: { name: name } });

  await prisma.$transaction([
    prisma.role.update({
      where: { name: name },
      data: { userId: user?.id },
    }),
    prisma.user.update({
      where: { email: userEmail },
      data: { roleName: name },
    }),
  ]);
}
