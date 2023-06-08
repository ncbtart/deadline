import { prisma } from "../src/server/db";

async function main() {
  await prisma.echeancePersonnel.deleteMany({});
  await prisma.echeance.deleteMany({});
  await prisma.user.deleteMany({});

  await prisma.user.upsert({
    where: {
      email: "johnny.deep@localhost",
    },
    update: {},
    create: {
      email: "johnny.deep@localhost",
      image: "https://i.pravatar.cc/300",
      name: "Johnny Deep",
      echeances: {
        create: [
          {
            date: new Date(),
            status: "EN_COURS",
            echeance: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            reference: "REF-1",
            typologie: "RH",
            objet: "OBJET-1",
            note: "NEMO",
          },
        ],
      },
    },
  });

  await prisma.user.upsert({
    where: {
      email: "johnny.sin@localhost",
    },
    update: {},
    create: {
      email: "johnny.sin@localhost",
      image: "https://i.pravatar.cc/301",
      name: "Johnny Sin",
      echeances: {
        create: [
          {
            date: new Date(),
            status: "EN_COURS",
            echeance: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            reference: "REF-2",
            typologie: "JURIDIQUE",
            objet: "OBJET-2",
            note: "NEMO",
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
