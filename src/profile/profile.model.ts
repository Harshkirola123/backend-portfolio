import mongoose, { Model } from "mongoose";
import ProfileSchema from "./profile.schema";

const Profile: Model<IProfile> = mongoose.model<IProfile>(
  "Profile",
  ProfileSchema,
);

export default Profile;
