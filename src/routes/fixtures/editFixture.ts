import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  validateRequest,
} from "@ticketifyorg/common";
import { Team } from "../../../model/teams";
import { adminGuard } from "../../middlewares/adminGuard";
import { authMiddleware } from "../../middlewares/auth";
import { Fixture } from "../../../model/fixtures";

const router = express.Router();

router.put(
  "/api/fixtures/:id",
  [
    body("homeTeam").notEmpty().withMessage("homeTeam must not be empty"),
    body("awayTeam").notEmpty().withMessage("awayTeam must not be empty"),
    body("date").notEmpty().withMessage("date must not be empty"),
    body("status")
      .exists()
      .withMessage("Status is required")
      .isIn(["isPending", "isCompleted"])
      .withMessage("status does not contain required value"),
  ],
  validateRequest,
  authMiddleware,
  adminGuard,
  async (req: Request, res: Response) => {
    const { homeTeam, awayTeam, date, status } = req.body;

    try {
      const existingfixture = await Fixture.findById(req.params.id);
      // console.log(existingfixture);

      if (!existingfixture) {
        throw new NotFoundError();
      }

      existingfixture.set({
        homeTeam,
        awayTeam,
        date,
        status,
      });
      await existingfixture.save();

      res
        .status(200)
        .send({ success: true, message: "fixture edited", existingfixture });
    } catch (error) {
      res.status(404).send({ success: false, message: "Invalid ID", error });
    }
  }
);

export { router as editFixtureRouter };
