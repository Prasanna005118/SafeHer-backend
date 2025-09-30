import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
// NOTE: Assuming the path to your User model is correct.
import User from "../models/User.js"; 

interface JwtPayload {
  id: string;
  iat?: number;
  exp?: number;
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  
  // 💥 FIX for Error 2 (TS2769): Ensure the token exists and is not just "Bearer"
  if (!token) {
    return res.status(401).json({ success: false, message: "Malformed Authorization header." });
  }

  try {
    // 💥 FIX for Error 1 (TS2352): Asserting to 'object' first resolves the type conflict.
    // jwt.verify synchronous call returns string | object | undefined
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as object;

    // We trust that the decoded object conforms to JwtPayload based on our generation logic,
    // but we must check for the critical 'id' property.
    const payload = decoded as JwtPayload; 
    
    if (!payload.id) {
        return res.status(401).json({ success: false, message: "Token payload missing user ID." });
    }

    const user = await User.findById(payload.id);
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid token: User not found." });
    }

    // Attach user to the request object
    (req as any).user = user;
    next();
  } catch (err) {
    // This catches expired tokens, signature errors, etc.
    return res
      .status(401)
      .json({ success: false, message: "Invalid token", error: err });
  }
};