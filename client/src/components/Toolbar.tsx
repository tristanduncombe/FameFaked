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
import { ChevronLeft, ChevronRight, GridOn } from "@mui/icons-material";
import BuildIcon from "@mui/icons-material/Build";

interface toolbarProps {
  handleSloMo: () => void;
  slowMo: boolean;
  toggleZoom: () => void;
  isToggleZoom: boolean;
  toggleConvolution: boolean;
  setToggleConvolution: (toggleConvolution: boolean) => void;
  kernel: number[][];
  setKernel: (kernel: number[][]) => void;
  kernelModal: boolean;
  setKernelModal: (kernelModal: boolean) => void;
}

export default function Toolbar({
  handleSloMo,
  toggleZoom,
  slowMo,
  isToggleZoom,
  toggleConvolution,
  setToggleConvolution,
  kernel,
  setKernel,
  kernelModal,
  setKernelModal,
}: toolbarProps) {
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
        <Tooltip title={isCollapsed ? "Expand Toolbar" : "Collapse Toolbar"}>
          {isCollapsed ? <ChevronLeft /> : <ChevronRight />}
        </Tooltip>
      </IconButton>
      <Collapse in={!isCollapsed} orientation="horizontal">
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "fit-content",
            color: "black",
            "& svg": {
              m: 1.5,
            },
            "& hr": {
              mx: 0.5,
            },
            transform: isCollapsed ? "translateX(-100%)" : "",
            transition: "transform 0.3s ease-in-out",
            backgroundColor: "#919191",
          }}
        >
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Tools
          </Typography>
          <IconButton
            sx={{
              color: "black",
              backgroundColor: slowMo ? "white" : "",
            }}
            onClick={() => handleSloMo()}
          >
            <Tooltip title="Toggle Slowmotion">
              <SlowMotionVideoIcon />
            </Tooltip>
          </IconButton>

          <Divider variant="middle" flexItem sx={{ bgcolor: "black" }} />
          {/* this side is like convultion layer */}
          <IconButton
            sx={{
              color: "black",
              backgroundColor: toggleConvolution ? "white" : "",
            }}
            onClick={() => setToggleConvolution(!toggleConvolution)}
          >
            <Tooltip title="Toggle Convolution">
              <GridOn />
            </Tooltip>
          </IconButton>
          <IconButton
            sx={{
              color: "black",
              backgroundColor: toggleConvolution ? "white" : "",
            }}
            onClick={() => setKernelModal(!kernelModal)}
          >
            <Tooltip title="Edit Kernel">
              <BuildIcon />
            </Tooltip>
          </IconButton>
        </Card>
      </Collapse>
    </Box>
  );
}
