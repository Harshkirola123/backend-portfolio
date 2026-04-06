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

interface IEducation {
  school: string;
  degree: string;
  fieldOfStudy?: string;
  startDate: Date;
  endDate?: Date;
  isCurrent?: boolean;
  grade?: string;
  description?: string;
  location?: string;
}

interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
  all?: boolean | string;
  search?: string;
}
