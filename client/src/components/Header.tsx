import React, { ReactElement, FC, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, Container, Divider, Grid, Modal } from "@mui/material";
import { getRegions } from "../NetworkCalls";

interface HeaderProps {
  score: number;
  region: string;
  setRegion: (region: string) => void;
}

function Header({ score, region, setRegion }: HeaderProps): ReactElement {
  const [languageModal, setLanguageModal] = useState<boolean>(false);
  const [regionList, setRegionList] = useState<string[]>([]);

  useEffect(() => {
    getRegions().then((regions) => {
      setRegionList(regions.payload);
    });
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        height: "20%",
        paddingTop: "20px",
      }}
    >
      <Container>
        <Toolbar disableGutters>
          <Grid sx={{ justifyContent: "flex-start" }}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                flexGrow: 2,
                fontStyle: "italic",
                fontWeight: 800,
                color: "white",
                fontSize: "3.5rem",
              }}
            >
              FAMEFAKED
            </Typography>

            <Typography
              variant="caption"
              component="div"
              sx={{
                color: "white",
                fontStyle: "italic",
                fontSize: "1.5rem",
              }}
            >
              HTML Heroes
            </Typography>
          </Grid>

          <Divider
            orientation="vertical"
            flexItem
            sx={{
              backgroundColor: "white",
              width: "2px",
              margin: "20px 40px",
            }}
          />

          <Container
            maxWidth={false}
            sx={{
              width: "100%",
            }}
          >
            <Box
              sx={{
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <h1>Score: {score}</h1>
            </Box>
          </Container>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              backgroundColor: "white",
              width: "2px",
              margin: "20px 40px",
            }}
          />

          <Grid
            container
            direction="row"
            gap={2}
            sx={{
              display: "flex",
              flexDirection: "row",
              color: "white",
            }}
          >
            <h1>
              Region: <span> {region} </span>
              <svg
                onClick={() => setLanguageModal(true)}
                cursor="pointer"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="white"
                className="bi bi-chevron-down"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 01.708 0L8 10.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z"
                />
              </svg>
            </h1>
          </Grid>
        </Toolbar>
      </Container>
      {languageModal && (
        <Modal
          open={languageModal}
          onClose={() => setLanguageModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Container
            maxWidth={false}
            sx={{
              width: "100vh",
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
                width: "50%",
                height: "50%",
                position: "absolute",
                top: "25%",
                left: "25%",
                border: "white",
                borderStyle: "solid",
                borderWidth: "2px",
                borderRadius: "10px",
              }}
            >
              <h1>Language</h1>
              {regionList.map((region) => (
                <Button
                  id={region}
                  variant="contained"
                  sx={{
                    color: "black",
                    backgroundColor: "white",
                    width: "50%",
                    marginTop: "10px",
                  }}
                  onClick={() => {
                    setRegion(region);
                    setLanguageModal(false);
                  }}
                >
                  {region}
                </Button>
              ))}
            </Box>
          </Container>
        </Modal>
      )}
    </Box>
  );
}

export default Header;
