/* eslint-disable no-unused-vars */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import strings from '../assets/strings';
import theme from './theme'
import { ThemeProvider } from '@material-ui/core/styles';
import styles from '../assets/styles';
import Link from '@mui/material/Link';
import { Button } from '@mui/material';



export default function ButtonAppBar() {
  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={styles.Header} color='primary'>
        <Toolbar style={styles.Toolbar}>
            
          <Typography  component="div" sx={{ flexGrow: 1 , fontSize:24}}>
            <Link 
              underline="none" 
              variant="h5" 
              color="inherit" 
              href="/"
              sx={{ fontSize: 26 , fontWeight:"bold" }}>
            {strings.Common.websiteName}
            </Link>
          </Typography>

            {/* <Link
              color="inherit"
              underline="none"
              variant="h6"
              href="/vendorview/signup"
              style = {styles.HeaderIcons}
            >
               {strings.Common.signup} 
            </Link>

            <Link
              color="inherit"
              underline="none"
              href="/vendorview/login"
              variant="h6"
              style = {styles.HeaderIcons}
            >
               {strings.Common.login} 
            </Link> */}
        </Toolbar>
      </AppBar>
    </Box>
    </ThemeProvider>

  );
}
