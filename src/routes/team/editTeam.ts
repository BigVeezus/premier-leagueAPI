import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { NotFoundError, validateRequest } from "@ticketifyorg/common";
import { Team } from "../../../model/teams";
import { authMiddleware } from "../../middlewares/auth";

const router = express.Router();

router.put(
  "/api/team/:id",
  [
    body("name").notEmpty().withMessage("Name must not be empty"),
    body("league").notEmpty().withMessage("League must not be empty"),
    body("stadium").notEmpty().withMessage("Stadium must not be empty"),
    body("yearFounded")
      .notEmpty()
      .withMessage("Year must not be empty")
      .isNumeric()
      .withMessage("Value must be a number"),
  ],
  validateRequest,
  authMiddleware,
  async (req: Request, res: Response) => {
    const { name, league, stadium, yearFounded, status } = req.body;

    try {
      const existingTeam = await Team.findById(req.params.id);

      if (!existingTeam) {
        throw new NotFoundError();
      }

      existingTeam.set({
        name,
        league,
        stadium,
        yearFounded,
        status,
      });
      await existingTeam.save();

      res
        .status(200)
        .send({ success: true, message: "team edited", existingTeam });
    } catch (err) {
      res.status(404).send({ success: false, message: "Invalid ID", err });
    }
  }
);

export { router as editTeamRouter };
