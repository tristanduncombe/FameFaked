import React, { ReactElement, useRef, useState, useEffect } from "react";
import { getVideos, getVideosByRegion } from "../NetworkCalls";
import { IFameVideo } from "../common/FameVideo";
import EndModal from "./EndModal";
import Header from "./Header";
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
import Toolbar from "./Toolbar";

export default function Player(): ReactElement {
    return <></>;
}
