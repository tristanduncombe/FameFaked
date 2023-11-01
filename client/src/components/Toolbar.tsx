import {
  Box,
  Button,
  Card,
  Collapse,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  GridOn,
  Language,
} from "@mui/icons-material";
import BuildIcon from "@mui/icons-material/Build";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import { getRegions } from "../NetworkCalls";

interface toolbarProps {
  handleSloMo: () => void;
  slowMo: boolean;
  toggleConvolution: boolean;
  setToggleConvolution: (toggleConvolution: boolean) => void;
  kernel: number[][];
  setKernel: (kernel: number[][]) => void;
  kernelModal: boolean;
  setKernelModal: (kernelModal: boolean) => void;
  region: string;
  score: number;
  setRegion: (region: string) => void;
}

export default function Toolbar({
  handleSloMo,
  slowMo,
  toggleConvolution,
  setToggleConvolution,
  kernelModal,
  score,
  setKernelModal,
  region,
  setRegion,
}: toolbarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [regionList, setRegionList] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // Add anchor element state

  const handleButtonClick = (event: any) => {
    setAnchorEl(event.currentTarget); // Set the anchor element to the button
    setMenuOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null); // Clear the anchor element
    setMenuOpen(false);
  };

  async function fetchRegions() {
    const regions = await getRegions();
    setRegionList(regions.payload);
  }

  const handleCollapseToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    fetchRegions();
  }, []);

  useEffect(() => {
    console.log(regionList);
  }, [regionList]);

  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "#121212",
        width: "100%",
        borderTopLeftRadius: "10px",
        borderBottomLeftRadius: "10px",
        borderRight: "0px",
        borderLeft: "1px solid white",
        borderTop: "1px solid white",
        borderBottom: "1px solid white",
      }}
    >
      {/* 
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
      */}

      {/* This is the toolbar */}
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "90%",
          color: "white",
          margin: "auto",
          marginTop: "5%",
          marginBottom: "5%",
          "& svg": {
            m: 1.5,
          },
          "& hr": {
            mx: 0.5,
          },
          transform: isCollapsed ? "translateX(-100%)" : "",
          transition: "transform 0.3s ease-in-out",
          backgroundColor: "#121212",
        }}
      >
        <Button
          sx={{
            color: "white",
            bgcolor: "#121212",
            "&:hover": {
              bgcolor: "#121212",
            },
          }}
          variant="contained"
        >
          <Typography variant="h6">Toolbar</Typography>
        </Button>
        <Divider sx={{ color: "white", backgroundColor: "white" }} />
        <Button
          sx={{
            color: "white",
            bgcolor: "#121212",
            "&:hover": {
              bgcolor: "#919191",
            },
          }}
          variant="contained"
          endIcon={<Language />}
          onClick={handleButtonClick} // Use the handleButtonClick function
        >
          Region
        </Button>
        <Menu
          anchorEl={anchorEl} // Set the anchor element
          open={menuOpen}
          onClose={handleClose} // Use the handleClose function
        >
          {regionList.map((region) => (
            <MenuItem
              key={region}
              onClick={() => {
                setRegion(region);
                handleClose();
              }}
            >
              {region}
            </MenuItem>
          ))}
        </Menu>
        {/*  Slowmotion toggle button */}
        <Button
          sx={{
            color: "white",
            bgcolor: "#121212",
            "&:hover": {
              bgcolor: "#919191",
            },
          }}
          onClick={() => handleSloMo()}
        >
          Slow Motion
          <IconButton
            sx={{
              color: slowMo ? "green" : "white",
            }}
          >
            <Tooltip title="Toggle Slowmotion">
              <SlowMotionVideoIcon />
            </Tooltip>
          </IconButton>
        </Button>
        {/*  Convolution toggle button */}
        <Button
          sx={{
            color: "white",
            bgcolor: "#121212",
            "&:hover": {
              bgcolor: "#919191",
            },
          }}
          onClick={() => setToggleConvolution(!toggleConvolution)}
        >
          Convolution
          <IconButton
            sx={{
              color: toggleConvolution ? "green" : "white",
            }}
          >
            <Tooltip title="Toggle Convolution">
              <GridOn />
            </Tooltip>
          </IconButton>
        </Button>
        <Button
          sx={{
            color: "white",
            bgcolor: "#121212",
            "&:hover": {
              bgcolor: "#919191",
            },
          }}
          onClick={() => setKernelModal(!kernelModal)}
        >
          Edit Kernel
          <IconButton
            sx={{
              color: kernelModal ? "green" : "white",
            }}
          >
            <Tooltip title="Edit Kernel">
              <BuildIcon />
            </Tooltip>
          </IconButton>
        </Button>
        <Divider sx={{ color: "white", backgroundColor: "white" }} />
        <Button
          sx={{
            color: "white",
            bgcolor: "#121212",
            "&:hover": {
              bgcolor: "#121212",
            },
            padding: "20px 0px",
          }}
          variant="contained"
        >
          <Typography variant="h6">Score: {score}</Typography>
        </Button>
      </Card>
    </Box>
  );
}
