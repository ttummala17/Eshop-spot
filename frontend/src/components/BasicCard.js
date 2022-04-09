import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import  { useState , useEffect} from "react"
import Cookies from 'js-cookie';
import { useHistory } from 'react-router';

import axios from "axios";
import styles from '../assets/styles';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard(props) {
    const [address,setAddress]=useState(props.address)
    const [oldCart,setOldCart] = useState(props.oldCart)


    const history = useHistory();

    console.log(address)
    console.log(oldCart,"in basiccard")

    function selectedAddress(add){
      props.selection(add)
    }


    useEffect(() => {
      const fetchPlanetas = async () => {
          setAddress(props.address) 
      };    
      fetchPlanetas()
  }, []);


  return (
    <Card sx={{ minWidth: 300, maxWidth:400, maxHeight:300, minHeight: 150 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} variant="h6" style={styles.textTransformNone} gutterBottom>
          {address.firstName}{bull}{address.lastName}
        </Typography>
     
        <Typography variant="body2">
          {address.street1}
          
         
        </Typography>
        <Typography variant="body2">
          {address.city}
          
         
        </Typography>
        <Typography variant="body2">
          {address.country}
         
        </Typography>
        <Typography variant="body2">
          {address.zipcode}
         
        </Typography>
      </CardContent>
      <CardActions style={{justifyContent: "center"}}>
        <Button size="small"  variant="outlined" onClick={() => selectedAddress(address)}>Select Address</Button>
      </CardActions>
    </Card>
  );
}
