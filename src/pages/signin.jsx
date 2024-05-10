import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import { Divider, IconButton, InputAdornment } from "@mui/material";
import { signInWithEmailAndPassword,
   auth,
    db,
    getDoc,
    doc,
 } from "../firebase";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from '@mui/material/Link';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import SignUp from "./signup";
import { ToastAlert } from "../utility/toast";

const defaultTheme = createTheme();

export default function SignIn() {
  var uid = window.localStorage.getItem("uid");

  // useEffect(() => {
  //   if (uid !== null) {
  //     navigate("/dashboard");
  //   }
  // });

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(email);
    // console.log(password);
    if (!email || !password) {
      console.log("required field are missing");
      return;
    }
    
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {

        // console.log("signing in")
        // Signed in
        const user = userCredential.user;
        // console.log(user, "user")
        const userID = user.uid;

        window.localStorage.setItem("uid", userID);

        if(email === "asghar@gmail.com")
        {
          navigate("/dashboard"); 

        }
        else if(email[0] ==="k")
        {
          navigate("/studentportal"); 
        }
        else{
          navigate("/teacherportal");
        }

       
      
        ToastAlert("User loggedin successfully", "success");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        ToastAlert("Invalid credentials ", "error");

      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "5%",

              h1: {
                fontFamily: "Russo One, sans-serif",
                fontWeight: "400",
                fontStyle: "normal",
                fontSize: "60px",
                color: "#2756BD",
              },
              span: {
                color: "green",
              },
              img: {
                marginTop: "-2rem",
                width: "17rem",
                height: "20rem",
              },

              "@media (max-width: 600px)": {
                display: "none",
              },
            }}
          >
            <h1>
              Haazri<span>.</span>
            </h1>
            <p></p>
            <img
              src="/img/png-transparent-education-brain-teacher-creative-text-people-cerebrum-thumbnail-removebg-preview.png"
              alt=""
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",

              fontStyle: "normal",
              color: "#2756BD",

              span: {
                color: "green",
              },
              // '.signin-logo':
              // {
              //     display: 'none',
              // },

              "@media (max-width: 450px)": {
                "signin-logo": {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                },
                ".signin-logo-img": {
                  width: "7rem",
                  height: "8rem",
                },
              },
              "@media (min-width: 600px)": {
                "signin-logo": {
                  display: "none",
                },
                ".signin-logo-img": {
                  display: "none",
                },
              },
            }}
          >
            <div className="signin-logo">
              <img
                className="signin-logo-img"
                src="/img/png-transparent-education-brain-teacher-creative-text-people-cerebrum-thumbnail-removebg-preview.png"
                alt=""
              />
            </div>

            <Typography
              component="h1"
              variant="h5"
              fontWeight={"400"}
              fontFamily={"Russo One"}
              fontSize={"30px"}
            >
              Sign In<span>.</span>
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                type="password"
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                fullWidth
                name="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  fontFamily: "helvetica",
                  fontWeight: "400",
                  backgroundColor: "#2756BD",
                }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
