# Blog

A full-stack blog application built with React, TypeScript, Express, and PostgreSQL. It includes user registration and login, post management, comments, likes, tags, profile settings, and an admin dashboard with statistics.

## Project structure

- `client/` — React frontend using Redux Toolkit, Chakra UI, and React Router.
- `auth-backend/` — Express API with JWT authentication and Prisma database access.
- `auth-backend/prisma/` — Database schema and admin user seed script.

Both applications include Docker Compose files and Kubernetes deployment/service manifests.

## Local setup

You need Node.js and npm (the Dockerfiles use Node.js 20), plus Docker Compose to run the included PostgreSQL 14 database. Run the commands below from the repository root unless otherwise stated.

### 1. Configure the backend

Create `auth-backend/.env` with the following development settings. If the file already exists, update the relevant values:

```dotenv
SERVICE_ENV=local
SERVICE_PORT=3000
SERVICE_LOGGER=true
JWT_SECRET=replace-with-a-long-random-secret

POSTGRES_USER=blog
POSTGRES_PASSWORD=blog_dev_password
POSTGRES_DB=blog
DATABASE_URL=postgresql://blog:blog_dev_password@localhost:5436/blog?schema=public

API_ADMIN_EMAIL=admin@example.com
API_ADMIN_PASSWORD=replace-with-your-admin-password
```

Replace the placeholder secrets before running the app. Keep `.env` files out of version control; they are already ignored. `SERVICE_ENV` accepts `local`, `dev`, `release`, or `prod`.

### 2. Start the database and API

```sh
cd auth-backend
npm ci
docker compose up -d db
npx prisma generate
npx prisma db push
npm run dev
```

Wait for PostgreSQL to be ready before running `prisma db push`. The database is exposed on port `5436`, and the API runs at `http://localhost:3000`. Opening that URL returns a welcome JSON response.

To create the optional admin account, run this in another terminal from `auth-backend/`, after configuring `API_ADMIN_EMAIL` and `API_ADMIN_PASSWORD`:

```sh
npx prisma db seed
```

The seed script creates the account if its email does not already exist; it does not update an existing account's password or role.

### 3. Start the frontend

Create `client/.env`:

```dotenv
PORT=4000
REACT_APP_API_URL=http://localhost:3000
```

In a separate terminal, from the repository root:

```sh
cd client
npm ci
npm start
```

Open `http://localhost:4000`. Register a user or sign in with the seeded admin account.

Set `REACT_APP_API_URL` to the API origin without a trailing slash or `/v1` suffix; request paths already include `v1`. Without this setting, the frontend defaults to `http://localhost:3001`. Restart the frontend after changing its environment file.

## Available commands

Run each command from the indicated directory.

| Directory | Command | Purpose |
| --- | --- | --- |
| `client/` | `npm start` | Start the frontend development server |
| `client/` | `npm run build` | Build the frontend into `build/` |
| `client/` | `npm test` | Start the React test runner |
| `auth-backend/` | `npm run dev` | Start the API with automatic reload |
| `auth-backend/` | `npm start` | Run the API from TypeScript |
| `auth-backend/` | `npm run build` | Compile the API into `dist/` |
| `auth-backend/` | `npm test` | Run the Mocha test suite |
| `auth-backend/` | `npm run checkPrettier` | Check formatting |
| `auth-backend/` | `npx prisma studio` | Open the database browser |

Backend login tests access the database and create/delete test users; use a separate test database when running them.

## API routes

The API mounts these route groups under `/v1`:

| Prefix | Purpose |
| --- | --- |
| `/v1/auth` | Registration, login, and user management |
| `/v1/post` | Blog posts |
| `/v1/comment` | Comments |
| `/v1/like` | Likes |
| `/v1/tag` | Tags |
| `/v1/count` | Dashboard statistics |

Protected requests use `Authorization: Bearer <token>`.

## Container configuration

The backend Compose file maps PostgreSQL to host port `5436` and the API to port `3000`. When running the API inside Compose, its `DATABASE_URL` must use `db:5432` instead of `localhost:5436`.

The backend container starts with `npm run start:prod`, which runs `prisma migrate deploy` before launching the compiled API.

The frontend Compose file maps port `4000` and runs the development server, so keep `PORT=4000` in `client/.env`. Its API URL must be reachable from the browser. Review image names and environment/secret references in the Kubernetes manifests before deploying to your own cluster.