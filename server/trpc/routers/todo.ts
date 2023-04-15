import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { TodoRepositoryByArray } from "~/server/repositories/todo/TodoRepositoryByArray";
import { lorem } from "~/server/repositories/todo/lorem";

const todoRepository = new TodoRepositoryByArray();

lorem.split(/\n/).forEach((title) => todoRepository.add({ title }));

const todoInput = z.object({
  title: z.string(),
});

export const todoRouter = router({
  list: publicProcedure.query(() => {
    return todoRepository.list();
  }),
  findOne: publicProcedure.input(z.number()).query(({ input }) => {
    return todoRepository.findOne(input);
  }),
  add: publicProcedure.input(todoInput).mutation(({ input }) => {
    return todoRepository.add(input);
  }),
  toggle: publicProcedure.input(z.number()).mutation(({ input }) => {
    todoRepository.toggle(input);
  }),
  update: publicProcedure
    .input(
      z.object({
        todoId: z.number(),
        input: todoInput,
      })
    )
    .mutation(({ input: { todoId, input } }) => {
      todoRepository.update(todoId, input);
    }),
  remove: publicProcedure.input(z.number()).mutation(({ input }) => {
    todoRepository.remove(input);
  }),
});
