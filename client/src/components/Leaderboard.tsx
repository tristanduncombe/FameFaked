import { ReactElement } from "react";
import { IScore } from "../common/Score";

interface LeaderboardProps {
  leaderboard: IScore[];
}

export default function Leaderboard({
  leaderboard,
}: LeaderboardProps): ReactElement {
  return (
    <div className="leaderboardContainer">
      <h1>Leaderboard</h1>
      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((score: IScore, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{score.name}</td>
                <td>{score.score}</td>
                <td>{score.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
