import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import AppAppBar from '../../components/navbar';
import getLPTheme from '../../components/getLPTheme';
import '@radix-ui/themes/styles.css';
import { Flex, Separator } from '@radix-ui/themes';
import GitHubIcon from '@mui/icons-material/GitHub';
import { SiInstagram } from "react-icons/si";
import './admin_dash.css';

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

export default function DashBoard_Home() {
  var uid = window.localStorage.getItem("uid");

  useEffect(() => {

    if (uid === null) {
      window.location.href = "/";
    }


  });
  // console.log("user id: ", uid);



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
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />

      <Box>
        <AppAppBar />
        <div className='dash_home'>
          <div className='container-1'>
            <div className="admin_profile">
              <div className="admin_profile_img">
                <img src="../../../public/img/admin.jpg" alt="admin" />
              </div>
              <div className="separator">
                <Separator orientation="vertical" size="4" />
              </div>
              <div className="admin_profile_name">
                <h3>Asghar Ali</h3>
                <p className='tag-1'>Admin</p>
                <p className='tag-3'>asghar@gmail.com</p>
                <p className='tag-2'>Visit my Portfolio <a href="https://www.asgharali.online/" target='_blank'>here</a></p>
                <div className="tag-links">
                  <a href="https://github.com/asghar4415" target="blank" title="Github">
                    <GitHubIcon fontSize="medium" style={
                      {
                        color: '#233142',
                        cursor: 'pointer'
                      }
                    } />
                  </a>
                  <a href="" target="blank" title="Instagram">

                    <SiInstagram fontSize="1.3rem" style={
                      {
                        color: '#233142',
                        cursor: 'pointer'
                      }
                    } />
                  </a>



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







