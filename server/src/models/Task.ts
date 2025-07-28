import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  assignedBy: mongoose.Types.ObjectId; // Principal
  assignedTo: mongoose.Types.ObjectId; // Teacher
  category: string;
  status: "assigned" | "started" | "completed";
  dueDate?: Date;
}

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String },
    assignedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, default: "General" },
    status: {
      type: String,
      enum: ["assigned", "started", "completed"],
      default: "assigned",
    },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Task", taskSchema);
