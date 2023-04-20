import type { CreationOptional, Model } from "sequelize";
import { Sequelize, DataTypes } from "sequelize";
import type { Todo, TodoInput, TodoRepository } from "./types";

interface TodoModel extends Model<Todo, TodoInput> {
  todoId: CreationOptional<number>;
  title: string;
  completed: boolean;
}

export class SqliteTodoRepository implements TodoRepository {
  private TodoModel;

  private constructor() {
    const sequelize = new Sequelize("sqlite::memory:");
    this.TodoModel = sequelize.define<TodoModel>("Todo", {
      todoId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      title: {
        type: DataTypes.TEXT,
        validate: {
          len: [1, 100],
        },
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    });
  }

  static async new(): Promise<SqliteTodoRepository> {
    const todoRepository = new SqliteTodoRepository();
    await todoRepository.TodoModel.sync();
    return todoRepository;
  }

  list() {
    return this.TodoModel.findAll();
  }

  async findOne(todoId: number) {
    const todo = await this.TodoModel.findByPk(todoId);

    if (!todo) throw new Error("ToDo がありません");

    return todo;
  }

  async add(input: TodoInput) {
    await this.TodoModel.create(input);
  }

  async toggle(todoId: number) {
    const todo = await this.findOne(todoId);

    todo.completed = !todo.completed;

    await todo.save();
  }

  async update(todoId: number, input: TodoInput) {
    const todo = await this.findOne(todoId);

    await todo.update(input);

    await todo.save();
  }

  async remove(todoId: number) {
    const todo = await this.findOne(todoId);

    await todo.destroy();
  }
}
