import { NextFunction, Response } from "express";
import { UserAuthRequest } from "../types/AuthReq";

const adminGuard = (
  req: UserAuthRequest,
  res: Response,
  next: NextFunction
) => {
  const userRole = req.userRole;
  // console.log(userRole);
  if (userRole === "Admin") {
    return next();
  }
  return res.status(401).json({
    success: false,
    status: 401,
    message: "YOU ARE NOT AN ADMIN!",
  });
};

export { adminGuard as adminGuard };
