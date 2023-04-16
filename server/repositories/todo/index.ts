import { InMemoryTodoRepository } from "./InMemoryTodoRepository";
import { SqliteTodoRepository } from "./SqliteTodoRepository";
import { lorem } from "./lorem";
import type { TodoRepository } from "./types";

export const createTodoRepository = async (
  type: "InMemory" | "SQLite" = "SQLite"
): Promise<TodoRepository> => {
  let todoRepository: TodoRepository;

  switch (type) {
    case "InMemory":
      todoRepository = new InMemoryTodoRepository();
      break;
    case "SQLite":
      todoRepository = await SqliteTodoRepository.new();
      break;
    default:
      return type; // never
  }

  // サンプル追加
  lorem.split(/\n/).forEach((title) => todoRepository.add({ title }));

  return todoRepository;
};
