import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { validateRequest } from "@ticketifyorg/common";
import { Team } from "../../../model/teams";

const router = express.Router();

router.get("/api/team", async (req: Request, res: Response) => {
  try {
    const search: any = req.query.search || "";

    let regex = new RegExp(search, "i");

    const teams = await Team.find({
      $and: [{ $or: [{ name: regex }, { league: regex }] }],
    });
    // console.log(existingfixture);
    res.status(200).send({ success: true, teams });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

export { router as getAllTeamsRouter };
