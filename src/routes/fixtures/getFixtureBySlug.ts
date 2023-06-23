import express, { Request, Response } from "express";
import { Fixture } from "../../../model/fixtures";

const router = express.Router();

router.get("/api/fixtures/:date/:slug", async (req: Request, res: Response) => {
  const fixtures = await Fixture.find({
    date: req.params.date,
    slug: req.params.slug,
  });

  // console.log(existingfixture);
  res.status(200).send({ success: true, fixtures });
});

export { router as viewFixturebySlugRouter };
