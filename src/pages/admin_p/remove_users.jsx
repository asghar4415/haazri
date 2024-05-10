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
import AppAppBar from "../../components/navbar";
import getLPTheme from "../../components/getLPTheme";
import "@radix-ui/themes/styles.css";
import { Flex, Separator } from "@radix-ui/themes";
import GitHubIcon from "@mui/icons-material/GitHub";
import { SiInstagram } from "react-icons/si";
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
// import "./add_users.css";
import "./remove_users.css";
import { ToastAlert } from "../../utility/toast";

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

export default function Remove_user () {
  var uid = window.localStorage.getItem("uid");
  useEffect(() => {
    if (uid === null) {
      window.location.href = "/";
    }
  });


  var [student, setStudent] = useState("");

  const remove_student = async () => {
    student = student + " ";

    if (
      student === "" ||
      student === " " ||
      student === "NULL" ||
      student === undefined
    ) {
      ToastAlert("Please enter student ids", "error");
      // alert("Please enter student ids");
      return;
    }
  
    var studentids = [];
    for (var i = 0; i < student.length; i++) {
      if (
        student[i] === " " ||
        student[i] === "\n" ||
        student[i] === "\t" ||
        student[i] === "\r" ||
        student[i] === ","
      ) {
        studentids.push(student.substring(0, i));
        student = student.substring(i + 1);
        i = 0;
      }
    }

for (let i = 0; i < studentids.length; i++) {
  let studentId = studentids[i];

  // Trim leading and trailing whitespace
  studentId = studentId.trim();

  // Check if the studentId starts with a space
  if (studentId.charAt(0) === ' ') {
    // Move one space backward by removing the first character
    studentId = studentId.substring(1);
  }

  // Check if the studentId ends with a space
  if (studentId.charAt(studentId.length - 1) === ' ') {
    // Move one space forward by adding a space at the end
    studentId = studentId + ' ';
  }

  // Update the studentids array with the modified studentId
  studentids[i] = studentId;
}


var student_not_found = [];

    for (var i = 0; i < studentids.length; i++) {
      const user= query(collection(db, "users"), where("studentId", "==", studentids[i]));
      // console.log(user)

      const querySnapshot = await getDocs(user);
      querySnapshot.forEach((doc) => {
        var uid = doc.id;

        deleteDoc(doc.ref);
        
        // deleteUser(uid);
        
      ToastAlert("Student removed successfully", "success");

      setStudent("");

      });
    }


  };


   var [teacher, setTeacher] = useState("");


  const remove_teacher = async () => {
    teacher = teacher + " ";

    if (
      teacher === "" ||
      teacher === " " ||
      teacher === "NULL" ||
      teacher === undefined
    ) {
      ToastAlert("Please enter teacher names", "error");
      // alert("Please enter student ids");
      return;
    }

  
    var teachernames = [];
    for (var i = 0; i < teacher.length; i++) {
      if (
        teacher[i] === "\n" ||
        teacher[i] === "\t" ||
        teacher[i] === "\r" ||
        teacher[i] === ","
      ) {
         teachernames.push(teacher.substring(0, i));
        teacher = teacher.substring(i + 1);

        i = 0;
      }
    }

   
    


for (let i = 0; i < teachernames.length; i++) {
  let teachername = teachernames[i];

  // Trim leading and trailing whitespace
  teachername = teachername.trim();

  // Check if the teachername starts with a space
  if (teachername.charAt(0) === ' ') {

    teachername = teachername.substring(1);
  }

  // Check if the teachername ends with a space
  if (teachername.charAt(teachername.length - 1) === ' ') {

    teachername = teachername + ' ';
  }

  // Update the teachernames array with the modified teachername
  teachernames[i] = teachername;
}



var teacher_not_found = [];

    for (var i = 0; i < teachernames.length; i++) {
      const user= query(collection(db, "users"), where("name", "==", teachernames[i]));
      // console.log(user)

     
      const querySnapshot = await getDocs(user);
      querySnapshot.forEach((doc) => {
        var uid = doc.id;

        deleteDoc(doc.ref);
        
      ToastAlert("Teacher removed successfully", "success");

      setTeacher("");

      });
    }


  };




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
    <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />

    <Box>
      <AppAppBar />
      <div
        className="dash_home"
      
      >
        <div
          className="container-1"
         
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
                <div className="add_student">
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
                </div>
              </TabPanel>
              <TabPanel value="2">
              <div className="add_student">
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
                </div>
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
