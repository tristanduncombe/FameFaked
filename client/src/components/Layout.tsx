import React, { FC, ReactNode } from "react";
import { Box, CssBaseline } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <CssBaseline />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    flexGrow: 1,
                }}
            >
                <Header />
                <Box
                    sx={{
                        flexGrow: 1,
                        width: "100%",
                        border: "none",
                    }}
                >
                    {children}
                </Box>
                <Footer />
            </Box>
        </>
    );
};

export default Layout;
