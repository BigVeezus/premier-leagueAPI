import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { User } from "../../../model/user";
import { UserType } from "../../../model/user";
import { BadRequestError, validateRequest } from "@ticketifyorg/common";
import { Team } from "../../../model/teams";
import { adminGuard } from "../../middlewares/adminGuard";
import { authMiddleware } from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/api/fixtures",
  [
    body("homeTeam").notEmpty().withMessage("homeTeam must not be empty"),
    body("awayTeam").notEmpty().withMessage("awayTeam must not be empty"),
    body("stadium").notEmpty().withMessage("stadium must not be empty"),
    body("yearFounded")
      .notEmpty()
      .withMessage("year must not be empty")
      .isNumeric()
      .withMessage("value must be a number"),
  ],
  validateRequest,
  authMiddleware,
  adminGuard,
  async (req: Request, res: Response) => {
    const { name, league, stadium, yearFounded } = req.body;

    const existingTeam = await Team.findOne({ name });

    if (existingTeam) {
      return res.status(403).send({ success: false, message: "Team exists" });
    }

    const team = Team.build({
      name,
      league,
      stadium,
      yearFounded,
    });
    await team.save();

    res.status(201).send({ success: true, message: "team created", team });
  }
);

export { router as createTeamRouter };
