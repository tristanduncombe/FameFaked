import { Db } from "mongodb";
import ScoreboardController, {
  IScoreboardController,
} from "./ScoreboardController";
import ScoreboardRepository, {
  IScoreboardRepository,
} from "./ScoreboardRepository";
import { ScoreboardRouter, IScoreboardRouter } from "./ScoreboardRouter";
import ScoreboardService, { IScoreboardService } from "./ScoreboardService";

export interface IScoreboardComponent {
  scoreboardRepository: IScoreboardRepository;
  scoreboardService: IScoreboardService;
  scoreboardController: IScoreboardController;
  scoreboardRouter: IScoreboardRouter;
}

export const ScoreboardComponent = (db: Db): IScoreboardComponent => {
  const scoreboardCollection = db.collection("Scoreboard");
  const scoreboardRepository = ScoreboardRepository(scoreboardCollection);
  const scoreboardService = ScoreboardService(scoreboardRepository);
  const scoreboardController = ScoreboardController(scoreboardService);
  const scoreboardRouter = ScoreboardRouter(scoreboardController);

  return {
    scoreboardRepository,
    scoreboardService,
    scoreboardController,
    scoreboardRouter,
  };
};
