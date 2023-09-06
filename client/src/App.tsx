import React from "react";
import "./App.css";
import Layout from "./components/Layout";
import { ThemeProvider, createTheme } from "@mui/material";
import Player from "./common/Player";

function App() {
    const theme = createTheme({
        palette: {
            primary: {
                light: "#63b8ff",
                main: "#0D0C1E",
                dark: "#005db0",
                contrastText: "#000",
            },
            secondary: {
                main: "#1c1c1c",
                light: "#82e9de",
                dark: "#00867d",
                contrastText: "#000",
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Layout>
                <Player />
            </Layout>
        </ThemeProvider>
    );
}

export default App;
