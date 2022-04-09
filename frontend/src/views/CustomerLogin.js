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




function CustomerSignin() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [callFlag,setCallFlag] = useState();
  const [user,setUser] = useState("");
  const [errAlert,setErrAlert] = useState("");
  const [message,setMessage] = useState("");


  const history = useHistory();

  async function login(e){
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const loginData={
      email: data.get('email'),
      password: data.get('password'),

    };
    
    try{
      const hitback = await axios.post(process.env.REACT_APP_API_URL+"/customer/login",loginData,{
                withCredentials: true
            });
            console.log(hitback)
            if(hitback){
              
              setCallFlag(true)
              setErrAlert("success")
              setMessage("Welcome")
              setUser(hitback.data.customer.firstName)
              history.push({
                pathname: '/customerview/home',
                openSnackbar: true
              });            
            
            }
            
    }
    catch(err){
      setUser("")
      setErrAlert("error")
      setCallFlag(true)
      setMessage("Invalid Credentials")
      console.log("in error")
      console.log(err)
  }
   
  }


  return (
    <ThemeProvider theme={theme}>
      { callFlag && <CustomizedSnackbars errAlert={errAlert}message={message} user={user} /> }
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
           {strings.SignUp.Labels.customerLogin}
          </Typography>
          <Box component="form" onSubmit={login} noValidate sx={{ mt: 1 }}>
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
                <Link href="/customerview/signup" variant="body2">
                  {strings.SignUp.Labels.noAccount}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
      <Link href="/vendorview/login" variant="body2">
      <FloatingActionButtons personIcon={true} text={strings.SignUp.Labels.asVendorLogin}/>
      </Link>
    </ThemeProvider>
  );
}

export default withRoot(CustomerSignin);
