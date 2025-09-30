import mongoose, { Document } from "mongoose";
export interface IAlertLog extends Document {
    userId: mongoose.Types.ObjectId;
    timestamp: Date;
    location: {
        latitude: number;
        longitude: number;
    };
    contactsNotified: string[];
    status: "pending" | "sent" | "failed";
    createdAt: Date;
    syncedAt?: Date;
}
declare const _default: mongoose.Model<IAlertLog, {}, {}, {}, mongoose.Document<unknown, {}, IAlertLog, {}, {}> & IAlertLog & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=AlertLog.d.ts.map