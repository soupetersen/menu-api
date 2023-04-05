import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { AppError } from "./errors/AppError";
import env from "dotenv";
import { router } from "./routes";
import path from "path";

const reqPath = path.join(__dirname, '..');
env.config({
	path: process.env.NODE_ENV === "development" ? `${reqPath}/.env.local` : `${reqPath}/.env`,
})

export const app = express();

app.use(express.json());

app.use(router);

app.use(
	(err: Error, request: Request, response: Response, next: NextFunction) => {
		if (err instanceof AppError) {
			return response.status(err.statusCode).json({
				message: err.message,
			});
		}

		return response.status(500).json({
			status: "error",
			message: `Internal Server Error - ${err.message}`,
		});
	},
);
