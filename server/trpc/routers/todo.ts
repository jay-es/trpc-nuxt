import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { TodoRepository } from "~/lib/todo";
import { lorem } from "~/lib/lorem";

const todoRepository = new TodoRepository();

lorem.split(/\n/).forEach((title) => todoRepository.add({ title }));

export const todoRouter = router({
  list: publicProcedure.query(() => {
    return todoRepository.list();
  }),
  add: publicProcedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .mutation(({ input }) => {
      return todoRepository.add(input);
    }),
  toggle: publicProcedure.input(z.number()).mutation(({ input }) => {
    todoRepository.toggle(input);
  }),
});
