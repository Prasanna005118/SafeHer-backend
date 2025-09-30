import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
    phoneNo: { type: String, required: true, unique: true },
    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});
export default mongoose.model("User", UserSchema);
//# sourceMappingURL=User.js.map