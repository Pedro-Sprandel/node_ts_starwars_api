import { Router } from "express";
import { registerController } from "../controllers/auth";

const routes = Router();

routes.post("/register", registerController);

export default routes;