import { Box, Button, Container, IconButton, Modal } from "@mui/material";
import {
  PlayArrow,
  Pause,
  FastForward,
  FastRewind,
  VolumeOff,
  VolumeUp,
} from "@mui/icons-material";
import React, { FC, ReactElement, useRef, useState, useEffect } from "react";
import { getVideos, getVideosByRegion } from "../NetworkCalls";
import { IFameVideo } from "./FameVideo";
import EndModal from "../components/EndModal";
import Header from "../components/Header";

export default function Player(): ReactElement {
  const [playstate, setPlaystate] = useState<"playing" | "paused">("paused");
  const [region, setRegion] = useState<string>("Global");
  const [, setPosition] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [famevideos, setFameVideos] = useState<IFameVideo[]>([]);
  const [videoIndex, setVideoIndex] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const handlePlayPause = () => {
    if (playstate === "playing") {
      videoRef.current?.pause();
      setPlaystate("paused");
    } else {
      videoRef.current?.play();
      setPlaystate("playing");
    }
  };

  const handleTimeUpdate = () => {
    setPosition(videoRef.current?.currentTime || 0);
  };

  const handleFastForward = () => {
    videoRef.current!.currentTime += 5;
    setPosition(videoRef.current?.currentTime || 0);
  };

  const handleFastRewind = () => {
    videoRef.current!.currentTime -= 5;
    setPosition(videoRef.current?.currentTime || 0);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
    videoRef.current!.muted = !isMuted;
  };

  async function fetchVideos() {
    const vid =
      region === "Global" ? await getVideos() : await getVideosByRegion(region);
    setFameVideos(vid.payload);
    setVideoIndex(0);
  }

  useEffect(() => {
    fetchVideos();
    setScore(0);
  }, [region]);

  useEffect(() => {
    if (videoIndex > 0) {
      videoRef.current!.play();
      setPlaystate("playing");
    }
  }, [videoIndex]);
  return (
    <>
      <Header score={score} region={region} setRegion={setRegion} />
      <Box
        sx={{
          backgroundColor: "#0D0C1E",
          width: "100%",
          height: "80%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {modalOpen && (
          <EndModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            setVideoIndex={setVideoIndex}
            setScore={setScore}
            score={score}
            famevideos={famevideos}
            setFameVideos={setFameVideos}
          />
        )}
        <Box
          sx={{
            backgroundColor: "#0D0C1E",
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "80%",
            height: "100%",
            position: "relative",
          }}
        >
          <Container
            maxWidth={false}
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "80%",
              }}
            >
              <video
                ref={videoRef}
                src={famevideos[videoIndex]?.videoLink}
                width="100%"
                height="100%"
                onTimeUpdate={handleTimeUpdate}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                }}
              />
            </div>
            <Container
              sx={{
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                onClick={() => {
                  if (famevideos[videoIndex]?.deepfaked) {
                    setScore(score + 1);
                    setVideoIndex(videoIndex + 1);
                  } else {
                    setModalOpen(true);
                  }
                  handlePlayPause();
                }}
                sx={{ color: "white", backgroundColor: "#FF0000" }}
              >
                Fake
              </Button>

              <Box sx={{ color: "white" }}>
                <IconButton
                  sx={{ color: "white" }}
                  ref={buttonRef}
                  onClick={() => {
                    handleFastRewind();
                    buttonRef.current!.blur();
                  }}
                >
                  <FastRewind />
                </IconButton>
              </Box>
              <Box sx={{ color: "white" }}>
                <IconButton
                  sx={{ color: "white" }}
                  ref={buttonRef}
                  onClick={() => {
                    handlePlayPause();
                    buttonRef.current!.blur();
                  }}
                >
                  {playstate === "playing" ? (
                    <span>
                      <Pause />
                    </span>
                  ) : (
                    <span>
                      <PlayArrow />
                    </span>
                  )}
                </IconButton>
              </Box>
              <Box sx={{ color: "white" }}>
                <IconButton
                  sx={{ color: "white" }}
                  ref={buttonRef}
                  onClick={() => {
                    handleFastForward();
                    buttonRef.current!.blur();
                  }}
                >
                  <FastForward />
                </IconButton>
              </Box>
              <Box sx={{ color: "white" }}>
                <IconButton
                  sx={{ color: "white" }}
                  ref={buttonRef}
                  onClick={() => {
                    handleMute();
                    buttonRef.current!.blur();
                  }}
                >
                  {isMuted ? <VolumeOff /> : <VolumeUp />}
                </IconButton>
              </Box>
              <Button
                variant="contained"
                onClick={() => {
                  if (famevideos[videoIndex]?.deepfaked) {
                    setModalOpen(true);
                  } else {
                    setScore(score + 1);
                    setVideoIndex(videoIndex + 1);
                  }
                  handlePlayPause();
                }}
                sx={{ color: "white", backgroundColor: "#00FF00" }}
              >
                Real
              </Button>
            </Container>
          </Container>
        </Box>
      </Box>
    </>
  );
}
