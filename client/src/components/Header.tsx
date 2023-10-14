import React, { ReactElement, FC, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
    AppBar,
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
        <AppBar sx={{ backgroundColor: "grey" }}>
            <Toolbar disableGutters sx={{ width: "65vw", margin: "auto" }}>
                <Box>
                    <Typography
                        variant="h5"
                        fontFamily={"Segoe UI"}
                        fontWeight={"600"}
                    >
                        FAMEFAKED
                    </Typography>
                    <Typography variant="caption" fontStyle={"italic"}>
                        a HTML Heroes game
                    </Typography>
                </Box>
                <Box
                    sx={{
                        margin: "auto",
                    }}
                >
                    <Typography variant={"h5"}>Score: {score}</Typography>
                </Box>
                <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                        <React.Fragment>
                            <Button
                                variant="contained"
                                sx={{ color: "white" }}
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
                                        sx={{ color: "#11141c" }}
                                    >
                                        {region}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </React.Fragment>
                    )}
                </PopupState>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
