import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { NotFoundError, validateRequest } from "@ticketifyorg/common";
import { Team } from "../../../model/teams";
import Redis from "ioredis";
import { getOrSetCache } from "../../../config/redis";

//REDIS CONFIG
const redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
  throw new Error("Redis url not defined");
}
const client = new Redis(redisUrl);

// Express router
const router = express.Router();

router.get("/api/team/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const team = await getOrSetCache(`listofteams?${id}`, async () => {
    const data = await Team.findById(id);

    if (!data) {
      throw new NotFoundError();
    }
    return data;
  });

  res.status(200).send({ success: true, team });
});

export { router as showTeamRouter };
