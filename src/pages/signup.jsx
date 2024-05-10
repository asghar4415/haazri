
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
// import SignIn from '../App  ';

import React, { useState } from "react";
import {


  Divider,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { createUserWithEmailAndPassword, auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { ToastAlert } from "../utility/toast";

const defaultTheme = createTheme();

export default function SignUp() {

  const navigate = useNavigate();


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      console.log("required field are missing");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const admin = userCredential.user;
        console.log(admin, "admin");

        ToastAlert("User signedup successfully", "success");
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        ToastAlert(errorCode, "error");
        // ..
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
        >
          <Box
            sx={{


              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '10%',

              h1: {
                fontFamily: 'Russo One, sans-serif',
                fontWeight: '400',
                fontStyle: 'normal',
                fontSize: '70px',
                color: '#2756BD',
              },
              span: {
                color: 'green',
              },

              '@media (max-width: 600px)':
              {
                display: 'none',
              }
            }}


          >
            <h1>Haazri<span>.</span></h1>
            <p></p>

          </Box>

        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',

              fontStyle: 'normal',
              color: '#2756BD',

              span:
              {
                color: 'green',
              },

            }}
          >

            <Typography component="h1" variant="h5" fontWeight={"400"} fontFamily={"Russo One"} fontSize={"30px"} >
              Sign Up<span>.</span>
            </Typography>

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={(e) => setFirstName(e.target.value)}

                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"

                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>

              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3, mb: 2,
                  fontFamily: 'helvetica',
                  fontWeight: '400',
                  backgroundColor: '#2756BD',
                }}
              >
                Sign Up
              </Button>

            </Box>

          </Box>

        </Grid>
      </Grid>

    </ThemeProvider>




  );
}