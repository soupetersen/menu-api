import { hash } from "bcrypt";
import { AppError } from "../../../errors/AppError";
import { User } from "../../../models/User";

interface IRegisterRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUserService {
  async execute({name, email, password}: IRegisterRequest): Promise<void> {
    if (!name) {
			throw new AppError("Name is required!");
		}
		
		if (!email) {
			throw new AppError("Email is required!");
		}

		if (!password) {
			throw new AppError("Password is required!");
		}

		const userAlreadyExists = await User.findOne({ email: email });

		if (userAlreadyExists) {
			throw new AppError("User already exists!");
		}

		const passwordHash = await hash(password, 8);

    try {
        await User.create({
          name,
          email,
          password: passwordHash,
        });
    } catch (err) {
      throw new AppError("Error: " + err);
    }
  }
}