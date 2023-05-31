import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure.input(z.object({ text: z.string() })).query(({ input }) => {
    return {
      greeting: `Hello ${input.text}`,
    };
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
  addUser: publicProcedure.input(z.object({ name: z.string(), email: z.string() })).mutation(({ input, ctx }) => {
    return ctx.prisma.example.create({ data: { name: input.name, email: input.email } });
  }),
});
