import { Request, Response } from "express";
import { AuthenticateUserService } from "./AuthenticateUserService";
import * as z from "zod";



export const AuthenticateSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export class AuthenticateUserController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { email, password } = AuthenticateSchema.parse(request.body);

		const authenticateUserService = new AuthenticateUserService();

		const { token } = await authenticateUserService.execute({
			email,
			password,
		});
		
		return response.json(token);
	}
}
