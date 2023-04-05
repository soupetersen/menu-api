import { compare } from "bcrypt";
import { AppError } from "../../../errors/AppError";
import { User } from "../../../models/User";
import jwt from "jsonwebtoken";

interface IAuthenticateRequest {
	email: string;
	password: string;
}

export class AuthenticateUserService {
  async execute({email, password}: IAuthenticateRequest): Promise<{token: string}> {
		const userModel = await User.findOne({ email }).catch((err) => {
			throw new AppError("Error to find user!");
		});

		if (!userModel) {
			throw new AppError("User does not exists!");
		}

		const passworkMatch = await compare(password, userModel.password);

		if (!passworkMatch) {
			throw new AppError("Password does not match!");
		}

    const token = jwt.sign({ id: userModel.id }, process.env.JWT_SECRET ?? "s3cr3t", {
      expiresIn: "1d",
    });

    return { token };
  }
}