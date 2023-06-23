# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## Using Docker

1. [Install Docker](https://docs.docker.com/get-docker/) on your machine.
1. Build your container: `docker build -t deadline-nextjs --build-arg NEXT_PUBLIC_CLIENTVAR=clientvar .`.
1. Start your MariaDb container: `docker run --detach --network some-network --name deadline-mariadb --env MARIADB_USER=deadline --env MARIADB_PASSWORD=deadline --env MARIADB_ROOT_PASSWORD=deadline  mariadb:latest`.
1. Run your container: `docker run -p 3000:3000 -e DATABASE_URL="mysql://deadline:deadline@localhost:3306/deadline"  deadline-nextjs`.

You can view your images created with `docker images`.
