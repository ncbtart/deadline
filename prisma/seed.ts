import { prisma } from "../src/server/db";

async function main() {
  await prisma.echeancePersonnel.deleteMany({});
  await prisma.personnel.deleteMany({});
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

            echeancePersonnel: {
              create: [
                {
                  personnel: {
                    create: {
                      nom: "Cuni West",
                      email: "cuni.west@localhost",
                      fonction: "Chanteur",
                      prenom: "West",
                      image: "https://i.pravatar.cc/301",
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
                      image: "https://i.pravatar.cc/302",
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
            typologie: "JURIDIQUE",
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
                      prenom: "Johnny",
                      image: "https://i.pravatar.cc/303",
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
