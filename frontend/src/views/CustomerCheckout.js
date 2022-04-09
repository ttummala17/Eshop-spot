import React, { Component } from "react";
import axios from "axios";
import RecipeReviewCard from "../components/RecipeReviewCard";
import Grid from '@mui/material/Grid';
import AppBarCus from "../components/AppBarCustomer";
import Container from '@mui/material/Container';
import theme from "../components/theme";
import { ThemeProvider } from '@material-ui/core/styles';
import withRoot from '../components/WithRoot';
import { CssBaseline } from "@mui/material";
import Cookies from 'js-cookie';
import Checkout from "../components/Checkout";
import AddressForm from "../components/AddressForm";
import AppBarCustomer from '../components/AppBarCustomer';
import styles from '../assets/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';





class CustomerCheckout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      address:[],
      oldCart:{},
      productsAll: [],
      updateProd:[],
      loggedin:false,
      errAlert:'',
      selectedAddress:{}
    };
  }

  componentDidMount () {
    const Bearer = "Bearer "+ Cookies.get('token')
    console.log(Bearer)
    let axiosConfig = {
     headers: {
         'Content-Type': 'application/json;charset=UTF-8',
         "Authorization" : Bearer
     }
   };
 
          if(!Cookies.get('token')){
          this.setState.loggedin = true
          this.state.errAlert = "error"
          this.state.message ="Invalid Authentication"
         
      }

            axios.get(process.env.REACT_APP_API_URL+"/addresses/mine",axiosConfig,{
              withCredentials: true
          }).then(response =>{
          console.log(response.data,"addres")
          this.setState({address:response.data})
          console.log(this.state.address,"set")
          }).catch(error => {
              this.setState({loggedin:true})
              this.setState({errAlert:"error"})
              this.setState({message:"Something went wrong"})
              console.log(error);
            });

  }


  render() {
      return(

        <ThemeProvider theme={theme}>
        <AppBarCustomer/>
          <Checkout add={this.state.address} 
          // cart={this.state.oldCart}
          />
        </ThemeProvider>


  );
    
  }
}

export default withRoot(CustomerCheckout);
