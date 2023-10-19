import React, { ReactElement } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Play from "./Pages/Player";
import { ThemeProvider, createTheme } from "@mui/material";

export default function App(): ReactElement {
    const theme = createTheme({
        palette: {
            mode: "dark",
            primary: {
                main: "#121212",
            },
            secondary: {
                main: "#919191",
                contrastText: "#000000",
            },
            text: {
                primary: "rgba(255,255,255,0.87)",
                secondary: "#fffffff",
            },
            background: {
                default: "#121212",
                paper: "#121212",
            },
        },
    });
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/play" element={<Play />} />
                </Routes>
                {/* <Route exact path="/contact" component={ContactPage} /> */}
            </Router>
        </ThemeProvider>
    );
}
