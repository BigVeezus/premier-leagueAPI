import express, { Request, Response } from "express";
import { NotFoundError, validateRequest } from "@ticketifyorg/common";
import { Team } from "../../../model/teams";
import { authMiddleware } from "../../middlewares/auth";
import { adminGuard } from "../../middlewares/adminGuard";

const router = express.Router();

router.delete(
  "/api/team/:id",
  authMiddleware,
  adminGuard,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    await Team.findByIdAndDelete(id);

    res.status(200).send({ success: true, message: "Team deleted" });
  }
);

export { router as deleteTeamRouter };
