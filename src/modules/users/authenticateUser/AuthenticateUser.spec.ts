import mongoose from "mongoose";
import { AppError } from "../../../errors/AppError";
import { IRegisterUserDTO } from "../dtos/IRegisterUserDTO";
import { RegisterUserService } from "../registerUser/RegisterUserService";
import { AuthenticateUserService } from "./AuthenticateUserService";
import { MongoMemoryServer } from 'mongodb-memory-server';

let authenticateUserService: AuthenticateUserService;
let registerUserService: RegisterUserService;

describe("Authenticate User", () => {
	beforeAll(async () => {
		const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
		
		await mongoose.connect(mongoUri);

		authenticateUserService = new AuthenticateUserService();
		registerUserService = new RegisterUserService();
	});

	afterAll(async () => {
		await mongoose.disconnect();
		await mongoose.connection.close();
	});

	it("should be able to authenticate an user", async () => {
		const user: IRegisterUserDTO = {
			name: "User Test",
			email: "user@test.com",
			password: "12345",
		};

		await registerUserService.execute(user);

		const result = await authenticateUserService.execute({
			email: user.email,
			password: user.password,
		});

		expect(result).toHaveProperty("token");
	});

	it("should not be able to authenticate an nonexistent user", async () => {
		expect(async () => {
			await authenticateUserService.execute({
				email: "false@test.com",
				password: "1234",
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to authenticate with incorrect password", async () => {
		expect(async () => {
			const user: IRegisterUserDTO = {
				email: "false@test.com",
				name: "user test error",
				password: "1234",
			};

			await registerUserService.execute(user);

			await authenticateUserService.execute({
				email: user.email,
				password: "incorrectPassword",
			});
		}).rejects.toBeInstanceOf(AppError);
	});
});
