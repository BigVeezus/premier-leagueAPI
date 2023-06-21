import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { User } from "../../model/user";
import { UserType } from "../../model/user";
import { BadRequestError, validateRequest } from "@ticketifyorg/common";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 3, max: 20 })
      .withMessage("Password must be 3 to 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const role = UserType.Admin;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(403).send({ success: false, message: "Email in Use" });
    }

    const user = User.build({
      email,
      password,
      role,
    });
    await user.save();

    //Generate JSON Web token
    const userJwt = jwt.sign(
      {
        email: user.email,
        role: user.role,
      },
      "prem",
      {
        expiresIn: "2h",
      }
    );

    res
      .status(201)
      .send({ success: true, message: "user created", user, userJwt });
  }
);

export { router as signupRouter };
