import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  phoneNo: string;
  isVerified: boolean;
  createdAt: Date;
}

const UserSchema: Schema<IUser> = new Schema({
  phoneNo: { type: String, required: true, unique: true },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>("User", UserSchema);