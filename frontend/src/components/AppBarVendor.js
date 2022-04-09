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
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState, useEffect } from "react"
import Cookies from 'js-cookie';
import axios from "axios";
import { useHistory } from 'react-router';




export default function ButtonAppBar() {

  const [callFlag,setCallFlag] = useState(false);
  const [errAlert,setErrAlert] = useState("");
  const [message,setMessage] = useState("");

  const history = useHistory();


  useEffect(() => {
    if(!Cookies.get('token')){
      setCallFlag(true)
      setErrAlert("error")
      setMessage("Invalid authentication")
    }
      }, [])

  async function logoutVendor(){

    // const Bearer = "Bearer "+ Cookies.get('token')
    // let axiosConfig = {
    //  headers: {
    //      'Content-Type': 'application/json;charset=UTF-8',
    //      "Authorization" : Bearer
    //  }
    // };

      const Bearer = "Bearer "+ Cookies.get('token')
     const headers= {
         'Content-Type': 'application/json;charset=UTF-8',
         "Authorization" : Bearer
    };

    try{


      axios.post(process.env.REACT_APP_API_URL+"/vendor/logout",
      {         headers: headers,
                withCredentials: true })
                .then(response =>{ 
            console.log("Vendor Logged out ") 
            console.log(response.data.price,"from api")})
            .catch(error => {console.log(error)})
            history.push({
              pathname: '/vendorview/login',
            });
    }
    catch(err){
      setErrAlert("error")
      setCallFlag(true)
      setMessage("Invalid Data")
      console.log("in error")
      console.log(err)
    }
  }
    
  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={styles.Header} color='primary' >
      <Toolbar style={styles.Toolbar}>
            
          <Typography  component="div" sx={{ flexGrow: 1 , fontSize:24}}>
            <Link 
              underline="none" 
              variant="h5" 
              color="inherit" 
              href="/vendorview/home"
              sx={{ fontSize: 24 , fontWeight:"bold"}}>
            {strings.Common.websiteName}
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

          <Link
              color="inherit"
              underline="none"
              variant="h6"
              href="/vendorview/sales"
              style = {styles.HeaderIcons}
            >
               {strings.vendor.sales} 
            </Link>

            <IconButton
              size="large"
              aria-label="account of current user"
              href="/vendorview/profile"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              onClick={() => logoutVendor()}
              color="inherit"
            >
              <LogoutIcon />
            </IconButton>

          </Box>
        </Toolbar>
      </AppBar>
    </Box>
    </ThemeProvider>

  );
}
