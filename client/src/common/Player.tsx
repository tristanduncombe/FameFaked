import { Box, Container, IconButton } from "@mui/material";
import {
    PlayArrow,
    Pause,
    FastForward,
    FastRewind,
    VolumeOff,
    VolumeUp,
} from "@mui/icons-material";
import React, { FC, ReactElement, useRef, useState, useEffect } from "react";

export const Player: FC = (): ReactElement => {
    const [playstate, setPlaystate] = useState<"playing" | "paused">("paused");
    const [position, setPosition] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);

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

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [duration, isDragging]);

    return (
        <Box
            sx={{
                backgroundColor: "#0D0C1E",
                color: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
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
                    src="https://cdn.discordapp.com/attachments/1148852756438851624/1148855322191073380/82862e882d48b1f0d3a7f0633af1b9c31.mov"
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
                    }}
                >
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
                </Container>
            </Container>
        </Box>
    );
};

export default Player;
