import { Request, Response } from "express";

const todos = [
  { id: 1, text: "Buy Milk", completedAt: new Date() },
  { id: 2, text: "Buy Bread", completedAt: null },
  { id: 3, text: "Buy Butter", completedAt: new Date() },
];

export class TodoController {
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    res.json(todos);
  };

  public getTodoByID = (req: Request, res: Response) => {
    const todo = todos.find((todo) => `${todo.id}` === req.params.id);

    todo
      ? res.status(200).json(todo)
      : res.status(404).json({ message: `Todo ${req.params.id} not found` });
  };

  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body;

    const todo = text && { id: todos.length + 1, text, completedAt: null };

    todos.push(todo);

    todo
      ? res.status(200).json(todo)
      : res.status(400).json({ message: "Body not available!" });
  };

  public updateTodo = (req: Request, res: Response) => {
    const todo = todos.find((todo) => `${todo.id}` === req.params.id);

    if (!todo) {
      res.status(404).json({ message: `Todo ${req.params.id} not found` });
      return;
    }

    if (!req.body.text) {
      res.status(400).json({ message: "Body not available!" });
      return;
    }

    todo.text = req.body.text;
    todo.completedAt = req.body.completedAt
      ? new Date(req.body.completedAt)
      : todo.completedAt;

    res.status(200).json({ todoUpdated: todo });
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    const todo = todos.find((todo) => todo.id === id);

    if (!todo) {
      res.status(404).json({ message: `Todo ${id} not found` });
      return;
    }

    todos.splice(todos.indexOf(todo), 1);

    res.status(200).json(todo);
  };
}
