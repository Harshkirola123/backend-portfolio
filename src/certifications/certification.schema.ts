import { Schema, InferSchemaType } from "mongoose";

const CertificationSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    organization: {
      type: String,
      require: true,
    },
    issueDate: {
      type: Date,
      require: true,
    },
    expirationDate: {
      type: Date,
    },
    credentialId: {
      type: String,
    },
    credentialURL: {
      type: String,
    },
    skills: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
    },
    certificateUrl: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export type ICertification = InferSchemaType<typeof CertificationSchema>;

export default CertificationSchema;
