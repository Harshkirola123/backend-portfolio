import { Schema } from "mongoose";

const ProjectSchema = new Schema<IProject>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  techStack: {
    type: [String],
    required: true,
  },
  githubUrl: {
    type: String,
  },
  liveUrl: {
    type: String,
  },
  images: {
    type: [String],
  },
  status: {
    type: String,
    enum: ["completed", "in-progress"],
    default: "completed",
  },
});

export default ProjectSchema;
