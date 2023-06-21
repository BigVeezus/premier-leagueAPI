import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { User } from "../../../model/user";
import { validateRequest } from "@ticketifyorg/common";
import { BadRequestError } from "@ticketifyorg/common";
import { Password } from "../../password";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid!"),
    body("password").notEmpty().trim().withMessage("You must input password!"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({
      email: email,
    });
    if (!existingUser) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid login details" });
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid login details" });
    }

    const userJwt = jwt.sign(
      {
        email: existingUser.email,
        role: existingUser.role,
      },
      "prem",
      {
        expiresIn: "2h",
      }
    );

    res.status(200).send({ userJwt, existingUser });
  }
);

export { router as signinRouter };
