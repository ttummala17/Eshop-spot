

/* eslint-disable no-unused-vars */
import * as React from 'react';
import  { useState } from "react"
import  { useEffect,Component } from "react"
import Cookies from 'js-cookie';
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import FloatingActionButtons from './FloatingButton';
import CustomizedSnackbars from './CustomizedSnackbars';
import AppBar from './AppBar';
import withRoot from './WithRoot';
import theme from './theme'
import strings from '../assets/strings';
import styles from '../assets/styles';





 class VendorUpdatePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:{},
            password : "",
            confirmPassword : "",
          callFlag: false,
          errAlert:"",
          message:"",
    
        };
      }

      validate(){
          if(this.state.password === this.state.confirmPassword)
            return true;
          else
            return false;
            
      }

      update(e){

        if(this.validate()){
          this.setState({loggedin:false})
          var jusJson={}
          e.preventDefault();
            jusJson = {
                password:this.state.password,
            }

          const Bearer = "Bearer "+ Cookies.get('token')
          let axiosConfig = {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Authorization" : Bearer
            }
           
          };

              axios.patch(process.env.REACT_APP_API_URL+"/vendors/me",jusJson,axiosConfig,{
                withCredentials: true
              }).then(response =>{

            console.log("customer updated")

                this.setState({user:response.data})
                this.setState({errAlert: "success"})
                this.setState({message: "changes updated"})
                this.setState({callFlag: true})
            }).catch(error => {
                this.setState({errAlert: "error"})
                this.setState({message: "Something went wrong"})
                this.setState({callFlag: true})
                console.log(error);
              });;

        }else{
          e.preventDefault();

            this.setState({errAlert: "error"})
            this.setState({message: "Passwords do not match"})
            this.setState({callFlag: true})
        }
        
        console.log(jusJson)
      }
      



render(){

  return (
      <>
    <ThemeProvider theme={theme}>
      { this.state.callFlag && <CustomizedSnackbars errAlert={this.state.errAlert} message={this.state.message} user={this.state.firstName} /> }
      <Container component="main" maxWidth="sm" style={styles.TabContainer}>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Typography component="h1" variant="h6">
            Update Password 
          </Typography>
          <Box component="form" onSubmit={this.update.bind(this)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name= "password"
                  label= "New Password"
                  type= "password"
                  id= "password"
                  autoComplete= "new-password"
                  value= {this.state.password}
                  onChange={(e) => this.setState({password:e.target.value})}
                />
              </Grid>

              <Grid item xs= {12}>
                <TextField
                  required
                  fullWidth
                  name= "confirmPassword"
                  label= "Confirm New Password"
                  type= "password"
                  id= "confirmPassword"
                  autoComplete= "new-password"
                  value={this.state.confirmPassword}
                  onChange={(e) => this.setState({confirmPassword:e.target.value})}
                />
              </Grid>
            </Grid>
            <Button
              type= "submit"
              fullWidth
              variant= "contained"
              sx={{ mt : 3, mb : 2 }}
            >
              {strings.Common.update}
            </Button>
            <Grid container justifyContent="flex-end">
              
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
    </>
  );

}}
export default withRoot(VendorUpdatePassword);
