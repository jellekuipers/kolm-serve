import { serve } from "@hono/node-server";
import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

import { auth } from "./lib/auth.js";
import { createTRPCContext } from "./trpc/init.js";
import { appRouter } from "./trpc/router/index.js";

const app = new Hono();

app.use("*", logger());

app.use(
  "*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

const api = new Hono();

api.on(["POST", "GET"], "/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

api.use("/trpc/*", (c, next) =>
  trpcServer({
    createContext: (_opts, c) => createTRPCContext(c),
    endpoint: "/api/trpc",
    router: appRouter,
  })(c, next),
);

api.get("/health", (c) => {
  return c.text("ok");
});

app.route("/api", api);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
