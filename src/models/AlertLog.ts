import mongoose, { Schema, Document } from "mongoose";

export interface IAlertLog extends Document {
  userId: mongoose.Types.ObjectId;
  timestamp: Date;
  location: { latitude: number; longitude: number };
  contactsNotified: string[];
  status: "pending" | "sent" | "failed";
  createdAt: Date;
  syncedAt?: Date;
}

const AlertLogSchema: Schema<IAlertLog> = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  timestamp: { type: Date, required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  contactsNotified: { type: [String], default: [] },
  status: { type: String, enum: ["pending", "sent", "failed"], default: "pending" },
  syncedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IAlertLog>("AlertLog", AlertLogSchema);