import { Router } from "express";
import type { Request, Response } from "express";
import AlertLog from "../models/AlertLog.ts";
import { authenticate } from "../middleware/auth.ts";

const router = Router();

// Sync offline alerts
router.post("/sync", authenticate, async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { alerts } = req.body;
  if (!Array.isArray(alerts)) {
    return res.status(400).json({ success: false, message: "alerts must be an array" });
  }

  try {
    const toInsert = alerts.map((a: any) => ({
      userId: user._id,
      timestamp: a.timestamp ? new Date(a.timestamp) : new Date(),
      location: a.location ?? { latitude: 0, longitude: 0 },
      contactsNotified: a.contactsNotified ?? [],
      status: a.status ?? "pending",
      syncedAt: new Date(),
    }));

    const inserted = await AlertLog.insertMany(toInsert);
    res.json({ success: true, insertedCount: inserted.length, inserted });
  } catch (err) {
    res.status(500).json({ success: false, message: "Sync failed", error: err });
  }
});

export default router;