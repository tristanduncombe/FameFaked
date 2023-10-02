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
import { getVideos } from "../NetworkCalls";
import { IFameVideo } from "./FameVideo";
import EndModal from "../components/EndModal";
import Header from "../components/Header";

export default function Player(): ReactElement {
  const [playstate, setPlaystate] = useState<"playing" | "paused">("paused");
  const [position, setPosition] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [famevideos, setFameVideos] = useState<IFameVideo[]>([]);
  const [videoIndex, setVideoIndex] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const getPlaystate = () => {
    return playstate === "playing" ? (
      <span>
        <Pause />
      </span>
    ) : (
      <span>
        <PlayArrow />
      </span>
    );
  };

  const resetVideo = () => {
    videoRef.current?.pause();
  };

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
    const vid = await getVideos();
    setFameVideos(vid.payload);
    setVideoIndex(0);
  }

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging && progressBarRef.current) {
        const progressBarRect = progressBarRef.current.getBoundingClientRect();
        const progress =
          (event.clientX - progressBarRect.left) / progressBarRect.width;
        setPosition(progress * duration);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    fetchVideos();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [duration, isDragging]);

  return (
    <>
      <Header score={score} />
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
                  resetVideo();
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
                  {getPlaystate()}
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
                  resetVideo();
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
