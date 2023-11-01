import {
  Box,
  Button,
  Container,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import { IFameVideo } from "../common/FameVideo";
import { getScoreboard, insertScore } from "../NetworkCalls";
import Leaderboard from "./Leaderboard";
import CloseIcon from "@mui/icons-material/Close";
import tips from "../common/tips.json";
import { Link } from "react-router-dom";

interface IEndModal {
  setIsPlaying: (isPlaying: boolean) => void;
  modalOpen: boolean;
  score: number;
  setModalOpen: (modalOpen: boolean) => void;
  setVideoIndex: (videoIndex: number) => void;
  setScore: (score: number) => void;
  famevideos: IFameVideo[];
  setFameVideos: (famevideos: IFameVideo[]) => void;
}

export default function EndModal({
  setIsPlaying,
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

  // Randomly select 3 tips to display
  const [deepfakeTips] = useState(
    tips
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((tip: string) => <p>{tip}</p>)
  );

  // Reset game state
  const resetGame = () => {
    setModalOpen(false);
    setVideoIndex(0);
    setScore(0);
    setFameVideos(famevideos.sort(() => Math.random() - 0.5));
    setIsPlaying(false);
  };

  // Fetch leaderboard from database
  async function fetchScoreboard() {
    const resp = await getScoreboard();

    setLeaderboard(resp.payload);
  }

  useEffect(() => {
    fetchScoreboard();
  }, []);

  // Submit score to database
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await insertScore(score, name);
    await fetchScoreboard();
    setSubmitted(true);
  };

  return (
    <Modal
      open={modalOpen}
      onClose={() => {
        setModalOpen(false);
        resetGame();
      }}
      color="primary"
    >
      <Paper className="modalContainer" sx={{ backgroundColor: "black" }}>
        {/*  button to close modal */}
        <Button
          component={Link}
          to="/"
          sx={{
            color: "white",
            width: "50px",
            height: "50px",
            position: "absolute",
            right: "0",
            top: "0",
            fontSize: "20px",
            "&:hover": {
              color: "#FF6961",
            },
          }}
        >
          <CloseIcon />
        </Button>
        {/*  modal content */}
        <Container
          maxWidth={false}
          sx={{
            width: "100%",
            height: "100%",
            paddingTop: "20px",
          }}
        >
          <Box className="columnContainer">
            <Typography variant="h3">Game Over</Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                height: "90%",
              }}
            >
              <div className="scoreContainer">
                <div
                  className="tipsContainer"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    height: "100%",
                  }}
                >
                  {/* display 3 random tips */}
                  <h2>Tips</h2>
                  {deepfakeTips}
                </div>
                <div className="buttonContainer">
                  <Button
                    variant="contained"
                    onClick={resetGame}
                    sx={{
                      color: "white",
                      bgcolor: "black",
                      border: "1px solid white",
                      width: "50%",
                      height: "100px",
                      padding: "10px",
                      "&:hover": {
                        bgcolor: "#919191",
                      },
                    }}
                  >
                    Play Again
                  </Button>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {!submitted && (
                  <>
                    <Typography variant="h5">
                      Enter your name to submit your score!
                    </Typography>

                    <form onSubmit={handleSubmit} className="formContainer">
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        sx={{
                          width: "100%",
                          //  make white border
                          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: "white",
                            },
                        }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                      />
                      <Button
                        variant="contained"
                        sx={{
                          width: "50%",
                          height: "100%",
                          color: "white",
                          bgcolor: "black",
                          border: "1px solid white",
                        }}
                        type="submit"
                      >
                        Submit
                      </Button>
                    </form>
                  </>
                )}
                <Leaderboard leaderboard={leaderboard} />
              </div>
            </div>
          </Box>
        </Container>
      </Paper>
    </Modal>
  );
}
