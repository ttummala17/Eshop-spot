import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import  { useState , useEffect} from "react"
import Cookies from 'js-cookie';
import { useHistory } from 'react-router';
import { Box } from '@mui/system';
import axios from "axios";


// const products = [
//   {
//     name: 'Product 1',
//     desc: 'A nice thing',
//     price: '$9.99',
//   },
//   {
//     name: 'Product 2',
//     desc: 'Another thing',
//     price: '$3.45',
//   },
//   {
//     name: 'Product 3',
//     desc: 'Something else',
//     price: '$6.51',
//   },
//   {
//     name: 'Product 4',
//     desc: 'Best thing of all',
//     price: '$14.11',
//   },
//   { name: 'Shipping', desc: '', price: 'Free' },
// ];

// const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
// const payments = [
//   { name: 'Card type', detail: 'Visa' },
//   { name: 'Card holder', detail: 'Mr John Smith' },
//   { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
//   { name: 'Expiry date', detail: '04/2024' },
// ];

export default function Review(props) {
  const [address,setAddress]=useState(props.address)
  const [oldCart,setOldCart]=useState(props.oldCart)
  const [paymentDetails,setPaymentDetails]=useState(props.paymentDetails)

  const [order,setOrder]=useState()

  const history = useHistory()

  console.log(address, ",,,,", oldCart)


    const placeOrder = async () => {
          console.log("selected address:",address)

          const Bearer = "Bearer "+ Cookies.get('token')
              console.log(Bearer)
              let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Authorization" : Bearer
                }
              };

      console.log(newO,"newO")
      const hitback =  await axios.get(process.env.REACT_APP_API_URL+"/cart/mine",axiosConfig, {
        withCredentials: true 
      });
      console.log(hitback.data,"  in basic card final try")

      var newO ={
          cart:hitback.data._id,
          price:hitback.data.price,
          productlist:hitback.data.productlist,
          address:address
      }
      console.log(newO,"after assign")

      axios.post(process.env.REACT_APP_API_URL+`/order/add`,newO,axiosConfig,{
        withCredentials: true })
        .then(response =>{ console.log(response.data,"from api")
            var o=response.data
            console.log(o,"Order placed")
            setOrder(o)
            history.push("/customerview/profile/2")
      }).catch(error => {console.log(error)})

      }




  return (
    <React.Fragment>
      {/* <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding> */}
        {/* {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $34.06
          </Typography>
        </ListItem>
      </List> */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{address.firstName}&nbsp;{address.lastName}</Typography>
          <Typography gutterBottom>{address.street1}&nbsp;{address.city}</Typography>
          <Typography gutterBottom>{address.state}&nbsp;{address.zipcode}</Typography>
          {/* <Typography gutterBottom>{address.join(', ')}</Typography> */}
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          {console.log("paymne det --",paymentDetails)}
          { paymentDetails.type == "card" && <Box>
          <Typography gutterBottom>{paymentDetails.cardName}</Typography>
          <Typography gutterBottom>{paymentDetails.cardNumber}</Typography>
          </Box> }

          { paymentDetails.type == "cod" && <Box>
          <Typography gutterBottom>Cash on Delivery</Typography>
          </Box> }
          

        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>

                <Button
                    variant="contained"
                    sx={{ mt: 3, ml: 1 }}
                    onClick={() => placeOrder()}
                  >
                    Place Order
                  </Button>
                  </Box>
    </React.Fragment>
  );
}