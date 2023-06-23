import express, { Request, Response } from "express";
import { Team } from "../../../model/teams";
import { getOrSetCache } from "../../../config/redis";

//EXPRESS ROUTER
const router = express.Router();

router.get("/api/team", async (req: Request, res: Response) => {
  try {
    const search: any = req.query.search || "";

    let regex = new RegExp(search, "i");

    //CHECK AND GET REDIS DATA FIRST
    const teams = await getOrSetCache(
      `listofteams?search=${search}`,
      async () => {
        const data = await Team.find({
          $and: [{ $or: [{ name: regex }, { league: regex }] }],
        });
        return data;
      }
    );

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
