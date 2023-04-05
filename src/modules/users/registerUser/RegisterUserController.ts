import { Request, Response } from "express";
import { RegisterUserService } from "./RegisterUserService";
import * as z from "zod";

const registerUserSchema = z.object({
	email: z.string().email(),
	password: z.string(),
	name: z.string(),
});

export class RegisterUserController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { name, email, password } = registerUserSchema.parse(request.body);

		const registerUserService = new RegisterUserService();

		await registerUserService.execute({
			name,
			email,
			password,
		});
	
		return response.status(201).send();
	}
}
