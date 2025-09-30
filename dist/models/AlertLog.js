import mongoose, { Schema } from "mongoose";
const AlertLogSchema = new Schema({
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
export default mongoose.model("AlertLog", AlertLogSchema);
//# sourceMappingURL=AlertLog.js.map