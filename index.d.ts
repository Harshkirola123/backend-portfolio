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
  isActive?: boolean | string;
}

interface ICertification {
  title: string;
  organization: string;
  issueDate: Date;
  expirationDate?: Date;
  credentialId?: string;
  credentialURL?: string;
  skills?: string[];
  description?: string;
  certificateImage?: string;
  isActive?: boolean;
}
interface IExperience {
  companyName: string;
  role: string;
  employmentType:
    | "fullTime"
    | "partTime"
    | "internship"
    | "contract"
    | "freelance";

  location?: string;
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
  description?: string;
  responsibilities?: string[];
  technologies?: string[];
}

interface IProject {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  images?: string[];
  status?: "completed" | "in-progress";
}

interface IProfile {
  name: string;
  title: string;
  bio?: string;

  skills: string[];

  location?: string;

  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };

  profileImage?: string;
  resumeUrl?: string;

  createdAt?: Date;
  updatedAt?: Date;
}
