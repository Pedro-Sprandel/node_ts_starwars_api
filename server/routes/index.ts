import { Router, Request, Response } from "express";
import authRoutes from "./auth.ts";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  res.send("AAAA");
});

routes.use("/auth", authRoutes);

export default routes;