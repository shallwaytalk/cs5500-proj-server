import mongoose, { Schema } from "mongoose";
const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 3600 },
  },
  { collection: "token" }
);

const tokenModel = mongoose.model("token", tokenSchema);
export default tokenModel;
