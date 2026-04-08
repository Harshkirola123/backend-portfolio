import { Schema } from "mongoose";

enum EMPLOYMENT_TYPE {
  FULL_TIME = "full-time",
  PART_TIME = "part-time",
  INTERNSHIP = "internship",
  CONTRACT = "contract",
  FREELANCE = "freelance",
}

const ExperienceSchema = new Schema<IExperience>({
  companyName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  employmentType: {
    type: String,
    enum: Object.values(EMPLOYMENT_TYPE),
    required: true,
  },
  location: {
    type: String,
    default: "",
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  isCurrent: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    default: "",
  },
  responsibilities: {
    type: [String],
    default: [],
  },
  technologies: {
    type: [String],
    default: [],
  },
});

export default ExperienceSchema;
