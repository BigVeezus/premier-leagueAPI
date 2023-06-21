import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { validateRequest } from "@ticketifyorg/common";
import { Team } from "../../../model/teams";

const router = express.Router();

router.get("/api/team", async (req: Request, res: Response) => {
  const teams = await Team.find({});

  res.status(200).send({ success: true, teams });
});

export { router as getAllTeamsRouter };
