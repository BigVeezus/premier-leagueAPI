import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { NotFoundError, validateRequest } from "@ticketifyorg/common";
import { Team } from "../../../model/teams";

const router = express.Router();

router.get("/api/team/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const team = await Team.findById(id);

  if (!team) {
    throw new NotFoundError();
  }

  res.status(200).send({ success: true, team });
});

export { router as showTeamRouter };
