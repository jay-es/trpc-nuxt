export type Todo = {
  todoId: number;
  title: string;
  completed: boolean;
};

export type TodoInput = Omit<Todo, "todoId" | "completed">;

type Awaitable<T> = T | Promise<T>;

export interface TodoRepository {
  list(): Awaitable<Todo[]>;
  findOne(todoId: number): Awaitable<Todo>;
  add(input: TodoInput): Awaitable<void>;
  toggle(todoId: number): Awaitable<void>;
  update(todoId: number, input: TodoInput): Awaitable<void>;
  remove(todoId: number): Awaitable<void>;
}
