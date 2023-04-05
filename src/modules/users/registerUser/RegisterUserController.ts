import { Request, Response } from "express";
import { AppError } from "../../../errors/AppError";
import { RegisterUserService } from "./RegisterUserService";

export class RegisterUserController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { name, email, password } = request.body;

		const registerUserService = new RegisterUserService();

		await registerUserService.execute({
			name,
			email,
			password,
		});
	
		return response.status(201).send();
	}
}
