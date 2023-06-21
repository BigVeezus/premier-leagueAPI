import express, { Response, NextFunction } from "express";
import { currentUser } from "@ticketifyorg/common";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../../middlewares/auth";
import { UserAuthRequest } from "../../types/AuthReq";
const router = express.Router();

router.get("/api/users/currentuser", authMiddleware, (req: any, res) => {
  res.send({ currentUser: req.userEmail, role: req.userRole || null });
});

export { router as currentUserRouter };
