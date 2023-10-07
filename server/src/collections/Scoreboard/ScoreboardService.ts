import { IScoreboardRepository } from "./ScoreboardRepository";
import {
  SuccessReturn,
  FailReturn,
  failure,
  success,
} from "../../Utils/CommonUtil";
import { IScore } from "./Scoreboard";

export interface IScoreboardService {
  getScoreboard(): Promise<SuccessReturn<IScore[]> | FailReturn>;
  insertScore(
    score: number,
    name: string
  ): Promise<SuccessReturn<boolean> | FailReturn>;
}

export default (UserRepository: IScoreboardRepository): IScoreboardService => {
  return {
    getScoreboard: async () => await UserRepository.getScoreboard(),
    insertScore: async (score, name) =>
      await UserRepository.insertScore(score, name),
  };
};
