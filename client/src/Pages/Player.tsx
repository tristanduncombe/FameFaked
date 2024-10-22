import React, { useEffect, useRef, useState } from "react";
import "./Player.css";
import { Button, CssBaseline, Menu, MenuItem } from "@mui/material";
import VideoPlayer from "../components/VideoPlayer";
import { getRegions, getVideos, getVideosByRegion } from "../NetworkCalls";
import { IFameVideo } from "../common/FameVideo";
import EndModal from "../components/EndModal";
import { Box, Typography } from "@mui/material";
import Toolbar from "../components/Toolbar";
import { Link } from "react-router-dom";
import { bindMenu, bindTrigger } from "material-ui-popup-state";
import { usePopupState } from "material-ui-popup-state/hooks";
import CloseIcon from "@mui/icons-material/Close";
import HelpIcon from "@mui/icons-material/Help";

function App() {
  const [region, setRegion] = useState<string>("Global");
  const [famevideos, setFameVideos] = useState<IFameVideo[]>([]);
  const [videoIndex, setVideoIndex] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [scrubberValue, setScrubberValue] = useState<number>(0);
  const [sloMo, setSloMo] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [toggleConvolution, setToggleConvolution] = useState(false);
  const [kernel, setKernel] = useState<number[][]>([
    [-2],
    [-1],
    [0],
    [-1],
    [1],
    [1],
    [0],
    [1],
    [2],
  ]);
  const [kernelModal, setKernelModal] = useState<boolean>(false);
  const popupState = usePopupState({ variant: "popover", popupId: "demoMenu" });
  function updateMouseFollower() {
    // Get the video element
    const videoContainer = document.getElementById("video-container");
    if (!videoContainer) return;

    const videoElement = videoContainer.querySelector(
      "video"
    ) as HTMLVideoElement;

    if (!videoElement) return;

    // Get the video location
    const videoLocation = videoElement.getBoundingClientRect();

    const mouseCanvas = document.getElementById("canvas") as HTMLCanvasElement;

    // Set the canvas position to the mouse position minus the canvas size divided by 2 to center the image on the mouse
    mouseCanvas.style.left = mousePosition.x - mouseCanvas.width / 2 + "px";
    mouseCanvas.style.top = mousePosition.y - mouseCanvas.height / 2 + "px";

    mouseCanvas.width = videoElement.width;
    mouseCanvas.height = videoElement.height;

    // Get the relative mouse position
    const relX = mousePosition.x - videoLocation.left - videoElement.width / 2;
    const relY = mousePosition.y - videoLocation.top - videoElement.height / 2;

    if (!mouseCanvas) return;

    const mouseCtx = (mouseCanvas as HTMLCanvasElement).getContext("2d");

    if (!mouseCtx) return;

    // Draw the video frame to the canvas
    mouseCtx.drawImage(
      videoElement,
      relX,
      relY,
      videoElement.width,
      videoElement.height,
      0,
      0,
      videoElement.width,
      videoElement.height
    );

    const imageData = mouseCtx.getImageData(
      0,
      0,
      videoElement.width,
      videoElement.height
    );

    // Apply the convolution
    convolute(imageData.data, videoElement.width, videoElement.height, kernel);
    mouseCtx.putImageData(imageData, 0, 0);
  }

  function convolute(
    data: Uint8ClampedArray,
    width: number,
    height: number,
    kernel: number[][]
  ) {
    // Flatten the kernel
    const kern = kernel.reduce((acc, current) => acc.concat(current), []);

    const kernelSize = Math.sqrt(kernel.length);
    const halfKernelSize = Math.floor(kernelSize / 2);

    const resultData = new Uint8ClampedArray(data.length);

    // Loop through each pixel
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Get the pixel index
        const pixelIndex = (y * width + x) * 4;
        let r = 0,
          g = 0,
          b = 0;

        // Loop through each kernel value and apply it to the pixel
        for (let ky = 0; ky < kernelSize; ky++) {
          for (let kx = 0; kx < kernelSize; kx++) {
            const dataIndexX = x + kx - halfKernelSize;
            const dataIndexY = y + ky - halfKernelSize;

            if (
              dataIndexX >= 0 &&
              dataIndexX < width &&
              dataIndexY >= 0 &&
              dataIndexY < height
            ) {
              const dataIdx = (dataIndexY * width + dataIndexX) * 4;
              const kernelValue = kern[ky * kernelSize + kx];
              r += data[dataIdx] * kernelValue;
              g += data[dataIdx + 1] * kernelValue;
              b += data[dataIdx + 2] * kernelValue;
            }
          }
        }

        resultData[pixelIndex] = r;
        resultData[pixelIndex + 1] = g;
        resultData[pixelIndex + 2] = b;
        resultData[pixelIndex + 3] = data[pixelIndex + 3];
      }
    }

    for (let i = 0; i < data.length; i++) {
      data[i] = resultData[i];
    }
  }

  // Add event listener to update the mouse position
  useEffect(() => {
    const videoContainer = document.getElementById("video-container");

    if (!videoContainer) return;

    videoContainer.addEventListener("mousemove", (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    });
  }, []);

  // Update the mouse follower
  useEffect(() => {
    if (!toggleConvolution) return;
    updateMouseFollower();
  }, [mousePosition, scrubberValue]);

  // Fetch videos from database
  async function fetchVideos() {
    const vid =
      region === "Global" ? await getVideos() : await getVideosByRegion(region);
    setFameVideos(vid.payload);
    setVideoIndex(0);
  }

  // Fetch videos and regions on page load
  useEffect(() => {
    fetchVideos();
    setScore(0);
  }, [region]);

  // Play or pause the video when the isPlaying state changes
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

  // Update the scrubber value when the video time updates
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Reset the scrubber value and play the next video when the video index changes
  useEffect(() => {
    setScrubberValue(0);
    setIsPlaying(true);
  }, [videoIndex]);

  // Update the scrubber value when the video time updates
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      //   console.log(video.currentTime);
      const currentTime = video.currentTime;
      const duration = video.duration;
      if (!isNaN(duration)) {
        const newValue = (currentTime / duration) * 100;
        setScrubberValue(newValue);
      }
    }
  };

  // Toggle slow motion
  const handleSloMo = () => {
    const video = videoRef.current;
    if (video) {
      sloMo ? (video.playbackRate = 1) : (video.playbackRate = 0.5);
      setSloMo(!sloMo);
    }
  };

  // Update the video time when the scrubber value changes
  const handleScrubberChange = (event: Event, newValue: number | number[]) => {
    const video = videoRef.current;
    if (video) {
      const duration = video.duration;
      const newTime = ((newValue as number) / 100) * duration;
      video.currentTime = newTime;
      setScrubberValue(newValue as number);
    }
  };

  // Skip forward or backward 5 seconds
  const handleSkipForward = () => {
    const video = videoRef.current;
    if (video) {
      const newTime = video.currentTime + 5;
      video.currentTime = newTime;
    }
  };

  // Skip forward or backward 5 seconds
  const handleSkipBackward = () => {
    const video = videoRef.current;
    if (video) {
      const newTime = video.currentTime - 5;
      video.currentTime = newTime;
    }
  };

  return (
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
            {/* Modal for when the game ends */}
            {modalOpen && (
              <EndModal
                setIsPlaying={setIsPlaying}
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
                paddingTop: "50px",
                paddingBottom: "50px",
              }}
            >
              {/* The video player */}
              <VideoPlayer
                famevideos={famevideos}
                score={score}
                setScore={setScore}
                videoIndex={videoIndex}
                setVideoIndex={setVideoIndex}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                scrubberValue={scrubberValue}
                videoRef={videoRef}
                handleTimeUpdate={handleTimeUpdate}
                setModalOpen={setModalOpen}
                handleSkipBackward={handleSkipBackward}
                handleSkipForward={handleSkipForward}
                handleScrubberChange={handleScrubberChange}
                handlePlayPause={handlePlayPause}
                canvasRef={canvasRef}
                toggleConvolution={toggleConvolution}
              />
            </Box>
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: "20%",
              right: "0%",
              width: "15%",
            }}
          >
            {/* The toolbar */}
            <Toolbar
              region={region}
              score={score}
              setRegion={setRegion}
              handleSloMo={handleSloMo}
              slowMo={sloMo}
              toggleConvolution={toggleConvolution}
              setToggleConvolution={setToggleConvolution}
              kernel={kernel}
              setKernel={setKernel}
              kernelModal={kernelModal}
              setKernelModal={setKernelModal}
            />
          </Box>
          {/* If convolution is enabled, show the mouse follower */}
          {kernelModal && (
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "black",
                padding: "20px",
                borderRadius: "10px",
                border: "1px solid white",
                zIndex: "5",
              }}
            >
              <Button
                onClick={() => {
                  setKernelModal(false);
                }}
                sx={{
                  color: "white",
                  width: "50px",
                  height: "50px",
                  position: "absolute",
                  right: "0",
                  top: "0",
                  fontSize: "20px",
                  "&:hover": {
                    color: "#FF6961",
                  },
                }}
              >
                <CloseIcon />
              </Button>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ color: "white", textAlign: "center" }}
                >
                  3x3 Grid Kernel Entry
                </Typography>
                <Button
                  {...bindTrigger(popupState)}
                  sx={{
                    color: "white",
                    width: "50px",
                    height: "50px",
                    fontSize: "20px",
                    "&:hover": {
                      color: "#FF6961",
                    },
                  }}
                >
                  <HelpIcon />
                </Button>
              </div>
              <Menu {...bindMenu(popupState)}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "white",
                    textAlign: "center",
                    width: "600px",
                    zIndex: "3",
                    padding: "10px",
                  }}
                >
                  The kernel is a 3x3 grid of values that are multiplied by the
                  pixels around the mouse. The sum of the values is then used to
                  determine the color of the pixel. The kernel is applied to the
                  mouse position. The kernel can be used to blur, sharpen, or
                  detect edges in the image.
                </Typography>
              </Menu>
              <Typography
                variant="h6"
                sx={{ color: "white", textAlign: "center", padding: "10px" }}
              >
                Please use arrows in the box to increase or decrease values or
                select a preset kernel.
              </Typography>

              <Typography
                variant="h4"
                sx={{ color: "white", textAlign: "center", padding: "10px" }}
              >
                Custom Kernel
              </Typography>
              {/* The kernel entry box */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "30px",
                }}
              >
                {[0, 1, 2].map((rowIndex) => (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    {[0, 1, 2].map((colIndex) => (
                      <input
                        type="number"
                        value={kernel[rowIndex * 3 + colIndex][0]}
                        onChange={(e) => {
                          const newKernel = [...kernel];
                          newKernel[rowIndex * 3 + colIndex][0] =
                            parseInt(e.target.value) || 0;
                          setKernel(newKernel);
                        }}
                        style={{
                          backgroundColor: "black",
                          borderColor: "white",
                          alignItems: "center",
                          justifyContent: "center",
                          textAlign: "center",
                          color: "white",
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>

              <Typography
                variant="h4"
                sx={{ color: "white", textAlign: "center", padding: "20px" }}
              >
                Preset Kernels
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: "10px",
                  paddingBottom: "20px",
                }}
              >
                <button
                  className="button"
                  color="black"
                  onClick={() => {
                    setKernel([[0], [0], [0], [0], [1], [0], [0], [0], [0]]);
                    setKernelModal(false);
                  }}
                  style={{ width: "25%", zIndex: "3" }}
                >
                  <span>Blur</span>
                </button>
                <button
                  className="button"
                  color="black"
                  onClick={() => {
                    setKernel([
                      [-1],
                      [-1],
                      [-1],
                      [-1],
                      [9],
                      [-1],
                      [-1],
                      [-1],
                      [-1],
                    ]);
                    setKernelModal(false);
                  }}
                  style={{ width: "25%", zIndex: "3" }}
                >
                  <span>Sharpen</span>
                </button>
                <button
                  className="button"
                  color="black"
                  onClick={() => {
                    setKernel([[-2], [-1], [0], [-1], [1], [1], [0], [1], [2]]);
                    setKernelModal(false);
                  }}
                  style={{ width: "25%", zIndex: "3" }}
                >
                  <span>Edge Detection</span>
                </button>
              </Box>
            </Box>
          )}
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
        </Box>
      </Box>
    </Box>
  );
}

export default App;
