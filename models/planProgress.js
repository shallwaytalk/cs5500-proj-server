import mongoose from "mongoose";
const planProgressSchema = new mongoose.Schema(
    {
        id: {type: String, required: true, unique: true},
        username: { type: String, required: true },
        category: {type: String, required: true}
    },
    { collection: "planProgress" }
);

const planProgressModel = mongoose.model("planProgress", planProgressSchema)
export default planProgressModel