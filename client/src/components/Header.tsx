import React, { ReactElement, FC } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Container, Grid } from "@mui/material";

const Header: FC<any> = (): ReactElement => {
  const Spacer = styled("div")({
    flexGrow: 1,
  });

  return (
    <Box
      sx={{
        height: "auto",
        backgroundColor: "primary.main",
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
              }}
            >
              MEMEFAKED
            </Typography>

            <Typography
              variant="caption"
              component="div"
              sx={{
                color: "white",
              }}
            >
              HTML Heroes
            </Typography>
          </Grid>
          <Spacer />
          <Grid sx={{ justifyContent: "flex-end" }}>
            <Grid>
              <Grid xs={6}>
                <Typography
                  variant="caption"
                  component="div"
                  sx={{
                    color: "white",
                  }}
                >
                  Privacy Policy
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography
                  variant="caption"
                  component="div"
                  sx={{
                    color: "white",
                  }}
                >
                  Language
                </Typography>
              </Grid>
            </Grid>

            <Typography
              variant="caption"
              component="div"
              sx={{
                color: "white",
              }}
            >
              HTML Heroes
            </Typography>
          </Grid>
        </Toolbar>
      </Container>
    </Box>
  );
};

export default Header;
