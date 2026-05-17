import ErrorResponse from "../helper/errorResponse";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../util/token";
import User from "./user.model";
import { refreshToken } from "./user.controller";

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

export const refreshTokenService = async (
  refreshToken: string,
): Promise<{ newRefreshToken: string; accessToken: string }> => {
  if (!refreshToken) {
    throw new ErrorResponse("Refresh token is required", 401);
  }

  let decoded: TokenPayload;

  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch (error) {
    throw new ErrorResponse("Invalid or expired refresh token", 401);
  }

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new ErrorResponse("User not found", 404);
  }

  const accessToken = generateAccessToken({
    id: user._id.toString(),
    email: user.email,
  });

  const newRefreshToken = generateRefreshToken({
    id: user._id.toString(),
  });

  return {
    newRefreshToken,
    accessToken,
  };
};
