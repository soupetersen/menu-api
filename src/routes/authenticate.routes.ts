import { Router } from "express";
import { AuthenticateUserController } from "../modules/users/authenticateUser/AuthenticateUserController";
import { RegisterUserController } from "../modules/users/registerUser/RegisterUserController";



export const authenticateRoute = Router();

const authenticateUserController = new AuthenticateUserController();
const registerUserController = new RegisterUserController();

authenticateRoute.post("/login", authenticateUserController.handle);
authenticateRoute.post("/register", registerUserController.handle);
