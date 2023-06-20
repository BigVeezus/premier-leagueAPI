import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
import { UserAuthRequest } from "../types/AuthReq";

interface Payload {
  email: string;
  role: string;
  iat: any;
  exp: any;
}

const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(404).json({
      success: false,
      status: 404,
      message: "NOT AUTHORIZED!",
    });
  }

  const token = authHeader.substring(7, authHeader.length);
  //   console.log(token);

  jwt.verify(token, "prem", (err: Error, decoded: Payload) => {
    if (err) {
      console.log(err);
    } else {
      //   console.log(decoded);

      req.userEmail = decoded.email!;
      req.userRole = decoded.role!;
    }
  });

  next();
};

export { authMiddleware as authMiddleware };
