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
import { uploadFile } from "../../utility/uploadimage";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import Studentp_Navbar from '../../components/student_p_navbar';

import getLPTheme from "../.././components/getLPTheme";
import "@radix-ui/themes/styles.css";
import { Flex, Separator } from "@radix-ui/themes";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Tab,
  Tabs,
  Toolbar,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ToastAlert } from "../.././utility/toast";

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

export default function Courses() {
  var uid = window.localStorage.getItem("uid");
  useEffect(() => {
    if (uid === null) {
      window.location.href = "/";
    }

    createData();
  });


  async function createData() {
    const userQuery = query(collection(db, "users"), where("type", "==", "student"));
    const querySnapshot = await getDocs(userQuery);
    const newRows = [];

    querySnapshot.forEach((doc) => {
        const stdinfo = {
            name: doc.data().name,
            courses: doc.data().course,
            email: doc.data().email,
        };
        newRows.push(addData(stdinfo.name, stdinfo.courses, stdinfo.email));
    });

    setRows(newRows);
}

function addData(name, courses, email) {
    return { name, courses, email };
}


 


const [value, setValue] = React.useState("1");

const handleChange = async (event, newValue) => {
  setValue(newValue);
};

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
      <div
        className="dash_home"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100vh",
        }}
      >
        <div
          className="container-1"
          style={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
            height: "80vh",
            // border: "10px solid #e0e0e0",
          }}
        >
          <div className="container1-menu">
            <TabContext value={value}>
              <Box
                sx={{
                  borderColor: "divider",
                  borderRadius: "10px 10px 0px 0px",
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  padding: "10px",
                  paddingBottom: "0px",
                  backgroundColor: "#ececec",
                  // borderBottomColor: "#2756BD",
                }}
              >
                <TabList onChange={handleChange} aria-label="">
                  <Tab
                    label="Student"
                    value="1"
                    style={{
                      fontFamily: "Trebuchet MS",
                    }}
                  />
                  <Tab
                    label="Teacher"
                    value="2"
                    style={{
                      fontFamily: "Trebuchet MS",
                    }}
                  />
                </TabList>
              </Box>
              <TabPanel value="1">
                {/* <div className="add_student">
                  <h1
                    className="h2"
                    style={{
                      textAlign: "center",
                      fontFamily: "Russo One",
                      fontWeight: "400",
                      fontStyle: "normal",
                      color: "#2756BD",
                      sx: {
                        "@media (max-width: 450px)": {
                          fontSize: "1rem",
                        },
                      },
                    }}
                  >
                    Remove Student
                  </h1>

                  <div className="add_student_form">
                    <div className="form-row-1-1">
                      <p>Enter IDs: </p>
                      <div
                        id="nostudents"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          flexWrap: "wrap",
                          gap: "10px",
                        }}
                      >
                        <textarea
                          className="student_id_area"
                          onChange={(e) => {
                            setStudent(e.target.value);
                          }}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="add_student_button">
                    <Button variant="outlined" onClick={remove_student}>
                      Remove Students
                    </Button>
                  </div>
                </div> */}
              </TabPanel>
              <TabPanel value="2">
              {/* <div className="add_student">
                  <h1
                    className="h2"
                    style={{
                      textAlign: "center",
                      fontFamily: "Russo One",
                      fontWeight: "400",
                      fontStyle: "normal",
                      color: "#2756BD",
                      sx: {
                        "@media (max-width: 450px)": {
                          fontSize: "1rem",
                        },
                      },
                    }}
                  >
                    Remove Teacher
                  </h1>

                  <div className="add_student_form">
                    <div className="form-row-1-1">
                      <p>Enter names: </p>
                      <div
                        id="nostudents"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          flexWrap: "wrap",
                          gap: "10px",
                        }}
                      >
                        <textarea
                          className="student_id_area"
                          onChange={(e) => {
                            setTeacher(e.target.value);
                          }}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="add_student_button">
                    <Button variant="outlined" onClick={remove_teacher}>
                      Remove Teachers
                    </Button>
                  </div>
                </div> */}
              </TabPanel>
            </TabContext>
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
