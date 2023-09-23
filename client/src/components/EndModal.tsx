import { Box, Container, Modal } from "@mui/material";
import { ReactElement } from "react";

interface IEndModal {
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
}

export default function EndModal({
  modalOpen,
  setModalOpen,
}: IEndModal): ReactElement {
  return (
    <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
      <Box
        sx={{
          backgroundColor: "#0D0C1E",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
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
            <h1>Game Over</h1>
          </Box>
        </Container>
      </Box>
    </Modal>
  );
}
