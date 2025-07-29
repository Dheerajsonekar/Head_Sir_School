import { Request, Response } from "express";
import User from "../models/User";

export const getPrincipalProfile = async (req: Request, res: Response) => {
  try {
    const principalId = req.user?.id; // from auth middleware
    const profile = await User.findById(principalId).select("-password");

    if (
      !profile ||
      profile.role !== ("principal" as typeof profile.role)
    ) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ profile });
  } catch (err) {
    console.error("Error fetching principal profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};
