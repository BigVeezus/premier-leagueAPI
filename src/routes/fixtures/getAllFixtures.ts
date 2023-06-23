import express, { Request, Response } from "express";
import { Fixture } from "../../../model/fixtures";
import { getOrSetCache } from "../../../config/redis";

const router = express.Router();

router.get("/api/fixtures", async (req: Request, res: Response) => {
  try {
    const search: any = req.query.search || "";
    let status: any;

    if (req.query.status) {
      status = req.query.status;
    }

    const fixtures = await getOrSetCache(
      `fixtures?search=${search}${status}`,
      async () => {
        let regex = new RegExp(search, "i");

        let data: any;
        if (status === undefined) {
          data = await Fixture.find({
            $and: [
              {
                $or: [{ homeTeam: regex }, { awayTeam: regex }],
              },
            ],
          });
        } else {
          data = await Fixture.find({
            $and: [
              {
                $or: [{ homeTeam: regex }, { awayTeam: regex }],
              },
              { status: status },
            ],
          });
        }

        return data;
      }
    );

    res.status(200).send({ success: true, fixtures });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

export { router as getAllFixtureRouter };
