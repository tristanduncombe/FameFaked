import { Box, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";

interface toolbarProps {
    handleSloMo: () => void;
    toggleZoom: () => void;
}

export default function Toolbar({ handleSloMo, toggleZoom }: toolbarProps) {
    return (
        <Box
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
                backgroundColor: "#0D0C1E",
            }}
        >
            <Typography variant="h6" sx={{ marginBlock: "auto" }}>
                Tools
            </Typography>
            <IconButton sx={{ color: "white" }} onClick={() => handleSloMo()}>
                <Tooltip title="Toggle Slowmotion">
                    <SlowMotionVideoIcon />
                </Tooltip>
            </IconButton>

            <IconButton onClick={toggleZoom} sx={{ color: "white" }}>
                <Tooltip title="Magnify">
                    <SearchIcon />
                </Tooltip>
            </IconButton>

            <Divider variant="middle" flexItem sx={{ bgcolor: "white" }} />
            {/* this side is like convultion layer */}
            <IconButton sx={{ color: "white" }} onClick={() => handleSloMo()}>
                <Tooltip title="Toggle Slowmotion">
                    <SlowMotionVideoIcon />
                </Tooltip>
            </IconButton>
        </Box>
    );
}
