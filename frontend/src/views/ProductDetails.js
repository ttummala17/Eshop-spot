import * as React from 'react';
import  { Component } from "react"
import Cookies from 'js-cookie';
import axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import CustomizedSnackbars from '../components/CustomizedSnackbars';
import withRoot from '../components/WithRoot';
import theme from '../components/theme'
import Paper from "./../components/Paper"
import AppBarCustomer from '../components/AppBarCustomer';





 class ProductDetails extends Component {

   
    constructor(props) {
      
        super(props);
        this.state = {
            productId:"",
            item:{},
          name: "",
          description:"",
          quantity:"",
          price:"",
          size:"",
          color:"",
          photo:"",
          loggedin:false,
          errAlert:"",
          message:"",
          updateDate:{}
          
    
        };
      }

      




 componentDidMount (){

  
    let paramProdId = this.props.match.params;
    this.setState({productId:paramProdId.id})
    console.log("oarams:",this.state.productId)
    console.log("oarams:",paramProdId.id)
  

    const Bearer = "Bearer "+ Cookies.get('token')
    let axiosConfig = {
     headers: {
         'Content-Type': 'application/json;charset=UTF-8',
         "Authorization" : Bearer
     }
   };
 
          if(!Cookies.get('token')){
          this.setState.loggedin = true
          this.state.errAlert = "error"
          this.state.message ="Only vendors can add products"
         
      }
      axios.get(process.env.REACT_APP_API_URL+`/products/${paramProdId.id}`,axiosConfig,{
        withCredentials: true
    }).then(response =>{
        this.setState({name:response.data.name,
        description:response.data.description,
        quantity:response.data.quantity,
        price:response.data.price,
        photo:response.data.photo,
        size:response.data.size,
        color:response.data.color})

        this.setState({item:response.data})
    }).catch(error => {
        console.log(error);
      });;
    // this.setState.user = hitback
   
    
}



render(){

  const onAdd = async (product) => {

    

    var selectedProd = {
      "product":product._id,
    }

  const Bearer = "Bearer "+ Cookies.get('token')
  let axiosConfig = {
  headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Authorization" : Bearer
    }
  };

  axios.patch(process.env.REACT_APP_API_URL+`/cart/addProduct`,selectedProd,axiosConfig,{
    withCredentials: true })
    .then(response =>{ 
      console.log(response.data.productlist,"from api")
      window.location.href = "/customerview/cart";

      })
      .catch(error => {console.log(error)})

}



  return (
      <>
      
    <ThemeProvider theme={theme}>
      { this.state.loggedin && <CustomizedSnackbars errAlert={this.state.errAlert} message={this.state.message} user={this.state.firstName} /> }
      <AppBarCustomer/>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >  <Typography component="h1" variant="h5">
        Product Details
      </Typography>
        <Paper variant="outlined" src={this.state.photo} />
        

        
          <Box component="form"  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            
                <Grid item xs={12} sm={12}>
                <TextField
                  
                  fullWidth
                  id="name"
                  label="Product Name"
                  name="name"
                  autoComplete="family-name"
                  value={this.state.name}
                  
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  
                  fullWidth
                  id="description"
                  label="Descripiton"
                  name="description"
                  autoComplete="family-name"
                  value={this.state.description}
                  
                />
              </Grid>
        
          
              <Grid item xs={12} sm={6}>
                <TextField
                  
                  fullWidth
                  name="price"
                  label="price"
                  type="number"
                  id="price"
                  autoComplete="new-password"
                  value={this.state.price}
                  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  
                  fullWidth
                  name="quantity"
                  label="quantity"
                  type="number"
                  id="quantity"
                  autoComplete="new-password"
                  value={this.state.quantity}
                  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  
                  id="size"
                  label="Size"
                  name="size"
                  value={this.state.size}
                  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  
                  id="color"
                  label="Color"
                  name="color"
                  value={this.state.color}
                  
                />
              </Grid>
              <Grid item xs={12} sm={12}>
           
           <Button fullWidth variant="contained" color="primary" onClick={() => onAdd(this.state.item)}>Add to Cart</Button>
            </Grid>
             
            </Grid>

          </Box>
        </Box>
        
      </Container>

    </ThemeProvider>
    </>
  );

}}
export default withRoot(ProductDetails);