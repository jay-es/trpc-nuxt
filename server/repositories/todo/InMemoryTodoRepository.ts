import type { Todo, TodoInput, TodoRepository } from "./types";

export class InMemoryTodoRepository implements TodoRepository {
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
    const todo = this.findOne(todoId);

    todo.completed = !todo.completed;
  }

  update(todoId: number, input: TodoInput) {
    const todo = this.findOne(todoId);

    Object.assign(todo, input);
  }

  remove(todoId: number) {
    const todo = this.findOne(todoId);
    const index = this.todos.indexOf(todo);

    this.todos.splice(index, 1);
  }
}
