interface IUser {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  comparePassword(candidatePassword: string): Promise<boolean>;
}

interface LoginInput {
  email: string;
  password: string;
}

type LoginResponse = {
  user: {
    id: string;
    email: string;
    role: string;
  };
  accessToken: string;
  refreshToken: string;
};

type TokenPayload = {
  id: string;
  email?: string;
};

interface AuthRequest extends Request {
  user?: TokenPayload;
}
