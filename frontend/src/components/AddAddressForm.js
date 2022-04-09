import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import { Container , MenuItem} from '@mui/material';
import { Box } from '@mui/system';
import { Button, Input } from '@mui/material';
import withRoot from './WithRoot';
import { useState, useEffect } from "react"
import axios from "axios";
import strings from '../assets/strings';
import CustomizedSnackbars from './CustomizedSnackbars';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';







function AddAddress(props)  {
    const [inputs, setInputs] = useState({});
    const [callFlag,setCallFlag] = useState(false);
    const [errAlert,setErrAlert] = useState("");
    const [message,setMessage] = useState("");
    const [isEdit,setIsEdit] = useState(false);



    function refreshPage() {
      setTimeout(()=>{
          window.location.reload(true);
      }, 1000);
      console.log('page to reload')
  }


    const history = useHistory();

    useEffect(() => {
      if(!Cookies.get('token')){
        setCallFlag(true)
        setErrAlert("error")
        setMessage("Invalid authentication")
      }

        if (props.recordForEdit != null){
            setInputs(props.recordForEdit)
            console.log("edit record", props.recordForEdit)
            setIsEdit(true)
          }
        }, []
      )

    


    async function handleSubmit(event){
        if (event) {
          event.preventDefault();
          const addressData=inputs;
        console.log(addressData,"  address")
          const Bearer = "Bearer "+ Cookies.get('token')
          let axiosConfig = {
           headers: {
               'Content-Type': 'application/json;charset=UTF-8',
               "Authorization" : Bearer
           }
        };
        
        if(isEdit){
          try{
            console.log(inputs._id,"  input")
            setCallFlag(false)
            const hitback = await axios.patch(process.env.REACT_APP_API_URL+`/address/${inputs._id}`,addressData,axiosConfig,{
                      withCredentials: true
                  });
                  console.log(hitback)
                  if(hitback){
                    
                    setCallFlag(true)
                    setErrAlert("success")
                    setMessage("Address Edited")
                    console.log("Address Edited")
                    props.setOpenPopup(false)
                    // history.push('/customerview/profile/3')
                    window.location.href = "/customerview/profile/3";

                  }
                  
          }
          catch(err){
            setErrAlert("error")
            setCallFlag(true)
            setMessage("Invalid Data")
            console.log("in error")
            console.log(err)
          }
        }
        else{

          try{
            setCallFlag(false)
            const hitback = await axios.post(process.env.REACT_APP_API_URL+"/address/add",addressData,axiosConfig,{
                      withCredentials: true
                  });
                  console.log(hitback)
                  if(hitback){
                    
                    setCallFlag(true)
                    setErrAlert("success")
                    setMessage("Welcome")
                    // setInputs(null)
                    props.setOpenPopup(false)
                    // history.push('/customerview/profile/3')
                    window.location.href = "/customerview/profile/3";

                  }
                  
          }
          catch(err){
            setErrAlert("error")
            setCallFlag(true)
            setMessage("Invalid Data")
            console.log("in error")
            console.log(err)
          }
          }
        }
    }
    

      const handleInputChange = (event) => {
        //event.persist();
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
      }

  return (
    <ThemeProvider theme={theme}>
          { callFlag && <CustomizedSnackbars errAlert={errAlert} message={message}  /> }
    <Container component="main" maxWidth="sm" >
        <Box
          sx={{
            // marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          component="form"  onSubmit={handleSubmit}
        >
    {/* <Typography variant="h6" gutterBottom component="h1">
        Shipping address
      </Typography> */}
      <Grid container spacing={3}>
      
      <Grid item xs={12} sm={2}>

          <InputLabel 
                //required 
                variant='standard'
                id='menuid'
                htmlFor="select-label">Suffix</InputLabel>
                <Select
                    required
                    input={<Input id="select-label" />}
                    value={''|| inputs.suffix}
                    onChange={handleInputChange}
                    id="suffix" 
                    name="suffix"
                    labelId='menuid'
                    fullWidth
                    label="Suffix"
                    defaultValue = {''|| inputs.suffix}
                >

                <MenuItem key="Mr" value="Mr">Mr</MenuItem>
                <MenuItem key="Mrs" value="Mrs">Mrs</MenuItem>
                <MenuItem key="Miss" value="Miss">Miss</MenuItem>
                <MenuItem key="Ms" value="Ms">Ms</MenuItem>

                

                </Select>



        </Grid>

        <Grid item xs={12} sm={5}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label={strings.Common.firstName}
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={handleInputChange}
            value={inputs.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label={strings.Common.lastName}
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={handleInputChange}
            value={inputs.lastName}

          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="street1"
            name="street1"
            label={strings.Address.street1}
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            onChange={handleInputChange}
            value={inputs.street1}

          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="street2"
            name="street2"
            label={strings.Address.street2}
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            onChange={handleInputChange}
            value={inputs.street2}


          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label={strings.Address.city}
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            onChange={handleInputChange}
            value={inputs.city}


          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="state"
            name="state"
            label={strings.Address.state}
            fullWidth
            variant="standard"
            onChange={handleInputChange}
            value={inputs.state}


          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zipcode"
            name="zipcode"
            label={strings.Address.zip}
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            onChange={handleInputChange}
            value={inputs.zipcode}


          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label={strings.Address.country}
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            onChange={handleInputChange}
            value={inputs.country}


          />
        </Grid>
        <Grid item xs={12}>
        <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
        </Button>
        </Grid>
      </Grid>
      </Box>
      </Container>
      </ThemeProvider>
  );
}

export default withRoot(AddAddress);