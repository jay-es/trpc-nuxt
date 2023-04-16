import type { inferAsyncReturnType } from "@trpc/server";
import { createTodoRepository } from "../repositories/todo";

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = async () => ({
  todoRepository: await createTodoRepository(),
});

export type Context = inferAsyncReturnType<typeof createContext>;
