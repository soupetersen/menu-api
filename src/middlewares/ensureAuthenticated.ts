import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";

interface IPayload {
	sub: string;
}

export async function ensureAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction,
) {
	const authToken = request.headers.authorization;

	if (!authToken) {
		throw new AppError("Token missing", 401);
	}

	const [, token] = authToken.split(" ");

	try {
		const { sub: user_id } = verify(
			token,
			process.env.JWT_SECRET!,
		) as IPayload;

		request.user = {
			id: user_id,
		};

		return next();
	} catch (error) {
		throw new AppError("Invalid token!", 401);
	}
}
