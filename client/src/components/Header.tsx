import React, { ReactElement, FC } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Container, Divider, Grid } from "@mui/material";

interface HeaderProps {
  score: number;
}

function Header({ score }: HeaderProps): ReactElement {
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
            }}
          >
            <Typography
              variant="caption"
              component="div"
              sx={{
                color: "white",
                fontSize: "1.5rem",
                fontStyle: "italic",
              }}
            >
              Privacy Policy
            </Typography>
            <Typography
              variant="caption"
              component="div"
              sx={{
                color: "white",
                fontSize: "1.5rem",
                fontStyle: "italic",
              }}
            >
              Language
            </Typography>
          </Grid>
        </Toolbar>
      </Container>
    </Box>
  );
}

export default Header;
