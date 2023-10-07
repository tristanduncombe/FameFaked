import { Box, Button, Container, Modal } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import { IFameVideo } from "../common/FameVideo";
import { getScoreboard, insertScore } from "../NetworkCalls";
import Leaderboard from "./Leaderboard";

interface IEndModal {
  modalOpen: boolean;
  score: number;
  setModalOpen: (modalOpen: boolean) => void;
  setVideoIndex: (videoIndex: number) => void;
  setScore: (score: number) => void;
  famevideos: IFameVideo[];
  setFameVideos: (famevideos: IFameVideo[]) => void;
}

export default function EndModal({
  modalOpen,
  famevideos,
  score,
  setModalOpen,
  setVideoIndex,
  setScore,
  setFameVideos,
}: IEndModal): ReactElement {
  const [name, setName] = useState<string>("");
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  const resetGame = () => {
    setModalOpen(false);
    setVideoIndex(0);
    setScore(0);
    setFameVideos(famevideos.sort(() => Math.random() - 0.5));
  };

  useEffect(() => {
    async function fetchScoreboard() {
      const resp = await getScoreboard();

      setLeaderboard(resp.payload);
    }
    fetchScoreboard();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await insertScore(score, name);
    setModalOpen(false);
    resetGame();
  };

  return (
    <Modal
      open={modalOpen}
      onClose={() => {
        setModalOpen(false);
        resetGame();
      }}
    >
      <Box className="modalContainer">
        {" "}
        {/* Apply the class name */}
        <Container
          maxWidth={false}
          sx={{
            width: "100%",
          }}
        >
          <Box className="columnContainer">
            <h1>Game Over</h1>
            <div
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              <div className="scoreContainer">
                <h2>Score: {score}</h2>
                {(leaderboard.length < 10 || score > leaderboard[9].score) && (
                  <div className="formContainer">
                    <form onSubmit={handleSubmit}>
                      <input
                        type="text"
                        maxLength={3}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                      />
                      <Button
                        variant="contained"
                        sx={{
                          color: "black",
                          backgroundColor: "white",
                          width: "50%",
                          marginTop: "10px",
                        }}
                        type="submit"
                      >
                        Submit
                      </Button>
                    </form>
                  </div>
                )}
              </div>

              <Leaderboard leaderboard={leaderboard} />
            </div>
          </Box>
          <div className="buttonContainer">
            <Button
              variant="contained"
              sx={{
                color: "black",
                backgroundColor: "white",
                width: "50%",
                marginTop: "10px",
              }}
              onClick={() => resetGame()}
            >
              Play Again
            </Button>
          </div>
        </Container>
      </Box>
    </Modal>
  );
}
