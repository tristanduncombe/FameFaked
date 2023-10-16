import React, { ReactElement } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { PlayArrow } from "@mui/icons-material";

export default function HomePage(): ReactElement {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "#121212",
            }}
        >
            <img
                src="./FameFaked.png"
                width="20%"
                style={{ marginTop: "5%", marginBottom: "5%" }}
            />
            <Typography
                variant="h5"
                sx={{ color: "white", mb: 5 }}
                fontWeight={"bold"}
            >
                Is that celebrity Deepfaked?
            </Typography>
            <Typography sx={{ color: "white" }}>
                A game about detecing whether a Celebrity Video is Deepfaked or
                not.
            </Typography>
            <Typography sx={{ color: "white", mb: 5 }}>
                Learn about the tools that are used to avoid the deception of
                the masses.
            </Typography>
            <Button
                variant="contained"
                component={Link}
                to="/play"
                sx={{ color: "#121212", bgcolor: "White", mr: 2, mb: 5 }}
                size="large"
            >
                Start Playing <PlayArrow />
            </Button>
            <Typography sx={{ color: "white", mb: 5 }}>
                Looking for help? Take a look at our guide!
            </Typography>
            <Typography
                sx={{
                    color: "white",
                    fontSize: "14px",
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    cursor: "pointer",
                    textDecoration: "none",
                    "&:hover": {
                        textDecoration: "underline",
                    },
                }}
                onClick={() => window.open("https://www.google.com")}
            >
                Policies
            </Typography>
        </Box>
    );
}
