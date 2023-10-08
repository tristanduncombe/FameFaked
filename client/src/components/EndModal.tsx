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
  const [submitted, setSubmitted] = useState<boolean>(false);

  const resetGame = () => {
    setModalOpen(false);
    setVideoIndex(0);
    setScore(0);
    setFameVideos(famevideos.sort(() => Math.random() - 0.5));
  };

  async function fetchScoreboard() {
    const resp = await getScoreboard();

    setLeaderboard(resp.payload);
  }

  useEffect(() => {
    fetchScoreboard();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await insertScore(score, name);
    await fetchScoreboard();
    setSubmitted(true);
  };

  return leaderboard.length > 0 ? (
    <Modal
      open={modalOpen}
      onClose={() => {
        setModalOpen(false);
        resetGame();
      }}
    >
      <Box className="modalContainer">
        <Button
          onClick={() => {
            setModalOpen(false);
            resetGame();
          }}
          sx={{
            color: "white",
            width: "50px",
            height: "50px",
            position: "absolute",
            right: "0",
            top: "0",
            fontSize: "20px",
          }}
        >
          X
        </Button>
        <Container
          maxWidth={false}
          sx={{
            width: "100%",
            height: "100%",
            paddingTop: "20px",
          }}
        >
          <Box className="columnContainer">
            <h1>Game Over</h1>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                height: "90%",
              }}
            >
              <div className="scoreContainer">
                <h2>Score: {score}</h2>
                {!submitted &&
                  (leaderboard.length < 10 || score > leaderboard[9].score) && (
                    <>
                      <h2>Enter your name to submit your score!</h2>
                      <form onSubmit={handleSubmit} className="formContainer">
                        <input
                          type="text"
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
                          }}
                          type="submit"
                        >
                          Submit
                        </Button>
                      </form>
                    </>
                  )}
                <div className="buttonContainer">
                  <button className="button blue" onClick={resetGame}>
                    <span>Play Again</span>
                  </button>
                </div>
              </div>

              <Leaderboard leaderboard={leaderboard} />
            </div>
          </Box>
        </Container>
      </Box>
    </Modal>
  ) : (
    <></>
  );
}
