import { Box, Container } from "@mui/material";
import { ReactElement } from "react";

interface IScore {
  score: number;
}

export default function Score({ score }: IScore): ReactElement {
  return (
    // Box to display the score
    <Box
      sx={{
        backgroundColor: "#0D0C1E",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "80%",
        position: "relative",
      }}
    >
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
            paddingBottom: "10px",
          }}
        >
          <h1>Score: {score}</h1>
        </Box>
      </Container>
    </Box>
  );
}
