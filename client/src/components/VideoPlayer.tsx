import React, { ReactElement, useRef, useState, useEffect } from "react";
import { getVideos, getVideosByRegion } from "../NetworkCalls";
import { IFameVideo } from "../common/FameVideo";
import EndModal from "./EndModal";
import { PlayArrow, Pause, FastForward, FastRewind } from "@mui/icons-material"; // Import icons
import { Box, IconButton, Slider, Tooltip } from "@mui/material";

export default function VideoPlayer({
  famevideos,
  score,
  setScore,
  videoIndex,
  setVideoIndex,
  isPlaying,
  setIsPlaying,
  scrubberValue,
  videoRef,
  isZoomEnabled,
  handleTimeUpdate,
  setModalOpen,
  handleSkipBackward,
  handleSkipForward,
  handleScrubberChange,
  clickPosition,
  zoomLevel,
  handleVideoClick,
  handlePlayPause,
}: any): ReactElement {
  const [duration, setDuration] = useState(0);
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    setDuration(video.duration);
  };
  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "80%",
          overflow: isZoomEnabled ? "hidden" : "visible",
        }}
      >
        <video
          ref={videoRef}
          src={famevideos[videoIndex]?.videoLink}
          width="100%"
          height="80%"
          onTimeUpdate={handleTimeUpdate}
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
          autoPlay
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          paddingTop: "30px",
          margin: "auto",
          justifyContent: "center",
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
          style={{ width: "10%" }}
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
            <Tooltip title="Skip Backward">
              <IconButton
                onClick={handleSkipBackward}
                sx={{
                  color: "white",
                }}
              >
                <FastRewind />
              </IconButton>
            </Tooltip>
            <Tooltip title={isPlaying ? "Pause" : "Play"}>
              <IconButton
                onClick={handlePlayPause}
                sx={{
                  color: "white",
                  marginLeft: 5,
                }}
              >
                {isPlaying ? <Pause /> : <PlayArrow />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Skip Foward">
              <IconButton
                onClick={handleSkipForward}
                sx={{
                  color: "white",
                  marginLeft: 5,
                }}
              >
                <FastForward />
              </IconButton>
            </Tooltip>
          </div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "95%",
              alignContent: "center",
              margin: "0 auto",
            }}
          >
            <Slider
              value={scrubberValue}
              onChange={handleScrubberChange}
              aria-label="time slider"
              sx={{
                color: "#ffffff",
                height: 4,
              }}
            />
          </Box>
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
          style={{ width: "10%" }}
        >
          <span>Real</span>
        </button>
      </div>
    </>
  );
}
