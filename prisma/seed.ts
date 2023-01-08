import { PrismaClient } from "@prisma/client";
import { PRIMARY_REDACTED, SECONDARY_REDACTED } from "~/constants";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  let characterPromises = [];
  for (let { name, image } of Object.values(PRIMARY_REDACTED)) {
    characterPromises.push(
      prisma.role.create({
        data: { type: "primary", name: name, redactedImage: image },
      })
    );
  }

  for (let { name, image } of Object.values(SECONDARY_REDACTED)) {
    characterPromises.push(
      prisma.role.create({
        data: { type: "secondary", name: name, redactedImage: image },
      })
    );
  }

  await prisma.$transaction([...characterPromises]);

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
