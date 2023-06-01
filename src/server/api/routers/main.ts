import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const mainRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.entries.findMany();
  }),
  getLoggedIn: publicProcedure.input(z.object({ user_id: z.string() })).query(({ input, ctx }) => {
    return ctx.prisma.entries.findMany({
      where: {
        user_id: input.user_id,
      },
    });
  }),
  addEntry: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        category: z.number(),
        user: z.string(),
        user_id: z.string(),
        link: z.string(),
      }),
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.entries.create({
        data: {
          name: input.name,
          description: input.description,
          category: input.category,
          user: input.user,
          user_id: input.user_id,
          link: input.link,
        },
      });
    }),

  updateEntry: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        category: z.number(),
        user: z.string(),
        user_id: z.string(),
        link: z.string(),
      }),
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.entries.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          description: input.description,
          category: input.category,
          user: input.user,
          user_id: input.user_id,
          link: input.link,
        },
      });
    }),

  deleteEntry: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.entries.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
