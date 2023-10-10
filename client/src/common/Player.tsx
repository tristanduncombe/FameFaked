import React, { FC, ReactElement, useRef, useState, useEffect } from "react";
import { getVideos, getVideosByRegion } from "../NetworkCalls";
import { IFameVideo } from "./FameVideo";
import EndModal from "../components/EndModal";
import Header from "../components/Header";
import { PlayArrow, Pause, FastForward, FastRewind } from "@mui/icons-material"; // Import icons
import { Box, Button, Container } from "@mui/material";

export default function Player(): ReactElement {
  const [region, setRegion] = useState<string>("Global");
  const [famevideos, setFameVideos] = useState<IFameVideo[]>([]);
  const [videoIndex, setVideoIndex] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [scrubberValue, setScrubberValue] = useState<number>(0);
  const [sloMo, setSloMo] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [isZoomEnabled, setIsZoomEnabled] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const toggleZoom = () => {
    isZoomEnabled && setZoomLevel(1);
    setIsZoomEnabled(!isZoomEnabled);
  };

  const handleVideoClick = (event: { clientX: number; clientY: number }) => {
    if (zoomLevel > 1) {
      setIsZoomEnabled(false);
      setZoomLevel(1);
    } else if (isZoomEnabled) {
      const video = videoRef.current;
      if (video) {
        const rect = video.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        setClickPosition({ x, y });
        // You can set the zoom level based on your preference.
        setZoomLevel(2); // Example: Zoom in 2x
      }
    }
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
    if (isPlaying) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (videoIndex > 0) {
      setScrubberValue(0);
      setIsPlaying(true);
    }
  }, [videoIndex]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      const currentTime = video.currentTime;
      const duration = video.duration;
      if (!isNaN(duration)) {
        const newValue = (currentTime / duration) * 100;
        setScrubberValue(newValue);
      }
    }
  };

  const handleSloMo = () => {
    const video = videoRef.current;
    if (video) {
      sloMo ? (video.playbackRate = 1) : (video.playbackRate = 0.5);
      setSloMo(!sloMo);
    }
  };

  const handleScrubberChange = (newValue: number) => {
    const video = videoRef.current;
    if (video) {
      const duration = video.duration;
      if (!isNaN(duration)) {
        const newTime = (newValue / 100) * duration;
        video.currentTime = newTime;
        setScrubberValue(newValue);
      }
    }
  };

  const handleSkipForward = () => {
    const video = videoRef.current;
    if (video) {
      const newTime = video.currentTime + 5;
      video.currentTime = newTime;
    }
  };

  const handleSkipBackward = () => {
    const video = videoRef.current;
    if (video) {
      const newTime = video.currentTime - 5;
      video.currentTime = newTime;
    }
  };

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
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            width: "20%",
            paddingTop: "30px",
            right: "20px",
            top: "150px",
            zIndex: 1,
            gap: "10px",
          }}
        >
          <button className="button" onClick={() => handleSloMo()}>
            <span>Slow Motion</span>
          </button>

          <button className="button" onClick={toggleZoom}>
            <span>{isZoomEnabled ? "Disable Zoom" : "Zoom In"}</span>
          </button>
        </div>
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
                overflow: isZoomEnabled ? "hidden" : "visible", // Apply overflow hidden when zoom is enabled
              }}
            >
              <video
                ref={videoRef}
                src={famevideos[videoIndex]?.videoLink}
                width="100%"
                height="100%"
                style={{
                  position: "absolute",
                  top: isZoomEnabled
                    ? `${-clickPosition.y * 100 * (zoomLevel - 1)}%`
                    : "0",
                  left: isZoomEnabled
                    ? `${-clickPosition.x * 100 * (zoomLevel - 1)}%`
                    : "0",
                  width: `${100 * zoomLevel}%`,
                  height: `${100 * zoomLevel}%`,
                  transformOrigin: "center",
                }}
                onClick={handleVideoClick}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                paddingTop: "30px",
              }}
            >
              <button
                className="button red"
                onClick={() => {
                  if (famevideos[videoIndex]?.deepfaked) {
                    setScore(score + 1);
                    setVideoIndex(videoIndex + 1);
                  } else {
                    setModalOpen(true);
                  }
                  setIsPlaying(false);
                }}
                style={{ width: "20%" }}
              >
                <span>Fake</span>
              </button>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "60%",
                  padding: "0px 10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={handleSkipBackward}
                    sx={{
                      color: "white",
                      width: "10%",
                    }}
                  >
                    <FastRewind />
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handlePlayPause}
                    sx={{
                      color: "white",
                      width: "10%",
                    }}
                  >
                    {isPlaying ? <Pause /> : <PlayArrow />}
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleSkipForward}
                    sx={{
                      color: "white",
                      width: "10%",
                    }}
                  >
                    <FastForward />
                  </Button>
                </div>
                <div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    className="slider"
                    value={scrubberValue}
                    onChange={(e) =>
                      handleScrubberChange(Number(e.target.value))
                    }
                  />
                </div>
              </div>
              <button
                className="button green"
                onClick={() => {
                  if (famevideos[videoIndex]?.deepfaked) {
                    setModalOpen(true);
                  } else {
                    setScore(score + 1);
                    setVideoIndex(videoIndex + 1);
                  }
                  setIsPlaying(false);
                }}
                style={{ width: "20%" }}
              >
                <span>Real</span>
              </button>
            </div>
          </Container>
        </Box>
      </Box>
    </>
  );
}
