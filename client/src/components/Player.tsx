import React, { ReactElement, useRef, useState, useEffect } from "react";
import { getVideos, getVideosByRegion } from "../NetworkCalls";
import { IFameVideo } from "../common/FameVideo";
import EndModal from "./EndModal";
import { PlayArrow, Pause, FastForward, FastRewind } from "@mui/icons-material"; // Import icons
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

interface PlayerProps {
  famevideos: IFameVideo[];
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  videoIndex: number;
  setVideoIndex: React.Dispatch<React.SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  scrubberValue: number;
  setScrubberValue: React.Dispatch<React.SetStateAction<number>>;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSkipBackward: () => void;
  handleSkipForward: () => void;
  handleScrubberChange: (value: number) => void;
}

export default function Player({
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
  return (
    <>
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
              onChange={(e) => handleScrubberChange(Number(e.target.value))}
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
          style={{ width: "10%" }}
        >
          <span>Real</span>
        </button>
      </div>
    </>
  );
}
