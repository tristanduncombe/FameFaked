import React, { ReactElement } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Play from "./Pages/Player";
import { ThemeProvider, createTheme } from "@mui/material";

export default function App(): ReactElement {
    const theme = createTheme({
        palette: {
            primary: {
                light: "#FF6961",
                main: "#121212",
                dark: "#005db0",
                contrastText: "#fffff",
            },
            secondary: {
                light: "#ce93d8",
                main: "#11141c",
                dark: "#00867d",
                contrastText: "#fffff",
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
