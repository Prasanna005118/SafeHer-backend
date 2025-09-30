import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
// 💥 FIX: Added .js extension to all local imports
import authRoutes from "./routes/auth.js";
import contactsRoutes from "./routes/contacts.js";
import emergencyRoutes from "./routes/emergency.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
async function startServer() {
    try {
        if (!process.env.MONGO_URI)
            throw new Error("MONGO_URI missing in .env");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected");
        app.use("/api/auth", authRoutes);
        app.use("/api/contacts", contactsRoutes);
        app.use("/api/emergency", emergencyRoutes);
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
    }
    catch (err) {
        console.error("🔥 Server failed:", err);
        process.exit(1);
    }
}
startServer();
//# sourceMappingURL=server.js.map