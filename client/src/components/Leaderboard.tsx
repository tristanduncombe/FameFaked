import { ReactElement } from "react";
import { IScore } from "../common/Score";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

interface LeaderboardProps {
  leaderboard: IScore[];
}

export default function Leaderboard({
  leaderboard,
}: LeaderboardProps): ReactElement {
  return (
    <div className="leaderboardContainer">
      <Typography variant="h4" gutterBottom>
        Leaderboard
      </Typography>
      <TableContainer
        color="secondary"
        component={Paper}
        sx={{ maxWidth: "30vw" }}
        elevation={0}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboard.map((score: IScore, index: number) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{score.name}</TableCell>
                <TableCell>{score.score}</TableCell>
                <TableCell>{score.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
