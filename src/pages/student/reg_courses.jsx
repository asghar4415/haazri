import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
    collection,
    deleteDoc,
    getDocs,
    getDoc,
    query,
    where,
    db,
    deleteUser,
    storage,
  } from "../../firebase";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import Studentp_Navbar from '../../components/student_p_navbar';
import getLPTheme from '../../components/getLPTheme';
import "@radix-ui/themes/styles.css";
import "../admin_p/admin_dash.css";
import './student_p.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100dvw",
                position: "fixed",
                bottom: 24,
            }}
        >
            <ToggleButtonGroup
                color="primary"
                exclusive
                value={showCustomTheme}
                onChange={toggleCustomTheme}
                aria-label="Platform"
                sx={{
                    backgroundColor: "background.default",
                    "& .Mui-selected": {
                        pointerEvents: "none",
                    },
                }}
            ></ToggleButtonGroup>
        </Box>
    );
}

ToggleCustomTheme.propTypes = {
    showCustomTheme: PropTypes.shape({
        valueOf: PropTypes.func.isRequired,
    }).isRequired,
    toggleCustomTheme: PropTypes.func.isRequired,
};

export default function RegisterCourses() {


    const uid = window.localStorage.getItem("uid");

    useEffect(() => {
        if (uid === null) {
            window.location.href = "/";
            return; 
        }

    }, [uid]);

    

    const [mode, setMode] = React.useState("light");
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const LPtheme = createTheme(getLPTheme(mode));
    const defaultTheme = createTheme({ palette: { mode } });

    const toggleColorMode = () => {
        setMode((prev) => (prev === "dark" ? "light" : "dark"));
    };

    const toggleCustomTheme = () => {
        setShowCustomTheme((prev) => !prev);
    };

    return (
        <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
            <CssBaseline />
            <Studentp_Navbar mode={mode} toggleColorMode={toggleColorMode} />

            <Box>
                <Studentp_Navbar />
                <div className="dash_home">
                    <div className="container-1">
                        <div className="container-1-1">
                      
                        <h1>
                            List of Students
                        </h1>
                   
                    </div>

                    </div>
                </div>
            </Box>

            <ToggleCustomTheme
                showCustomTheme={showCustomTheme}
                toggleCustomTheme={toggleCustomTheme}
            />
        </ThemeProvider>
    );
}
