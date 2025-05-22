import type { TRPCRouterRecord } from "@trpc/server";

import { protectedProcedure } from "../init.js";

export const userRouter = {
  me: protectedProcedure.query(({ ctx }) => ctx.session.user),
  getAll: protectedProcedure.query(
    async ({ ctx }) => await ctx.db.query.user.findMany(),
  ),
} satisfies TRPCRouterRecord;
