export type Todo = {
  todoId: number;
  title: string;
  completed: boolean;
};

export type TodoInput = Omit<Todo, "todoId" | "completed">;

export class TodoRepository {
  private todos: Todo[] = [];
  private count = 0;

  list() {
    return this.todos;
  }

  findOne(todoId: number) {
    const todo = this.todos.find((v) => v.todoId === todoId);

    if (!todo) throw new Error("ToDo がありません");

    return todo;
  }

  add(input: TodoInput) {
    this.todos.push({
      todoId: ++this.count,
      completed: false,
      ...input,
    });
  }

  toggle(todoId: number) {
    const todo = this.todos.find((v) => v.todoId === todoId);

    if (!todo) throw new Error("ToDo がありません");

    todo.completed = !todo.completed;
  }

  update(todoId: number, input: TodoInput) {
    const todo = this.todos.find((v) => v.todoId === todoId);

    if (!todo) throw new Error("ToDo がありません");

    Object.assign(todo, input);
  }

  remove(todoId: number) {
    const index = this.todos.findIndex((v) => v.todoId === todoId);

    if (index === -1) throw new Error("ToDo がありません");

    this.todos.splice(index, 1);
  }
}
