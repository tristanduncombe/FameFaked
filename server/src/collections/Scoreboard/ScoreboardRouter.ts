import { Router } from "express";
import { IScoreboardController } from "./ScoreboardController";

export type IScoreboardRouter = Router;

export const ScoreboardRouter = (
  ScoreboardController: IScoreboardController
): Router => {
  const router = Router();

  router.get("/", ScoreboardController.getScoreboard);
  router.post("/insert", ScoreboardController.insertScore);

  return router;
};
