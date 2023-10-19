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
} from "@mui/icons-material"; // Import icons
import { Box, IconButton, Slider, Tooltip } from "@mui/material";

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
    isZoomEnabled,
    setModalOpen,
    clickPosition,
    zoomLevel,
    handleVideoClick,
}: any): ReactElement {
    const [isPlaying, setIsPlaying] = useState(false);
    const [scrubberValue, setScrubberValue] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const [isMuted, setIsMuted] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const volumeSliderRef = useRef<HTMLDivElement>(null);

    const handlePlayPause = () => {
        const video = videoRef.current;
        if (video) {
            if (isPlaying) {
                video.pause();
            } else {
                video.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

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

    const handleScrubberChange = (event: Event, value: number | number[]) => {
        const video = videoRef.current;
        if (video) {
            video.currentTime = (value as number) * duration;
            setScrubberValue(value as number);
        }
    };

    const handleTimeUpdate = () => {
        const video = videoRef.current;
        if (video) {
            const newScrubberValue = video.currentTime / duration;
            setScrubberValue(newScrubberValue);
        }
    };

    const handleLoadedMetadata = () => {
        const video = videoRef.current;
        if (video) {
            video.volume = volume;
            setDuration(video.duration);
        }
    };

    const handleVolumeChange = (event: Event, value: number | number[]) => {
        const video = videoRef.current;
        const newVolume = value as number;
        if (newVolume >= 0 && newVolume <= 1 && video) {
            video.volume = newVolume;
            setVolume(newVolume);
            setIsMuted(false);
        }
    };

    const handleMute = () => {
        const video = videoRef.current;
        if (isMuted && video) {
            video.volume = volume;
            setIsMuted(false);
        } else if (video) {
            video.volume = 0;
            setIsMuted(true);
        }
    };

    const handleVolumeIcon = () => {
        if (isMuted || volume === 0) {
            return <VolumeOff />;
        } else if (volume < 50) {
            return <VolumeDown />;
        } else {
            return <VolumeUp />;
        }
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
                    onLoadedMetadata={handleLoadedMetadata}
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
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                position: "relative",
                            }}
                        >
                            <IconButton
                                onClick={handleMute}
                                sx={{
                                    color: "white",
                                }}
                                onMouseEnter={() => {
                                    const volumeSlider =
                                        volumeSliderRef.current;
                                    if (volumeSlider) {
                                        volumeSlider.style.display = "block";
                                    }
                                }}
                                onMouseLeave={() => {
                                    const volumeSlider =
                                        volumeSliderRef.current;
                                    if (volumeSlider) {
                                        volumeSlider.style.display = "none";
                                    }
                                }}
                            >
                                {handleVolumeIcon()}
                            </IconButton>
                            <div
                                ref={volumeSliderRef}
                                style={{
                                    display: "none",
                                    position: "absolute",
                                    top: "-110%",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    zIndex: 1,
                                }}
                            >
                                <Slider
                                    orientation="vertical"
                                    value={isMuted ? 0 : volume}
                                    onChange={handleVolumeChange}
                                    sx={{
                                        color: "#ffffff",
                                        height: 100,
                                        width: 4,
                                    }}
                                />
                            </div>
                        </Box>
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
                            onTimeUpdate={handleTimeUpdate}
                            onLoadedMetadata={handleLoadedMetadata}
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
