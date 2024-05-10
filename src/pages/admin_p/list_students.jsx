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
import AppAppBar from "../../components/navbar";
import getLPTheme from "../../components/getLPTheme";
import "@radix-ui/themes/styles.css";
import "./list_students.css";
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

export default function List_Students() {
    const [rows, setRows] = useState([]);


    const uid = window.localStorage.getItem("uid");

    useEffect(() => {
        if (uid === null) {
            window.location.href = "/";
            return; // Add return statement to exit early
        }

        createData();

        // Add uid to the dependency array
    }, [uid]);

    async function createData() {
        const userQuery = query(collection(db, "users"), where("type", "==", "student"));
        const querySnapshot = await getDocs(userQuery);
        const newRows = [];

        querySnapshot.forEach((doc) => {
            const stdinfo = {
                name: doc.data().name,
                id: doc.data().studentId,
                email: doc.data().email,
            };
            newRows.push(addData(stdinfo.name, stdinfo.id, stdinfo.email));
        });

        setRows(newRows);
    }

    function addData(name, id, email) {
        return { name, id, email };
    }


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
            <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />

            <Box>
                <AppAppBar />
                <div className="dash_home">
                    <div className="container-1">
                        <div className="container-1-1">
                      
                        <h1>
                            List of Students
                        </h1>
                    <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
      <Table sx={{ minWidth: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell>Name</TableCell>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">Email</TableCell>
            {/* <TableCell align="right">Course</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              {/* <TableCell align="right">{row.course}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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
