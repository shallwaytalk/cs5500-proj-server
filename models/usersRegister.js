import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    country: { type: String, required: true },
    gender: { type: String, enum: ["Female", "Male", "Other"] },
    userType: { type: String, enum: ["STUDENT", "PRO", "ADMIN"] },
  },
  { collection: "users" }
);
const userRegisterModel = mongoose.model("users", userSchema);
export default userRegisterModel;
