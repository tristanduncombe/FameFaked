import { Box, Button, Container, IconButton } from "@mui/material";
import {
  PlayArrow,
  Pause,
  FastForward,
  FastRewind,
  VolumeOff,
  VolumeUp,
} from "@mui/icons-material";
import React, { FC, ReactElement, useRef, useState, useEffect } from "react";
import { getRandomVideo } from "../NetworkCalls";
import { IFameVideo } from "./FameVideo";

export const Player: FC = (): ReactElement => {
    const [playstate, setPlaystate] = useState<"playing" | "paused">("paused");
    const [position, setPosition] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const [famevideo, setFameVideo] = useState<IFameVideo>();

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
        videoRef.current!.currentTime += 10;
        videoRef.current!.playbackRate = 2;
        setPosition(videoRef.current?.currentTime || 0);
    };

    const handleFastRewind = () => {
        videoRef.current!.currentTime -= 5;
        setPosition(videoRef.current?.currentTime || 0);
    };

    const handleLoadedMetadata = () => {
        setDuration(videoRef.current?.duration || 0);
    };

    const handleMute = () => {
        setIsMuted(!isMuted);
        videoRef.current!.muted = !isMuted;
    };

    async function fetchRandomVideo() {
        const vid = await getRandomVideo();
        setFameVideo(vid.payload);
    }

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (isDragging && progressBarRef.current) {
                const progressBarRect =
                    progressBarRef.current.getBoundingClientRect();
                const progress =
                    (event.clientX - progressBarRect.left) /
                    progressBarRect.width;
                setPosition(progress * duration);
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        fetchRandomVideo();

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [duration, isDragging]);

    return (
        <Box
            sx={{
                backgroundColor: "#0D0C1E",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
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
                    width: "80%",
                    position: "relative",
                }}
            >
                <Container
                    maxWidth={false}
                    sx={{
                        width: "100%",
                    }}
                >
                    <video
                        ref={videoRef}
                        // hardcode: https://ia600505.us.archive.org/21/items/82862e-882d-48b-1f-0d-3a-7f-0633af-1b-9c-31-1694064143721/82862e882d48b1f0d3a7f0633af1b9c31_1694064143721.mp4
                        src={famevideo?.videoLink}
                        width="100%"
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                    />
                    <Box
                        ref={progressBarRef}
                        sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            width: "100%",
                            height: "5px",
                            backgroundColor: "rgba(255, 255, 255, 0.3)",
                            cursor: "pointer",
                        }}
                        onMouseDown={() => setIsDragging(true)}
                    >
                        <Box
                            sx={{
                                width: `${(position / duration) * 100}%`,
                                height: "100%",
                                backgroundColor: "white",
                            }}
                        />
                    </Box>
                    <Container
                        sx={{
                            color: "white",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: "100%",
                            paddingBottom: "10px",
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={() => {
                                famevideo?.deepfaked
                                    ? fetchRandomVideo()
                                    : alert("This video is not deepfaked!");
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
                                !famevideo?.deepfaked
                                    ? fetchRandomVideo()
                                    : alert("This video is deepfaked!");
                            }}
                            sx={{ color: "white", backgroundColor: "#00FF00" }}
                        >
                            Real
                        </Button>
                    </Container>
                </Container>
            </Box>
        </Box>
    );
};

export default Player;
