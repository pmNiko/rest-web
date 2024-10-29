import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDTO, UpdateTodoDTO } from "../../domain/dtos";

export class TodoController {
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany({
      select: { id: false, text: true },
    });
    res.json(todos);
  };

  public getTodoByID = async (req: Request, res: Response) => {
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
    const [error, createTodoDTO] = CreateTodoDTO.create(req.body);

    if (error) {
      res.status(400).json({ message: "Body not available!" });
      return;
    }

    const todo = await prisma.todo.create({ data: createTodoDTO! });

    res.status(200).json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    // const { text, completedAt } = req.body;
    const [error, updatedTodoDTO] = UpdateTodoDTO.create({ ...req.body, id });

    if (error) {
      res.status(400).json(error);
      return;
    }

    try {
      const updatedTodo = await prisma.todo.update({
        where: { id: updatedTodoDTO!.id },
        data: updatedTodoDTO!,
      });
      res.status(200).json(updatedTodo);
    } catch (error: any) {
      res.status(404).json({ message: error.message.split("\n").at(-1) });
    }

    // try {
    //   const updatedTodo = await prisma.todo.update({
    //     where: { id },
    //     data: { text, completedAt: completedAt ? new Date(completedAt) : null },
    //   });

    //   res.status(200).json(updatedTodo);
    // } catch (error: any) {
    //   res.status(404).json({ message: error.message.split("\n").at(-1) });
    // }
  };

  public deleteTodo = async (req: Request, res: Response) => {
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
