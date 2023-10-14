import React, { ReactElement, FC, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
    Button,
    Container,
    Divider,
    Grid,
    Menu,
    MenuItem,
    Modal,
} from "@mui/material";
import { getRegions } from "../NetworkCalls";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

interface HeaderProps {
    score: number;
    region: string;
    setRegion: (region: string) => void;
}

function Header({ score, region, setRegion }: HeaderProps): ReactElement {
    const [languageModal, setLanguageModal] = useState<boolean>(false);
    const [regionList, setRegionList] = useState<string[]>([]);

    useEffect(() => {
        getRegions().then((regions) => {
            setRegionList(regions.payload);
        });
    }, []);

    return (
        <Box
            sx={{
                backgroundColor: "primary.main",
                height: "20%",
                paddingTop: "20px",
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
                                fontSize: "3.5rem",
                            }}
                        >
                            FAMEFAKED
                        </Typography>

                        <Typography
                            variant="caption"
                            component="div"
                            sx={{
                                color: "white",
                                fontStyle: "italic",
                                fontSize: "1.5rem",
                            }}
                        >
                            HTML Heroes
                        </Typography>
                    </Grid>

                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{
                            backgroundColor: "white",
                            width: "2px",
                            margin: "20px 40px",
                        }}
                    />

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
                            }}
                        >
                            <h1>Score: {score}</h1>
                        </Box>
                    </Container>
                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{
                            backgroundColor: "white",
                            width: "2px",
                            margin: "20px 40px",
                        }}
                    />

                    <Grid
                        container
                        direction="row"
                        gap={2}
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            color: "white",
                        }}
                    >
                        <PopupState variant="popover" popupId="demo-popup-menu">
                            {(popupState) => (
                                <React.Fragment>
                                    <Button
                                        variant="contained"
                                        {...bindTrigger(popupState)}
                                    >
                                        Region: {region}
                                    </Button>
                                    <Menu {...bindMenu(popupState)}>
                                        {regionList.map((region) => (
                                            <MenuItem
                                                id={region}
                                                onClick={() => {
                                                    setRegion(region);
                                                    setLanguageModal(false);
                                                    popupState.close;
                                                }}
                                                sx={{ color: "Black" }}
                                            >
                                                {region}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </React.Fragment>
                            )}
                        </PopupState>
                    </Grid>
                </Toolbar>
            </Container>
        </Box>
    );
}

export default Header;
