import { serve } from "@hono/node-server";
import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

import { auth } from "./lib/auth.js";
import { createTRPCContext } from "./trpc/init.js";
import { appRouter } from "./trpc/router/index.js";

const app = new Hono();

app.use(
	"/api/*",
	cors({
		allowMethods: ["POST", "GET", "OPTIONS"],
		credentials: true,
		origin: ["http://example.com"],
	}),
);

app.on(["POST", "GET"], "/api/auth/*", (c) => {
	return auth.handler(c.req.raw);
});

app.use("/api/trpc/*", (c, next) =>
	trpcServer({
		createContext: (_opts, c) => createTRPCContext(c),
		endpoint: "/api/trpc",
		router: appRouter,
	})(c, next),
);

app.get("/api/health", (c) => {
	return c.text("ok");
});

serve(
	{
		fetch: app.fetch,
		port: 3000,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
