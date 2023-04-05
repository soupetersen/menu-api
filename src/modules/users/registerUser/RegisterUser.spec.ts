import mongoose from "mongoose";
import { AppError } from "../../../errors/AppError";
import { IRegisterUserDTO } from "../dtos/IRegisterUserDTO";
import { RegisterUserService } from "../registerUser/RegisterUserService";
import { MongoMemoryServer } from 'mongodb-memory-server';

let registerUserService: RegisterUserService;

describe("Create User", () => {
	beforeAll(async () => {
		const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

		await mongoose.connect(mongoUri);

		registerUserService = new RegisterUserService();
	});

	afterAll(async () => {
		await mongoose.disconnect();
		await mongoose.connection.close();
	});

	it("should be able to create an user", async () => {
		const user: IRegisterUserDTO = {
			name: "User Test",
			email: "user@test.com",
			password: "12345",
		};

		const result = await registerUserService.execute(user);

		expect(result).toHaveProperty("id");
	});

	it("should not be able to create account if account already exists", async () => {
		expect(async () => {
			await registerUserService.execute({
				email: "false@test.com",
				name: "user test error",
				password: "1234",
			});

			await registerUserService.execute({
				email: "false@test.com",
				name: "user test error",
				password: "1234",
			});

		}).rejects.toBeInstanceOf(AppError);
	});
});
