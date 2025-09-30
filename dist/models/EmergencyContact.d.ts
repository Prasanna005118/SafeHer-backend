import mongoose, { Document } from "mongoose";
export interface IEmergencyContact extends Document {
    userId: mongoose.Types.ObjectId;
    name: string;
    phone: string;
    createdAt: Date;
}
declare const _default: mongoose.Model<IEmergencyContact, {}, {}, {}, mongoose.Document<unknown, {}, IEmergencyContact, {}, {}> & IEmergencyContact & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=EmergencyContact.d.ts.map