/* eslint-disable no-unused-vars */
import * as React from 'react';
import  { useState } from "react"
import Cookies from 'js-cookie';
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import FloatingActionButtons from '../components/FloatingButton';
import CustomizedSnackbars from '../components/CustomizedSnackbars';
import AppBar from '../components/AppBar';
import withRoot from '../components/WithRoot';
import theme from '../components/theme'
import strings from '../assets/strings';
import styles from '../assets/styles';
import { useHistory } from "react-router-dom";




function VendorSignIn() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loggedin,setLoggedin] = useState(false);
  const [user,setUser] = useState("");
  const [errAlert,setErrAlert] = useState("");
  const [message,setMessage] = useState("");

  const history = useHistory();

  async function login(e){
    e.preventDefault();
    // const data = new FormData(e.currentTarget);
    const loginData={
       email,
      password
    };
    
    try{
      setLoggedin(false)
      const hitback = await axios.post(process.env.REACT_APP_API_URL+"/vendor/login",loginData,{
                withCredentials: true
            });
            console.log(hitback)
            if(hitback){
              
              setLoggedin(true)
              setErrAlert("success")
              setMessage("Welcome")
              setUser(hitback.data.vendor.firstName)

              history.push({
                pathname: '/vendorview/home',
                openSnackbar: true
              });
            }
            
    }
    catch(err){
      setUser("")
      setErrAlert("error")
      setLoggedin(true)
      setMessage("Invalid Credentials")
      console.log("in error")
      console.log(err)
  }
   
  }


  return (
    <ThemeProvider theme={theme}>
      { loggedin && <CustomizedSnackbars errAlert={errAlert} message={message} user={user} /> }
      <AppBar/>

      
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar style={styles.Avatar} sx={{ m: 1, bgcolor: 'primary.lighter', color:'primary.main'}}>
            <LoginIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ fontSize: 26 }}>
           {strings.SignUp.Labels.vendorLogin}
          </Typography>
          <Box component="form" onSubmit={login}  sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={strings.SignUp.Labels.email}
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)} value={email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={strings.SignUp.Labels.password}
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)} value={password}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {strings.Common.login}
            </Button>
            <Grid container>
              <Grid item xs>
              
              </Grid>
              <Grid item>
                <Link href="/vendorview/signup" variant="body2">
                  {strings.SignUp.Labels.noAccount}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
      <Link href="/customerview/login" variant="body2">
      <FloatingActionButtons  personIcon={true} text={strings.SignUp.Labels.asCustomerLogin}/>
      </Link>
    </ThemeProvider>
  );
}

export default withRoot(VendorSignIn);
