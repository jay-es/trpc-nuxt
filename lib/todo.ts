export type Todo = {
  todoId: number;
  title: string;
  completed: boolean;
  removed: boolean;
};

export type TodoInput = Omit<Todo, "todoId" | "completed" | "removed">;

export class TodoRepository {
  private todos: Todo[] = [];
  private count = 0;

  list() {
    return this.todos.filter((v) => !v.removed);
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
      removed: false,
      ...input,
    });
  }

  toggle(todoId: number) {
    const todo = this.findOne(todoId);

    todo.completed = !todo.completed;
  }

  update(todoId: number, input: TodoInput) {
    const todo = this.findOne(todoId);

    Object.assign(todo, input);
  }

  remove(todoId: number) {
    const todo = this.findOne(todoId);

    todo.removed = true;
  }
}
