<p align="center">
  <img src="https://github.com/itsyoboieltr/dbest-stack/assets/72046715/b04f7074-80e7-4af8-bdcd-5ce532cca213" width="250" alt="DBEST stack">
</p>

<h1 align="center">
  DBEST stack
</h1>

The `DBEST` stack is a bun-based 🔥 `BLAZINGLY FAST` 🔥 full-stack `100% type-safe` web development solution that provides `everything` you need to build a `production-ready` web app based on the performant and scalable Next.js meta-framework. It consists of:

- [Drizzle](https://orm.drizzle.team)
- [Bun](https://bun.sh)
- [Elysia](https://elysiajs.com)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com)

## Creating a project

Create a new project

```bash
bun create itsyoboieltr/dbest-stack
```

Optionally specify a name for the destination folder. If no destination is specified, the name `dbest-stack` will be used.

```bash
bun create itsyoboieltr/dbest-stack my-app
```

Bun will perform the following steps:

- Download the `template`
- Copy all template files into the `destination folder`
- Install dependencies with `bun i`.
- Initialize a fresh Git repo. Opt out with the `--no-git` flag.

## Developing

You can start the `development server` with:

```bash
bun dev
```

## Building

Build for `production` by running the following command:

```bash
bun run build
```

## Running

Run in `production` by running the following command:

```bash
bun start
```

## Database

In case your database schema does not match the schema defined by `drizzle`, then the database needs to be synchronized. This can be done by running the following command:

```bash
bun push
```

In addition, `drizzle studio` can be used to connect to the database and browse, add, delete and update data based on the declared `drizzle schema`.

```bash
bun studio
```

## Environment variables ([.env](.env.example))

- `PORT`: port that the application runs on. Default: `3000`

- `DATABASE_USER`: database user for Postgres. Default: `postgres`

- `DATABASE_PASSWORD`: database password for Postgres. Default: `example`

- `DATABASE_NAME`: database name for Postgres. Default: `dbest`

- `DATABASE_URL`: database connection URL for Postgres. Default `memory://dbest`

- `DATABASE_BACKUP_PATH`: path where the database backups are stored. Default: `$HOME/backup`

- `COMPOSE_PROFILES`: profiles for `docker compose`. Default: `development`
  - In a production setting, you might want to enable backups for the database. This can be done by setting the `COMPOSE_PROFILES` environment variable to `production`.

## Deployment

Using the [Dockerfile](Dockerfile) or the [docker-compose.yml](docker-compose.yml) file, the application can be deployed to any `docker host`. The following command will build the `docker image` and start the application.

```bash
docker compose up -d
```

To stop the application, run the following command:

```bash
docker compose down
```
