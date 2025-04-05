import { createTRPCRouter } from "../init.js";
import { userRouter } from "./user.js";

export const appRouter = createTRPCRouter({
	user: userRouter,
});

export type AppRouter = typeof appRouter;
