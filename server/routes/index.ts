import type { Request, Response } from "express";
import { Router } from "express";
import authRoutes from "./auth.ts";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  res.send("Teste");
});

routes.use("/auth", authRoutes);

export default routes;