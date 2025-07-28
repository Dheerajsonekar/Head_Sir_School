import mongoose from "mongoose";

const classScheduleSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  teacher: String,
  time: String,
  room: String,
  date: Date,
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.model("ClassSchedule", classScheduleSchema);
