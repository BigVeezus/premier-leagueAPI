import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { User } from "../../../model/user";
import { UserType } from "../../../model/user";
import { BadRequestError, validateRequest } from "@ticketifyorg/common";
import { Team } from "../../../model/teams";
import { adminGuard } from "../../middlewares/adminGuard";
import { authMiddleware } from "../../middlewares/auth";
import { Fixture } from "../../../model/fixtures";

const router = express.Router();

router.post(
  "/api/fixtures",
  [
    body("homeTeam").notEmpty().withMessage("homeTeam must not be empty"),
    body("awayTeam").notEmpty().withMessage("awayTeam must not be empty"),
    body("date").notEmpty().withMessage("date must not be empty"),
  ],
  validateRequest,
  // authMiddleware,
  // adminGuard,
  async (req: Request, res: Response) => {
    const { homeTeam, awayTeam, date, isPending, isCompleted } = req.body;

    const existingfixture = await Fixture.find({ homeTeam, awayTeam, date });
    console.log(existingfixture);

    if (existingfixture.length > 0) {
      return res
        .status(400)
        .send({ success: false, message: "Fixture already exists" });
    }

    const existingHomeTeam = await Team.findOne({ name: homeTeam });
    const existingAwayTeam = await Team.findOne({ name: awayTeam });

    if (!existingHomeTeam || !existingAwayTeam) {
      return res
        .status(404)
        .send({ success: false, message: "Home or Away team not found" });
    }

    const gameStadium = existingHomeTeam.stadium;

    const fixture = Fixture.build({
      homeTeam,
      awayTeam,
      gameStadium,
      date,
      isCompleted,
      isPending,
    });
    await fixture.save();

    res
      .status(201)
      .send({ success: true, message: "Fixture created", fixture });
  }
);

export { router as createFixtureRouter };
