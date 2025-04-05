<div align="center">
  <a href="https://github.com/jellekuipers/kolm-serve">
    <img src="https://raw.githubusercontent.com/jellekuipers/kolm-start/main/public/favicon.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">kolm serve</h3>

  <p align="center">
    Hono server, with better-auth, tRPC and Drizzle ORM.
    <br />
    <a href="https://github.com/jellekuipers/kolm-serve/issues/new?labels=bug">Report Bug</a>
    ·
    <a href="https://github.com/jellekuipers/kolm-serve/issues/new?labels=feature-request">Request Feature</a>
  </p>
</div>

## About The Project

A `hono` server with `better-auth`, `tRPC` and `drizzle-orm`.

- `hono`
- `better-auth`
- `drizzle-orm`
- `tRPC`

Check out <a href="https://github.com/jellekuipers/kolm-start">kolm-start</a>, for a `@tanstack/react-start` starter with `tRPC`, `drizzle-orm`, `better-auth` and `tailwindcss`.

Or <a href="https://github.com/jellekuipers/kolm-start-admin">kolm-start-admin</a>, for a `@tanstack/react-start` + `better-auth` admin starter, with `drizzle-orm`, `tRPC`, `@radix-ui/themes`.

## Getting Started

### Prerequisites

```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo, or use the template
   ```sh
   git clone https://github.com/jellekuipers/kolm-serve.git
   ```
2. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Connect to your database in your `.env`
   ```sh
   BETTER_AUTH_SECRET=
   DATABASE_URL=
   ```
5. Initialize database

   ```sh
   npm run db:push
   ```

6. (optional in development) Seed the database with an admin user

   ```sh
   npm run db:seed
   ```

7. (optional in development) Seed the database with fake users

   ```sh
   npm run db:seed:dev
   ```

8. Start the dev server
   ```sh
   npm run dev
   ```

### Client: better-auth

```
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});
```

### Client: trpc

```
import {
  createTRPCClient,
  httpBatchStreamLink,
} from "@trpc/client";
import superjson from "superjson";

// Import AppRouter from the correct source
import { AppRouter } from "kolm-serve";

const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchStreamLink({
      transformer: superjson,
      url: "http://localhost:3000/api/trpc",
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: "include",
        });
      },
      async headers() {
        // Include request headers
        return headers;
      },
    }),
  ],
});
```

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/amazing-feature`)
3. Commit your Changes (`git commit -m 'Add some amazing-feature'`)
4. Push to the Branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- [tRPC](https://trpc.io/docs)
- [Drizzle ORM](https://orm.drizzle.team/)
- [better-auth](https://www.better-auth.com/)
- [create-t3-app](https://github.com/t3-oss/create-t3-app)
- [Best-README-Template](https://github.com/othneildrew/Best-README-Template)
