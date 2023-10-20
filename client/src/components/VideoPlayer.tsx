import React, { ReactElement, useRef, useState, useEffect } from "react";
import { getVideos, getVideosByRegion } from "../NetworkCalls";
import { IFameVideo } from "../common/FameVideo";
import EndModal from "./EndModal";
import {
  PlayArrow,
  Pause,
  FastForward,
  FastRewind,
  VolumeUp,
  VolumeDown,
  VolumeOff,
  VolumeMute,
} from "@mui/icons-material";

import {
  Box,
  Grid,
  IconButton,
  Input,
  Slider,
  Tooltip,
  Typography,
} from "@mui/material";

export default function VideoPlayer({
  famevideos,
  score,
  setScore,
  videoIndex,
  setVideoIndex,
  isZoomEnabled,
  setModalOpen,
  clickPosition,
  zoomLevel,
  handleVideoClick,
  handleScrubberChange,
  videoRef,
  handleTimeUpdate,
  scrubberValue,
  isPlaying,
  setIsPlaying,
  handlePlayPause,
  canvasRef,
  toggleConvolution,
}: any): ReactElement {
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);

  const handleSkipBackward = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime -= 5;
    }
  };

  const handleSkipForward = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime += 5;
    }
  };

  const handleVolumeChange = (event: Event, value: number | number[]) => {
    const newVolume = value as number;
    setVolume(newVolume);
    const video = videoRef.current;
    if (video) {
      video.volume = newVolume / 100;
    }
    setIsMuted(false);
  };

  function getVolumeIcon() {
    if (isMuted || volume === 0) {
      return <VolumeMute />;
    } else if (volume > 0 && volume <= 50) {
      return <VolumeDown />;
    } else {
      return <VolumeUp />;
    }
  }

  const handleMute = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    setIsMuted(!isMuted);
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
    }
  };

  return (
    <>
      <div
        id="video-container"
        style={{
          width: "100%",
          height: "80%",
          overflow: isZoomEnabled ? "hidden" : "visible",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <video
          ref={videoRef}
          id="video"
          src={`./videos/${famevideos[videoIndex]?.videoLink}`}
          width="100%"
          height="100%"
          onTimeUpdate={handleTimeUpdate}
          style={{
            position: "absolute",
            width: "auto",
            height: "auto",
            transformOrigin: "center",
          }}
          onClick={handleVideoClick}
          autoPlay
        />
      </div>
      {toggleConvolution && <canvas ref={canvasRef} id="canvas" />}
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
          style={{ width: "10%", zIndex: "3" }}
        >
          <span>Fake</span>
        </button>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "60%",
            padding: "0px 10px",
            backgroundColor: "black",
            zIndex: "2",
            opacity: "0.8",
            borderRadius: "10px",
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
            <Grid container alignItems="center">
              <Grid item xs={4}></Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
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
                <Tooltip title="Skip Forward">
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
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    maxWidth: 250,
                    paddingRight: 2,
                  }}
                >
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <IconButton
                        onClick={handleMute}
                        sx={{
                          color: "white",
                        }}
                      >
                        {getVolumeIcon()}
                      </IconButton>
                    </Grid>
                    <Grid item xs>
                      <Slider
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        aria-labelledby="input-slider"
                        sx={{
                          color: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                        }}
                        size="small"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
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
          style={{ width: "10%", zIndex: "3" }}
        >
          <span>Real</span>
        </button>
      </div>
    </>
  );
}
