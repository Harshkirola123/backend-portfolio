import mongoose, { Model } from "mongoose";
import EducationSchema from "./education.schema";

const EducationModel: Model<IEducation> = mongoose.model<IEducation>(
  "Education",
  EducationSchema,
);

export default EducationModel;
