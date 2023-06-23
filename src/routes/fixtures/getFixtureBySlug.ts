import express, { Request, Response } from "express";
import { Fixture } from "../../../model/fixtures";
import { getOrSetCache } from "../../../config/redis";

const router = express.Router();

router.get("/api/fixtures/:date/:slug", async (req: Request, res: Response) => {
  const dateParams = req.params.date;
  const slugParams = req.params.slug;

  const fixtures = await getOrSetCache(
    `listofteams?search=${dateParams}${slugParams}`,
    async () => {
      const data = await Fixture.find({
        date: dateParams,
        slug: slugParams,
      });

      return data;
    }
  );

  // console.log(existingfixture);
  res.status(200).send({ success: true, fixtures });
});

export { router as viewFixturebySlugRouter };
