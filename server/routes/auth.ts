import { Router } from "express";
import { loginController, registerController } from "../controllers/authController.ts";
import { validateLoginBody, validateRegisterBody } from "../middlewares/authValidation.ts";

const routes = Router();

routes.post("/register", validateRegisterBody, registerController);
routes.post("/login", validateLoginBody, loginController);

export default routes;