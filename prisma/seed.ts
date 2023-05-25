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
      name: "Johnny Deep",
      image: "https://i.pravatar.cc/300",
      echeances: {
        create: [
          {
            date: new Date(),
            status: "EN_COURS",
            echeance: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            reference: "REF-1",
            typologie: "INFRASTRUCTRE",
            objet: "OBJET-1",
            note: "NEMO",

            echeancePersonnel: {
              create: [
                {
                  personnel: {
                    create: {
                      nom: "Cuni",
                      email: "cuni.west@localhost",
                      fonction: "Chanteur",
                      prenom: "West",
                      image: "https://i.pravatar.cc/300",
                    },
                  },
                },
                {
                  personnel: {
                    create: {
                      nom: "John",
                      email: "john.beeroot@localhost",
                      fonction: "Acteur",
                      prenom: "Beeroot",
                      image: "https://i.pravatar.cc/300",
                    },
                  },
                },
              ],
            },
          },
          {
            date: new Date(),
            status: "EN_COURS",
            echeance: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4),
            reference: "REF-2",
            typologie: "INFRASTRUCTRE",
            objet: "OBJET-2",
            note: "MAIL",

            echeancePersonnel: {
              create: [
                {
                  personnel: {
                    create: {
                      nom: "Sin",
                      email: "michael.sin@localhost",
                      fonction: "Acteur",
                      prenom: "Michael",
                      image: "https://i.pravatar.cc/300",
                    },
                  },
                },
              ],
            },
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
