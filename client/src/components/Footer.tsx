import React, { FC, ReactElement } from "react";
import { Box, Container, Grid, Link, Typography } from "@mui/material";

export const Footer: FC = (): ReactElement => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "auto",
                backgroundColor: "primary.main",
                color: "white",
            }}
        >
            <Container maxWidth="md" sx={{ p: 2 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h5">MEMEFAKED</Typography>
                        <Typography variant="body1">tagline</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1">
                            &copy; {new Date().getFullYear()} MemeFaked. All
                            rights reserved.
                        </Typography>
                        <Typography variant="body1">
                            <Link href="" sx={{ color: "white" }}>
                                link
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;
