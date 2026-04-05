import ErrorResponse from "../helper/errorResponse";
import { generateAccessToken, generateRefreshToken } from "../util/token";
import User from "./user.model";

export const createUser = async (data: Partial<IUser>) => {
  const existingUser = await User.findOne({ email: data.email });

  if (existingUser) {
    throw new ErrorResponse("User already exists", 400);
  }

  const user = await User.create(data);
  return user;
};

export const loginService = async (
  data: LoginInput,
): Promise<LoginResponse> => {
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user) {
    throw new ErrorResponse("User not found", 404);
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ErrorResponse("Invalid credentials", 401);
  }

  const accessToken = generateAccessToken({
    id: user._id.toString(),
    email: user.email,
  });

  const refreshToken = generateRefreshToken({
    id: user._id.toString(),
  });

  return {
    user: {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
};
