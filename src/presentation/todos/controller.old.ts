import { Request, Response } from "express";
import { prisma } from "../../data/postgres";

interface Todo {
  id: number;
  text: string;
  completedAt: Date | null;
}

const todos: Todo[] = [
  { id: 1, text: "Buy Milk", completedAt: new Date() },
  { id: 2, text: "Buy Bread", completedAt: null },
  { id: 3, text: "Buy Butter", completedAt: new Date() },
];

export class TodoController {
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany({
      select: { id: false, text: true },
    });

    res.json(todos);
  };

  public getTodoByID = async (req: Request, res: Response) => {
    // const todo = todos.find((todo) => `${todo.id}` === req.params.id);
    const id = parseInt(req.params.id);

    const todo = await prisma.todo.findUnique({
      select: { id: true, text: true },
      where: { id },
    });

    todo
      ? res.status(200).json(todo)
      : res.status(404).json({ message: `Todo ${id} not found` });
  };

  public createTodo = async (req: Request, res: Response) => {
    const { text } = req.body as { text: string };

    if (!text) {
      res.status(400).json({ message: "Body not available!" });
      return;
    }

    // const todo = { id: todos.length + 1, text, completedAt: null };

    const todo = await prisma.todo.create({ data: { text } });

    // todos.push(todo);

    res.status(200).json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    // const todo = todos.find((todo) => `${todo.id}` === req.params.id);
    const id = parseInt(req.params.id);
    const text = req.body.text;

    // if (!todo) {
    //   res.status(404).json({ message: `Todo ${req.params.id} not found` });
    //   return;
    // }

    // if (text) {
    //   res.status(400).json({ message: "Body not available!" });
    //   return;
    // }

    // todo.text = req.body.text;
    // todo.completedAt = req.body.completedAt
    //   ? new Date(req.body.completedAt)
    //   : todo.completedAt;

    // res.status(200).json({ todoUpdated: todo });

    try {
      const updatedTodo = await prisma.todo.update({
        where: { id },
        data: { text },
      });

      res.status(200).json({ updatedTodo });
    } catch (error: any) {
      res.status(404).json({ message: error.message.split("\n").at(-1) });
    }
  };

  public deleteTodo = async (req: Request, res: Response) => {
    // const id = +req.params.id;
    // const todo = todos.find((todo) => todo.id === id);

    // if (!todo) {
    //   res.status(404).json({ message: `Todo ${id} not found` });
    //   return;
    // }

    // todos.splice(todos.indexOf(todo), 1);

    // res.status(200).json(todo);

    const id = parseInt(req.params.id);

    try {
      const ok = await prisma.todo.delete({
        where: { id },
      });

      res.status(200).json({ message: ok });
    } catch (error: any) {
      res.status(404).json({ message: error.message.split("\n").at(-1) });
    }
  };
}
