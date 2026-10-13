# flynode-demo-nextjs-postgres

A tiny Next.js + Prisma + PostgreSQL app, used to try the database feature on FlyNode.

- `DATABASE_URL` is read from the environment. FlyNode sets it when you add a PostgreSQL database to the app.
- The table is created on start with `prisma db push`.

Deploy it on FlyNode as a Custom app from this repository, with PostgreSQL ticked in the Database section.
