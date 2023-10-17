import React, { useEffect, useRef, useState } from "react";
import "./Player.css";
import {
    CssBaseline,
    Menu,
    MenuItem,
    ThemeProvider,
    createTheme,
} from "@mui/material";
import Player from "../components/Player";
import { getVideos, getVideosByRegion } from "../NetworkCalls";
import { IFameVideo } from "../common/FameVideo";
import EndModal from "../components/EndModal";
import { Box, IconButton, Typography } from "@mui/material";
import Toolbar from "../components/Toolbar";
import { Link } from "react-router-dom";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import PublicIcon from "@mui/icons-material/Public";
import { Public } from "@mui/icons-material";

function App() {
    const theme = createTheme({
        palette: {
            primary: {
                light: "#e3f2fd",
                main: "#11141c",
                dark: "#005db0",
                contrastText: "#fffff",
            },
            secondary: {
                light: "#ce93d8",
                main: "#11141c",
                dark: "#00867d",
                contrastText: "#fffff",
            },
        },
    });

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
                setZoomLevel(2);
            }
        }
    };

    async function fetchVideos() {
        const vid =
            region === "Global"
                ? await getVideos()
                : await getVideosByRegion(region);
        setFameVideos(vid.payload);
        setVideoIndex(0);
    }

    useEffect(() => {
        fetchVideos();
        setScore(0);
    }, [region]);

    useEffect(() => {
        const video = videoRef.current;
        if (video && video.readyState > video.HAVE_CURRENT_DATA) {
            if (isPlaying) {
                videoRef.current?.play();
            } else {
                videoRef.current?.pause();
            }
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

    const [languageModal, setLanguageModal] = useState<boolean>(false);
    const [regionList, setRegionList] = useState<string[]>([]);

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    height: "100%",
                }}
            >
                <CssBaseline />

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        height: "100%",
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            border: "none",
                            height: "100%",
                        }}
                    >
                        {/* <Header
                            score={score}
                            region={region}
                            setRegion={setRegion}
                        /> */}
                        <Box
                            sx={{
                                backgroundColor: "#121212",
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
                                    marginBlock: "auto",
                                    width: "80vw",
                                    height: "100vh",
                                    backgroundColor: "#121212",
                                }}
                            >
                                <Player
                                    famevideos={famevideos}
                                    score={score}
                                    setScore={setScore}
                                    videoIndex={videoIndex}
                                    setVideoIndex={setVideoIndex}
                                    isPlaying={isPlaying}
                                    setIsPlaying={setIsPlaying}
                                    scrubberValue={scrubberValue}
                                    videoRef={videoRef}
                                    isZoomEnabled={isZoomEnabled}
                                    handleTimeUpdate={handleTimeUpdate}
                                    setModalOpen={setModalOpen}
                                    handleSkipBackward={handleSkipBackward}
                                    handleSkipForward={handleSkipForward}
                                    handleScrubberChange={handleScrubberChange}
                                    clickPosition={clickPosition}
                                    zoomLevel={zoomLevel}
                                    handleVideoClick={handleVideoClick}
                                    handlePlayPause={handlePlayPause}
                                />
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                position: "absolute",
                                top: "20%",
                                right: "0%",
                            }}
                        >
                            <Toolbar
                                handleSloMo={handleSloMo}
                                toggleZoom={toggleZoom}
                            />
                        </Box>
                        <Box
                            sx={{
                                position: "absolute",
                                bottom: "0%",
                                left: "0%",
                                color: "white",
                            }}
                        >
                            <Typography variant="h5">Score: {score}</Typography>
                        </Box>
                        <Box
                            sx={{
                                position: "absolute",
                                top: "0%",
                                left: "0%",
                            }}
                        >
                            <Link to={"/"}>
                                <img
                                    src="./FameFaked.png"
                                    width="10%"
                                    style={{
                                        marginTop: "1%",
                                        marginLeft: "1%",
                                    }}
                                    draggable="false"
                                />
                            </Link>
                        </Box>
                        <Box
                            sx={{
                                position: "absolute",
                                top: "0%",
                                right: "0%",
                            }}
                        >
                            <PopupState
                                variant="popover"
                                popupId="demo-popup-menu"
                            >
                                {(popupState) => (
                                    <React.Fragment>
                                        <IconButton
                                            sx={{ color: "white" }}
                                            {...bindTrigger(popupState)}
                                        >
                                            <Public />: {region}
                                        </IconButton>
                                        <Menu {...bindMenu(popupState)}>
                                            {regionList.map((region) => (
                                                <MenuItem
                                                    id={region}
                                                    onClick={() => {
                                                        setRegion(region);
                                                        setLanguageModal(false);
                                                        popupState.close;
                                                    }}
                                                    sx={{ color: "#11141c" }}
                                                >
                                                    {region}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </React.Fragment>
                                )}
                            </PopupState>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default App;
