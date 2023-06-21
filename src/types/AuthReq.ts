import { Request } from "express";
export interface UserAuthRequest extends Request {
  userId?: string;
  userRole?: string;
  userEmail?: string;
  role?: any; // or any other type
}
