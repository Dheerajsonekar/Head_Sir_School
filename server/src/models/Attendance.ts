import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    totalClasses: { type: Number, required: true },
    attendedClasses: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Attendance", attendanceSchema);
