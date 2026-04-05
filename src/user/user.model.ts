import mongoose, { Model } from "mongoose";
import UserSchema from "./user.schema";

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
