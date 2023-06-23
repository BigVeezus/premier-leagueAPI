import express, { Request, Response } from "express";
import { NotFoundError, validateRequest } from "@ticketifyorg/common";
import { Team } from "../../../model/teams";
import { authMiddleware } from "../../middlewares/auth";
import { adminGuard } from "../../middlewares/adminGuard";
import { Fixture } from "../../../model/fixtures";

const router = express.Router();

router.delete(
  "/api/fixtures/:id",
  authMiddleware,
  adminGuard,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await Fixture.findByIdAndDelete(id);

      res.status(200).send({ success: true, message: "Fixture deleted" });
    } catch (error) {
      res.status(404).send({ success: false, message: "Invalid ID", error });
    }
  }
);

export { router as deleteFixtureRouter };
