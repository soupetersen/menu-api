import { hash } from "bcrypt";
import { AppError } from "../../../errors/AppError";
import { User } from "../../../models/User";

interface IRegisterRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUserService {
  async execute({name, email, password}: IRegisterRequest): Promise<{ id: string }> {
		const userAlreadyExists = await User.exists({ email: email }).catch((err) => {
        throw new AppError("Error to find user!");
    });

		if (userAlreadyExists) {
			throw new AppError("User already exists!");
		}

		const passwordHash = await hash(password, 8);

    const user = await User.create({
      name,
      email,
      password: passwordHash,
    });

    return { id: user.id.toString() };
  }
}