import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: String,
  code: String,
  description: String,
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.model("Course", courseSchema);
