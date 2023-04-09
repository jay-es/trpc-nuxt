import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { TodoRepository } from "~/lib/todo";

const todoRepository = new TodoRepository();

export const todoRouter = router({
  list: publicProcedure.query(() => {
    return todoRepository.list();
  }),
  toggle: publicProcedure.input(z.number()).mutation(({ input }) => {
    todoRepository.toggle(input);
  }),
});
