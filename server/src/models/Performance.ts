import mongoose, { Document, Schema } from "mongoose";

export interface IPerformance extends Document {
  student: mongoose.Schema.Types.ObjectId;
  course: mongoose.Schema.Types.ObjectId;
  teacher: mongoose.Schema.Types.ObjectId;
  score: number; // e.g., out of 100
  remarks?: string;
  date: Date;
}

const performanceSchema: Schema<IPerformance> = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    remarks: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IPerformance>("Performance", performanceSchema);
