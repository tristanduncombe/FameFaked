import {
    Box,
    Card,
    Collapse,
    Divider,
    IconButton,
    Tooltip,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

interface toolbarProps {
    handleSloMo: () => void;
    toggleZoom: () => void;
}

export default function Toolbar({ handleSloMo, toggleZoom }: toolbarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleCollapseToggle = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <Box sx={{ position: "relative", backgroundColor: "#0D0C1E" }}>
            <IconButton
                onClick={handleCollapseToggle}
                sx={{
                    position: "absolute",
                    left: "-40px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "white",
                }}
            >
                <Tooltip
                    title={isCollapsed ? "Expand Toolbar" : "Collapse Toolbar"}
                >
                    {isCollapsed ? <ChevronLeft /> : <ChevronRight />}
                </Tooltip>
            </IconButton>
            <Collapse in={!isCollapsed} orientation="horizontal">
                <Card
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "fit-content",
                        color: "white",
                        "& svg": {
                            m: 1.5,
                        },
                        "& hr": {
                            mx: 0.5,
                        },
                        transform: isCollapsed ? "translateX(-100%)" : "",
                        transition: "transform 0.3s ease-in-out",
                        backgroundColor: "#0D0C1E",
                    }}
                >
                    <Typography variant="h6" sx={{ textAlign: "center" }}>
                        Tools
                    </Typography>
                    <IconButton
                        sx={{ color: "white" }}
                        onClick={() => handleSloMo()}
                    >
                        <Tooltip title="Toggle Slowmotion">
                            <SlowMotionVideoIcon />
                        </Tooltip>
                    </IconButton>

                    <IconButton onClick={toggleZoom} sx={{ color: "white" }}>
                        <Tooltip title="Magnify">
                            <SearchIcon />
                        </Tooltip>
                    </IconButton>

                    <Divider
                        variant="middle"
                        flexItem
                        sx={{ bgcolor: "white" }}
                    />
                    {/* this side is like convultion layer */}
                    <IconButton
                        sx={{ color: "white" }}
                        onClick={() => handleSloMo()}
                    >
                        <Tooltip title="Toggle Slowmotion">
                            <SlowMotionVideoIcon />
                        </Tooltip>
                    </IconButton>
                </Card>
            </Collapse>
        </Box>
    );
}
