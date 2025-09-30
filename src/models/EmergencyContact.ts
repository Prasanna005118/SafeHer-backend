import mongoose, { Schema, Document } from "mongoose";

export interface IEmergencyContact extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  phone: string;
  createdAt: Date;
}

const EmergencyContactSchema: Schema<IEmergencyContact> = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IEmergencyContact>(
  "EmergencyContact",
  EmergencyContactSchema
);