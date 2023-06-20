import { Request } from "express";
export interface UserAuthRequest extends Request {
  userId?: string;
  userRole?: string;
  email?: any;
  role?: any; // or any other type
}
