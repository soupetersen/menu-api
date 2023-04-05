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
		const userAlreadyExists = await User.exists({ email: email });

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