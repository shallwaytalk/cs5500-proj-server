import mongoose from "mongoose";
const planSchema = new mongoose.Schema(
    {
        id: {type: String, required: true, unique: true},
        username: { type: String, required: true},
        category: { type: String, required: true, enum: ["RUNNING", "BOXING", "YOGA", "SWIMMING"] },
        startTime: { type: String, default: "00:00 am" },
        endTime: { type: String,  default: "00:00 am" },
        location: { type: String, default: "" },
    },
    { collection: "plan" }
);

const planModel = mongoose.model("plan", planSchema)
export default planModel