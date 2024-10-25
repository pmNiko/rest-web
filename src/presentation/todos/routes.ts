import { Router } from "express";
import { TodoController } from "./controller";

export class TodoRoutes {
  constructor() {}

  static get routes(): Router {
    const router = Router();
    const todoController = new TodoController();

    router.get("/", todoController.getTodos);
    router.get("/:id", todoController.getTodoByID);

    router.post("/", todoController.createTodo);

    router.put("/:id", todoController.updateTodo);

    router.delete("/:id", todoController.deleteTodo);

    return router;
  }
}
