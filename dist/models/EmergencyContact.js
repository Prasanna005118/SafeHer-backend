import mongoose, { Schema } from "mongoose";
const EmergencyContactSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
export default mongoose.model("EmergencyContact", EmergencyContactSchema);
//# sourceMappingURL=EmergencyContact.js.map