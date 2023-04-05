import { compare } from "bcrypt";
import { AppError } from "../../../errors/AppError";
import { User } from "../../../models/User";
import jwt from "jsonwebtoken";

interface IAuthenticateRequest {
	email: string;
	password: string;
}

export class AuthenticateUserService {
  async execute({email, password}: IAuthenticateRequest): Promise<string> {
    if (!email) {
			throw new AppError("Email is required!");
		}

		if (!password) {
			throw new AppError("Password is required!");
		}

		const userModel = await User.findOne( { email: email });

		if (!userModel) {
			throw new AppError("User does not exists!");
		}

		const passworkMatch = compare(password, userModel.password!);

		if (!passworkMatch) {
			throw new AppError("Password does not match!");
		}

    const token = jwt.sign({ id: userModel.id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    return token;
	
  }
}