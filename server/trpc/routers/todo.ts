import { z } from "zod";
import { publicProcedure, router } from "../trpc";

const todoInput = z.object({
  title: z.string().max(100),
});

export const todoRouter = router({
  list: publicProcedure.query(({ ctx }) => {
    return ctx.todoRepository.list();
  }),
  findOne: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.todoRepository.findOne(input);
  }),
  add: publicProcedure.input(todoInput).mutation(({ ctx, input }) => {
    return ctx.todoRepository.add(input);
  }),
  toggle: publicProcedure.input(z.number()).mutation(({ ctx, input }) => {
    ctx.todoRepository.toggle(input);
  }),
  update: publicProcedure
    .input(
      z.object({
        todoId: z.number(),
        input: todoInput,
      })
    )
    .mutation(({ ctx, input: { todoId, input } }) => {
      ctx.todoRepository.update(todoId, input);
    }),
  remove: publicProcedure.input(z.number()).mutation(({ ctx, input }) => {
    ctx.todoRepository.remove(input);
  }),
});
