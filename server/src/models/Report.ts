import mongoose, { Schema, Document } from "mongoose";

export type ReportType = 'attendance' | 'performance' | 'task' | 'summary' | 'custom';

export interface IReport extends Document {
  title: string;
  type: ReportType;
  generatedBy: mongoose.Types.ObjectId; // Principal
  data: any; // The actual report content (JSON format)
  generatedAt: Date;
}

const reportSchema = new Schema<IReport>({
  title: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['attendance', 'performance', 'task', 'summary', 'custom'], 
    required: true 
  },
  generatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  data: { type: Schema.Types.Mixed, required: true },
  generatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model<IReport>("Report", reportSchema);
