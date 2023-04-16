import mongoose from "mongoose";
const userProfileSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    age: { type: String, default: "30" },
    height: { type: String, default: "5.8" },
    weight: { type: String, default: "80" },
    sleep: { type: String, default: "8" },
    water: { type: String, default: "4" },
    heartRate: { type: String, default: "80" },
    avatar: { type: String, default: "/images/avatar/profile.png" },
    banner: { type: String, default: "/images/profile-banner.jpeg" },
    likes: [
      {
        exerciseId: String,
        bodyPart: String,
        name: String,
      },
    ],
  },
  { collection: "userProfile" }
);

const userModel = mongoose.model("userProfile", userProfileSchema);
export default userModel;
