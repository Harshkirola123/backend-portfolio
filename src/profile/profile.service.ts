import Profile from "./profile.model";

export const upsertProfile = async (payload: Partial<IProfile>) => {
  const profile = await Profile.findOneAndUpdate(
    {}, // no filter → single profile
    payload,
    {
      new: true,
      upsert: true, // create if not exists
      runValidators: true,
    },
  );

  return profile;
};

export const getProfile = async () => {
  const profile = await Profile.findOne();

  if (!profile) {
    throw new Error("Profile not found");
  }

  return profile;
};
