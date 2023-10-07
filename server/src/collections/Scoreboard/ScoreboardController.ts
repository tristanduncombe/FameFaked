import { Request, Response } from "express";
import { IScore } from "./Scoreboard";
import { successResponse, failResponse } from "../../Utils/CommonUtil";
import { IScoreboardService } from "./ScoreboardService";

export interface IScoreboardController {
  getScoreboard: (
    req: Request,
    res: Response
  ) => Promise<Response<IScore[] | void>>;
  insertScore: (
    req: Request,
    res: Response
  ) => Promise<Response<boolean | void>>;
}

export default (
  ScoreboardService: IScoreboardService
): IScoreboardController => {
  return {
    getScoreboard: async (req, res) => {
      try {
        const Scoreboard = await ScoreboardService.getScoreboard();
        if (!Scoreboard.success) return failResponse(res, "No score found");
        return successResponse(res, Scoreboard.payload);
      } catch (err) {
        return failResponse(res, err);
      }
    },
    insertScore: async (req, res) => {
      try {
        const { score, name } = req.body;

        const Scoreboard = await ScoreboardService.insertScore(score, name);

        if (!Scoreboard.success) return failResponse(res, "No score found");
        return successResponse(res, Scoreboard.payload);
      } catch (err) {
        return failResponse(res, err);
      }
    },
  };
};
