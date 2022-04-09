


import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import withRoot from './WithRoot';
import { useState, useEffect } from "react"
import axios from "axios";
import strings from '../assets/strings';
import CustomizedSnackbars from './CustomizedSnackbars';
import Cookies from 'js-cookie';
import styles from '../assets/styles';




function VendorAddress(props)  {
    const [address, setAddress] = useState({});
    const [callFlag,setCallFlag] = useState(false);
    const [user,setUser] = useState("");
    const [errAlert,setErrAlert] = useState("");
    const [message,setMessage] = useState("");



      const getAddress = async () => {

        const Bearer = "Bearer "+ Cookies.get('token')
        let axiosConfig = {
         headers: {
             'Content-Type': 'application/json;charset=UTF-8',
             "Authorization" : Bearer
         }
        };
    
        try{
           
           const hitback =  await axios.get(process.env.REACT_APP_API_URL+"/vendors/me",axiosConfig, {
                     withCredentials: true
                   });
                   
                   console.log(hitback)
                   if(hitback.data.address != null){
                      setAddress(hitback.data.address)     
                   }else{
                      setAddress({street1:"",street2:"",zipcode:"",city:"",state:"",country:""})     
                   }

         }catch(e){
        
               this.setState({callFlag:true})
               this.setState({errAlert:"error"})
               this.setState({message:"Invalid Authentication"})
               console.log("in error")
               console.log(e)
           }
         };
    

    useEffect(() => {
      if(!Cookies.get('token')){
        setCallFlag(true)
        setErrAlert("error")
        setMessage("Invalid authentication")
      }
      getAddress()
      }, [])

    


    async function handleUpdate(event){
        if (event) {
          event.preventDefault();
          const addressData={"address" : address};
        console.log(addressData,"  address")
          const Bearer = "Bearer "+ Cookies.get('token')
          let axiosConfig = {
           headers: {
               'Content-Type': 'application/json;charset=UTF-8',
               "Authorization" : Bearer
           }
        };
        
          try{
            console.log(address,"  input")
            setCallFlag(false)
            const hitback = await axios.patch(process.env.REACT_APP_API_URL+`/vendors/me`,addressData,axiosConfig,{
                      withCredentials: true
                  });
                  console.log(hitback)
                  if(hitback){
                    
                    setCallFlag(true)
                    setErrAlert("success")
                    setMessage("Address Edited")
                    console.log("Address Edited")

                    // setAddress(null)

                  }
                  
          }
          catch(err){
            setUser("")
            setErrAlert("error")
            setCallFlag(true)
            setMessage("Invalid Data")
            console.log("in error")
            console.log(err)
          }
        }
    }
    

      const handleInputChange = (event) => {
        event.persist();
        setAddress(address => ({...address, [event.target.name]: event.target.value}));
      }

      
  return (
    <ThemeProvider theme={theme}>
          { callFlag && <CustomizedSnackbars errAlert={errAlert} message={message}  /> }
    <Container component="main" maxWidth="sm" style={styles.TabContainer}>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          component="form"  onSubmit={handleUpdate}
        >
    <Typography variant="h6" gutterBottom component="h1">
        Vendor address
      </Typography>
      <Grid container spacing={3} sx={{marginTop:"10px"}}>
        <Grid item xs={12}>
          <TextField
            required
            id= "street1"
            name= "street1"
            label= {strings.Address.street1}
            fullWidth
            autoComplete= "shipping address-line1"
            variant= "outlined"
            onChange= {handleInputChange}
            value= {address.street1}

          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id= "street2"
            name= "street2"
            label= {strings.Address.street2}
            fullWidth
            autoComplete= "shipping address-line2"
            variant= "outlined"
            onChange= {handleInputChange}
            value= {address.street2}


          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id= "city"
            name= "city"
            label= {strings.Address.city}
            fullWidth
            autoComplete= "shipping address-level2"
            variant= "outlined"
            onChange= {handleInputChange}
            value= {address.city}


          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            //required
            id= "state"
            name= "state"
            label= {strings.Address.state}
            fullWidth
            variant= "outlined"
            onChange= {handleInputChange}
            value= {address.state}


          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id= "zipcode"
            name= "zipcode"
            label= {strings.Address.zip}
            fullWidth
            autoComplete= "shipping postal-code"
            variant= "outlined"
            onChange= {handleInputChange}
            value= {address.zipcode}


          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id= "country"
            name= "country"
            label= {strings.Address.country}
            fullWidth
            autoComplete= "shipping country"
            variant= "outlined"
            onChange= {handleInputChange}
            value= {address.country}


          />
        </Grid>
        <Grid item xs={12}>
        <Button
              type= "submit"
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

export default withRoot(VendorAddress);
