import { Schema } from "mongoose";

const ProfileSchema = new Schema<IProfile>(
  {
    name: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    bio: String,

    skills: {
      type: [String],
      default: [],
    },

    location: String,

    socialLinks: {
      github: String,
      linkedin: String,
      twitter: String,
      website: String,
    },

    profileImage: String,
    resumeUrl: String,
  },
  {
    timestamps: true,
  },
);

export default ProfileSchema;
