import { Router } from "express";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

import User from "../models/User.ts";
import type { IUser } from "../models/User.ts";
  import { normalizePhone } from "../utils/normalizePhone.ts";


const router: Router = Router();

// Send OTP
router.post("/send-otp", async (req: Request, res: Response) => {
  const { phoneNo } = req.body;

let phone = normalizePhone(phoneNo);

  try {
    const response = await fetch(
      `https://2factor.in/API/V1/${process.env.TWOFACTOR_API_KEY}/SMS/${phone}/AUTOGEN`
    );
    const data = await response.json();
    res.json({ success: true, sessionId: data.Details });
  } catch (err) {
    res.status(500).json({ success: false, message: "OTP send failed", error: err });
  }
});

// Verify OTP and issue JWT
router.post("/verify-otp", async (req: Request, res: Response) => {
  const { phone, otp, sessionId } = req.body;
  try {
    const response = await fetch(
      `https://2factor.in/API/V1/${process.env.TWOFACTOR_API_KEY}/SMS/VERIFY/${sessionId}/${otp}`
    );
    const data = await response.json();

    if (data.Status === "Success") {
      let user: IUser | null = await User.findOne({ phone });
      if (!user) user = new User({ phone, isVerified: true });
      else user.isVerified = true;
      await user.save();

      const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET as string,
  { expiresIn: "30d" }
);


      res.json({ success: true, token, user });
    } else {
      res.json({ success: false, message: "Invalid OTP" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "OTP verification failed", error: err });
  }
});

export default router;