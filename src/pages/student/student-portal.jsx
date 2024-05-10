import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
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

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import Studentp_Navbar from '../../components/student_p_navbar';
import getLPTheme from '../../components/getLPTheme';
import '@radix-ui/themes/styles.css';
import { Flex, Separator } from '@radix-ui/themes';
import './student_p.css';
import "../admin_p/admin_dash.css";
import TextField from '@mui/material/TextField';


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

export default function StudentPortal() {
  var uid = window.localStorage.getItem("uid");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [batch, setBatch] = useState("");
  const [studentID, setStudentID] = useState("");
  const [cnic , setCNIC] = useState("");



  useEffect(() => {

    if (uid === null) {
      window.location.href = "/";
    }

    userData();
  });

  async function userData ()
  {

    const userQuery = query(collection(db, "users"), where("type", "==", "student"));
    const querySnapshot = await getDocs(userQuery);
    querySnapshot.forEach((doc) => {
      if (doc.id === uid)
        {
          setName(doc.data().name);
          setEmail(doc.data().email);
          setPhone(doc.data().phone);
          setAddress(doc.data().address);
          setBatch(doc.data().batch);
          setStudentID(doc.data().studentId);
          setCNIC(doc.data().cnic);

        }
    });

  }




  const [mode, setMode] = React.useState('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
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
        <div className='dash_home'>
          <div className='container-1'>
            <div className="admin_profile">


          
      <div className="student_profile">
        
        <div className="studentName">
        <p>Name: </p>
        <TextField
          id="outlined-read-only-input"
          label={name}
          InputProps={{
            readOnly: true,
            
          }}
        />
        </div>

        <div className="studentID">
        <p>Student ID: </p>
        <TextField
          id="outlined-read-only-input"
          label={studentID}
          InputProps={{
            readOnly: true,
          }}
        />
        </div>
    

        <div className="studentEmail">
        <p>Email: </p>
        <TextField
          id="outlined-read-only-input"
          label={email}
          InputProps={{
            readOnly: true,
          }}
        />
        </div>
        <div className="studentBatch">
        <p>Batch: </p>
        <TextField
          id="outlined-read-only-input"
          label={batch}
          InputProps={{
            readOnly: true,
          }}
        />
        </div>

        <div className="studentPhone">
        <p>Phone: </p>
        <TextField
          id="outlined-read-only-input"
          label={phone}
          InputProps={{
            readOnly: true,
          }}
        />
        </div>

        <div className="studentCNIC">
        <p>CNIC: </p>
        <TextField
          id="outlined-read-only-input"
          label={cnic}
          InputProps={{
            readOnly: true,
          }}
        />
        </div>

        <div className="studentAddress">
        <p>Address: </p>
        <TextField
          id="outlined-read-only-input"
          label={address}
          InputProps={{
            readOnly: true,
          }}

        />
        </div>

        


        
        
      </div>
   
  



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







