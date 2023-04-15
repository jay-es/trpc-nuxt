export type Todo = {
  todoId: number;
  title: string;
  completed: boolean;
};

export type TodoInput = Omit<Todo, "todoId" | "completed">;

export interface TodoRepository {
  list(): Todo[];
  findOne(todoId: number): Todo;
  add(input: TodoInput): void;
  toggle(todoId: number): void;
  update(todoId: number, input: TodoInput): void;
  remove(todoId: number): void;
}
