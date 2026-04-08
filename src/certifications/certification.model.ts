import mongoose, { Model } from "mongoose";
import CertificationSchema, { ICertification } from "./certification.schema";

const CertificationModel: Model<ICertification> =
  mongoose.model<ICertification>("Certification", CertificationSchema);

export default CertificationModel;
