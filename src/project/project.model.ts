import mongoose, { Model } from "mongoose";
import ProjectSchema from "./project.schema";

const Project: Model<IProject> = mongoose.model<IProject>(
  "Project",
  ProjectSchema,
);

export default Project;
