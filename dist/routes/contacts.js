import { Router } from "express";
import EmergencyContact from "../models/EmergencyContact.js";
import { authenticate } from "../middleware/auth.js";
const router = Router();
// Add contact
router.post("/add", authenticate, async (req, res) => {
    const { name, phone } = req.body;
    const user = req.user;
    if (!name || !phone) {
        return res.status(400).json({ success: false, message: "Name and phone required" });
    }
    try {
        const contact = new EmergencyContact({ userId: user._id, name, phone });
        await contact.save();
        res.json({ success: true, contact });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Failed to add contact", error: err });
    }
});
// Get all contacts
router.get("/get", authenticate, async (req, res) => {
    const user = req.user;
    try {
        const contacts = await EmergencyContact.find({ userId: user._id }).sort({ createdAt: -1 });
        res.json({ success: true, contacts });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Failed to load contacts", error: err });
    }
});
// Update
router.put("/update/:id", authenticate, async (req, res) => {
    const user = req.user;
    const { id } = req.params;
    const { name, phone } = req.body;
    try {
        const updated = await EmergencyContact.findOneAndUpdate({ _id: id, userId: user._id }, { name, phone }, { new: true });
        if (!updated)
            return res.status(404).json({ success: false, message: "Contact not found" });
        res.json({ success: true, contact: updated });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Update failed", error: err });
    }
});
// Delete
router.delete("/delete/:id", authenticate, async (req, res) => {
    const user = req.user;
    const { id } = req.params;
    try {
        const deleted = await EmergencyContact.findOneAndDelete({ _id: id, userId: user._id });
        if (!deleted)
            return res.status(404).json({ success: false, message: "Contact not found" });
        res.json({ success: true, message: "Contact deleted" });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Delete failed", error: err });
    }
});
export default router;
//# sourceMappingURL=contacts.js.map