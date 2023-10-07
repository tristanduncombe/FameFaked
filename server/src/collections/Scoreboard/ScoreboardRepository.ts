import { Collection } from "mongodb";
import {
  SuccessReturn,
  FailReturn,
  success,
  failure,
} from "../../Utils/CommonUtil";
import { IScore } from "./Scoreboard";

export interface IScoreboardRepository {
  getScoreboard(): Promise<SuccessReturn<IScore[]> | FailReturn>;
  insertScore(
    score: number,
    name: string
  ): Promise<SuccessReturn<boolean> | FailReturn>;
}

export default (ScoreboardCollection: Collection): IScoreboardRepository => {
  return {
    getScoreboard: async () => {
      const Scoreboard = await ScoreboardCollection.find<IScore>({}).toArray();

      Scoreboard.sort((a, b) => b.score - a.score);

      if (!Scoreboard) return failure("No scores found");

      return success(Scoreboard);
    },
    insertScore: async (score, name) => {
      const Scoreboard = await ScoreboardCollection.insertOne({
        score,
        name,
        date: new Date().toLocaleDateString("en-GB"),
      });

      if (!Scoreboard) return failure("No score found");

      return success(true);
    },
  };
};
