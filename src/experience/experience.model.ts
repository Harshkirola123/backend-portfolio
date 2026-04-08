import mongoose, { Model } from "mongoose";
import ExperienceSchema from "./experience.schema";

const Experience: Model<IExperience> = mongoose.model<IExperience>(
  "Experience",
  ExperienceSchema,
);

export default Experience;
