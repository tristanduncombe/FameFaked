import React, { ReactElement } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Play from "./Pages/Player";
import { RouteProps } from "react-router-dom";

export default function App(): ReactElement {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/play" element={<Play />} />
            </Routes>
            {/* <Route exact path="/contact" component={ContactPage} /> */}
        </Router>
    );
}
