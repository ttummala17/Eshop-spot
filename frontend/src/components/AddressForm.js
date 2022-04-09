import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import  { useState , useEffect} from "react"
import BasicCard from './BasicCard';
import { padding } from '@mui/system';
import styles from '../assets/styles';
import { Button, Container } from '@mui/material';
import NoAddressCard from './NoAddressCard'
import axios from "axios";
import Cookies from 'js-cookie';


export default function AddressForm(props) {

    const [address,setAddress]=useState(props.address)
    const [oldCart,setOldCart]=useState(props.oldCart)
    const [noAddress,nosetNOAddress]=useState(false)

    const [addresSel, setAddressSel] = useState()

    console.log(oldCart,"in AddressForm")
    console.log(address,"in AddressForm")


    function selection(sel){
      setAddressSel(sel)
      props.setselAddress(sel)
      props.handleNext()
      console.log(props," ------ add indose")
    }

    useEffect(() => {
      const fetchPlanetas = async () => {
          setOldCart(props.oldCart)
          setAddress(props.address) // remove curly braces here
      };    
      fetchPlanetas()

      if(addresSel){
        props.setselAddress(addresSel)
        props.handleNext()
      }

      if(props.address == null){
        nosetNOAddress(true)
      }

      const Bearer = "Bearer "+ Cookies.get('token')
      console.log(Bearer)
      let axiosConfig = {
       headers: {
           'Content-Type': 'application/json;charset=UTF-8',
           "Authorization" : Bearer
       }
     };

              axios.get(process.env.REACT_APP_API_URL+"/addresses/mine",axiosConfig,{
                withCredentials: true
            }).then(response =>{
            console.log(response.data,"addres")
            // this.setState({address:response.data})
            setAddress(response.data)
            console.log(this.state.address,"set")
            }).catch(error => {
                // this.setState({loggedin:true})
                // this.setState({errAlert:"error"})
                // this.setState({message:"Something went wrong"})
                console.log(error);
              });

  }, []);



  return (
    <React.Fragment>
      <Typography variant="h6" style={styles.titleCheckout} gutterBottom>
       Select Shipping address
      </Typography>
      <Container>
        <Grid container spacing={2} sx={{alignItems: "center", justifyContent: "center"}}>
          {address.map(currentAddress => (
              <Grid item key={currentAddress} xs={3} style={styles.CardGridAddress}>
                  <BasicCard oldCart={oldCart} address={currentAddress} selection={selection} />
              </Grid>
            ))}
        </Grid>
        <NoAddressCard/>

    </Container>
    
      
    </React.Fragment>
  );
}