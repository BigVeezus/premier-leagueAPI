import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { User } from "../../../model/user";
import { UserType } from "../../../model/user";
import { BadRequestError, validateRequest } from "@ticketifyorg/common";
import { Team } from "../../../model/teams";
import { adminGuard } from "../../middlewares/adminGuard";
import { authMiddleware } from "../../middlewares/auth";
import { Fixture } from "../../../model/fixtures";

const router = express.Router();

router.get("/api/fixtures", async (req: Request, res: Response) => {
  try {
    const search: any = req.query.search || "";
    let status: any;

    if (req.query.status) {
      status = req.query.status;
    }

    // console.log(status);

    const isCompletedOptions = ["true", "false"];
    const isPendingOptions = ["true", "false"];

    // var isCompletedValue = isCompleted === "true" || isCompleted === "false";
    // var isPendingValue = isPending === "true" || isPending === "false";
    // // console.log(isCompletedValue);

    // isCompleted === "false" ? (isCompleted = false) : (isCompleted = true);

    // isPending === "false" ? (isPending = false) : (isPending = true);

    let regex = new RegExp(search, "i");

    let fixtures: any;
    if (status === undefined) {
      fixtures = await Fixture.find({
        $and: [
          {
            $or: [{ homeTeam: regex }, { awayTeam: regex }],
          },
          // { status: status },
        ],
      });
    } else {
      fixtures = await Fixture.find({
        $and: [
          {
            $or: [{ homeTeam: regex }, { awayTeam: regex }],
          },
          { status: status },
        ],
      });
    }

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
