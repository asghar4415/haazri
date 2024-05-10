import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import AppAppBar from '../../components/navbar';
import getLPTheme from '../../components/getLPTheme';
import '@radix-ui/themes/styles.css';

import {
  doc,
  setDoc,
  createUserWithEmailAndPassword,
  auth,
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  updateDoc,
  db,
} from "../../firebase";
import { uploadFile } from "../../utility/uploadimage";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  OutlinedInput,
  Tab,
  Tabs,
  Toolbar,
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ToastAlert } from "../../utility/toast";
import "./add_users.css";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Data Structures',
  'Database Management System',
  'Computer Networks',
  'Operating Systems',
  'Web Development',
  'Linear Algebra',
  'Calculus',
  'Discrete Mathematics',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100dvw',
        position: 'fixed',
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
          backgroundColor: 'background.default',
          '& .Mui-selected': {
            pointerEvents: 'none',
          },
        }}
      >

      </ToggleButtonGroup>
    </Box>
  );
}

ToggleCustomTheme.propTypes = {
  showCustomTheme: PropTypes.shape({
    valueOf: PropTypes.func.isRequired,
  }).isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

export default function Add_User() {
  const theme = useTheme();


  var uid = window.localStorage.getItem("uid");

  useEffect(() => {
    if (uid === null) {
      window.location.href = "/";
    }
  });


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cnic, setCnic] = useState("");
  const [studentId, setStudentId] = useState("");
  const [batch, setBatch] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [stdImage, setStdImage] = useState(null);
  const [password, setPassword] = useState("");


  var fullname = firstName + " " + lastName;

  const adding_student = async () => {
    event.preventDefault();
    try {
      if (
        !fullname ||
        !cnic ||
        !studentId ||
        !batch ||
        !phone ||
        !email ||
        !address ||
        !password
      ) {
        ToastAlert("required fields are missing", "error");
        return;
      }

      // if (!stdImage) {
      //   setStdImage("../../assets/man.jpg");
      // }

      //AUTH
      const stdData = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userID = stdData.user.uid;


      // Image
      // const imageURL = await uploadFile(stdImage);


      const obj = {
        email,
        name: fullname,
        cnic,
        studentId,
        batch,
        phone,
        address,
        type: "student",
        // imageURL,
        isActive: true,
      };

      await setDoc(doc(db, "users", userID), obj);



      ToastAlert("Student added successfully!", "success");
    } catch (error) {
      ToastAlert(error.code || error.message, "error");
    }
  };

  //adding teacher

  const [teacherFirstName, setTeacherFirstName] = useState("First Name");
  const [teacherLastName, setTeacherLastName] = useState("Last Name");
  const [teacherCnic, setTeacherCnic] = useState("CNIC");
  const [teacherPhone, setTeacherPhone] = useState("Phone");
  const [teacherEmail, setTeacherEmail] = useState("Email");
  const [teacherAddress, setTeacherAddress] = useState("Address");
  // const [teacherImage, setTeacherImage] = useState(null);
  const [teacherPassword, setTeacherPassword] = useState("Password");

  const [courseName, setCourseName] = React.useState([]);

  const course_select = (event) => {
    const {
      target: { value },
    } = event;
    setCourseName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  // console.log(courseName);

  var teacherFullname = teacherFirstName + " " + teacherLastName;

  const setEmail1 = (e) => {

    var email1 = e.target.value;
    email1 = email1.toLowerCase();
    email1 += "@gmail.com";
    // console.log(email1)
    setTeacherEmail(email1);
  };

  const adding_teacher = async () => {
    event.preventDefault();

    try {
      if (
        !teacherFullname ||
        !teacherCnic ||
        !teacherPhone ||
        !teacherEmail ||
        !teacherAddress ||
        // !teacherCourse ||
        !courseName ||
        !teacherPassword
      ) {
        ToastAlert("required fields are missing", "error");
        return;
      }

      //AUTH
      const teacherData = await createUserWithEmailAndPassword(
        auth,
        teacherEmail,
        teacherPassword
      );

      const userID = teacherData.user.uid;
      // console.log(userID);

      // Image
      // const imageURL = await uploadFile(teacherImage);

      const obj = {
        uid: userID,
        email: teacherEmail,
        name: teacherFullname,
        cnic: teacherCnic,
        phone: teacherPhone,
        address: teacherAddress,
        course: courseName,
        type: "teacher",
        // imageURL,
        isActive: true,
      };

      await setDoc(doc(db, "users", userID), obj);


      for (var i = 0; i < courseName.length; i++) {
        var course_split = courseName[i].toString();

        const course_S =
        {
          teachername: teacherFullname,
          teacherID: userID,
          course: course_split,
        }

        await setDoc(doc(db, "courses", userID), course_S);

      }





      ToastAlert("Teacher added successfully!", "success");

      setTeacherFirstName("");
      setTeacherLastName("");
      setTeacherCnic("");
      setTeacherPhone("");
      setTeacherEmail("");
      setTeacherAddress("");

      // setTeacherImage(null);
      setTeacherPassword("");
      setCourseName([]);





    } catch (error) {
      ToastAlert(error.code || error.message, "error");
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
        <div className='dash_home'>
          <div className='container-1'
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
                      label="Add Student"
                      value="1"
                      style={{
                        fontFamily: "Trebuchet MS",
                      }}
                    />
                    <Tab
                      label="Add Teacher"
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
                    // style={{
                    //   textAlign: "center",
                    //   fontFamily: "Russo One",
                    //   fontWeight: "400",
                    //   fontStyle: "normal",
                    //   color: "#2756BD",
                    //   sx: {
                    //     "@media (max-width: 450px)": {
                    //       fontSize: "1rem",
                    //     },
                    //   },
                    // }}
                    >
                      Add Student
                    </h1>

                    <div className="add_student_form">
                      <div className="form-row-1">
                        <TextField
                          id="outlined-basic"
                          label="First Name"
                          variant="outlined"
                          className="firstname"
                          onChange={(e) => {
                            setFirstName(e.target.value);
                          }}
                        />
                        <TextField
                          id="outlined-basic"
                          label="Last Name"
                          variant="outlined"
                          className="lastname"
                          onChange={(e) => {
                            setLastName(e.target.value);
                          }}
                        />
                      </div>
                      <div className="form-row-2">
                        <TextField
                          id="outlined-basic"
                          label="CNIC number"
                          variant="outlined"
                          className="cnic"
                          onChange={(e) => {
                            setCnic(e.target.value);
                          }}
                        />


                        <TextField
                          id="outlined-basic"
                          label="Student ID"
                          variant="outlined"
                          className="studentid"
                          onChange={(e) => {
                            setStudentId(e.target.value);
                          }}
                        />
                        <TextField
                          id="outlined-basic"
                          label="Batch"
                          variant="outlined"
                          className="batch"
                          onChange={(e) => {
                            setBatch(e.target.value);
                          }}
                        />
                      </div>
                      <div className="form-row-3">
                        <TextField
                          id="outlined-basic"
                          label="Phone number"
                          variant="outlined"
                          className="phone"
                          onChange={(e) => {
                            setPhone(e.target.value);
                          }}
                        />
                        <TextField
                          id="outlined-basic"
                          label="Email"
                          variant="outlined"
                          className="email"
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                        <TextField
                          id="outlined-basic"
                          label="Password"
                          variant="outlined"
                          className="password"
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                      </div>

                      <div className="form-row-5">
                        <TextField
                          id="outlined-basic"
                          label="Address"
                          variant="outlined"
                          className="address"
                          onChange={(e) => {
                            setAddress(e.target.value);
                          }}
                        />
                      </div>
                      {/* <div className="form-row-4">
                        <Button
                          variant="contained"
                          component="label"
                          className="image_upload"
                          onChange={(e) => {
                            setStdImage(e.target.files[0]);
                          }}
                        >
                          Upload image
                          <input type="file" hidden />
                        </Button>
                      </div> */}
                    </div>
                    <div className="add_student_button">
                      <Button variant="outlined" onClick={adding_student}>
                        Add Student
                      </Button>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="2">
                  <div className="add_student">
                    <h1
                      className="h2"
                    // style={{
                    //   textAlign: "center",
                    //   fontFamily: "Russo One",
                    //   fontWeight: "400",
                    //   fontStyle: "normal",
                    //   color: "#2756BD",
                    //   sx: {
                    //     "@media (max-width: 450px)": {
                    //       fontSize: "1rem",
                    //     },
                    //   },
                    // }}
                    >
                      Add Teacher
                    </h1>

                    <div className="add_student_form">
                      <div className="form-row-1">
                        <TextField
                          id="outlined-basic"
                          label="First Name"
                          variant="outlined"
                          className="firstname1"
                          onChange={(e) => {
                            setTeacherFirstName(e.target.value);
                          }}
                        />
                        <TextField
                          id="outlined-basic"
                          label="Last Name"
                          variant="outlined"
                          className="lastname1"
                          onChange={(e) => {
                            setTeacherLastName(e.target.value);
                          }}
                        />
                      </div>
                      <div className="form-row-2">
                        <TextField
                          id="outlined-basic"
                          label="CNIC number"
                          variant="outlined"
                          className="cnic1"
                          onChange={(e) => {
                            setTeacherCnic(e.target.value);
                          }}
                        />
                        <TextField
                          id="outlined-basic"
                          label="Phone number"
                          variant="outlined"
                          className="phone1"
                          onChange={(e) => {
                            setTeacherPhone(e.target.value);
                          }}
                        />

                        {/* <TextField
                          id="outlined-basic"
                          label="Course"
                          variant="outlined"
                          className="course1"
                          onChange={(e) => {
                            setTeacherCourse(e.target.value);
                          }}
                        /> */}
                        <div className="course_selection">
                          <FormControl sx={{
                            m: 1, width: 250,

                          }} size="small">
                            <InputLabel id="demo-multiple-name-label">Course</InputLabel>
                            <Select
                              labelId="demo-multiple-name-label"
                              id="demo-multiple-name"
                              multiple
                              value={courseName}
                              onChange={course_select}
                              input={<OutlinedInput label="Name" />}
                              MenuProps={MenuProps}
                            >
                              {names.map((name) => (
                                <MenuItem
                                  key={name}
                                  value={name}
                                  style={getStyles(name, courseName, theme)}
                                >
                                  {name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                      <div className="form-row-3">
                        <TextField
                          id="outlined-basic"
                          label="Email"
                          variant="outlined"
                          className="email1"
                          onChange={(e) => {
                            setEmail1(e);
                          }}
                        />
                        <TextField
                          id="outlined-basic"
                          label="Password"
                          variant="outlined"
                          className="password1"
                          onChange={(e) => {
                            setTeacherPassword(e.target.value);
                          }}
                        />
                      </div>

                      <div className="form-row-5">
                        <TextField
                          id="outlined-basic"
                          label="Address"
                          variant="outlined"
                          className="address1"
                          onChange={(e) => {
                            setTeacherAddress(e.target.value);
                          }}
                        />
                      </div>
                      {/* <div className="form-row-4">
                        <Button
                          variant="contained"
                          component="label"
                          className="image_upload1"
                          onChange={(e) => {
                            setTeacherImage(e.target.files[0]);
                          }}
                        >
                          Upload image
                          <input type="file" hidden />
                        </Button>
                      </div> */}
                    </div>
                    <div className="add_student_button">
                      <Button variant="outlined" onClick={adding_teacher}>
                        Add Teacher
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







