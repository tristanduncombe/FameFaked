import { Box, Button, Container, Modal } from "@mui/material";
import { ReactElement } from "react";
import { IFameVideo } from "../common/FameVideo";

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
  const resetGame = () => {
    setModalOpen(false);
    setVideoIndex(0);
    setScore(0);
    setFameVideos(famevideos.sort(() => Math.random() - 0.5));
  };

  return (
    <Modal
      open={modalOpen}
      onClose={() => {
        setModalOpen(false);
        resetGame();
      }}
    >
      <Box
        sx={{
          backgroundColor: "#0D0C1E",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "50%",
          height: "50%",
          position: "absolute",
          top: "25%",
          left: "25%",
          border: "white",
          borderStyle: "solid",
          borderWidth: "2px",
          borderRadius: "10px",
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            width: "100%",
          }}
        >
          <Box
            sx={{
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              paddingBottom: "10px",
            }}
          >
            <h1>Game Over</h1>
            <h2>Score: {score}</h2>
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
          </Box>
        </Container>
      </Box>
    </Modal>
  );
}
