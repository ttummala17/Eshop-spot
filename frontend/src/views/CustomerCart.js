/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import axios from "axios";
import RecipeReviewCard from "../components/RecipeReviewCard";
import Cookies from 'js-cookie';
import CustomizedSnackbars from '../components/CustomizedSnackbars';

import CartTable from "../components/CartTable";
import AppBar from "../components/AppBarCustomer"
import theme from "../components/theme";
import { ThemeProvider } from '@material-ui/core/styles';
import withRoot from '../components/WithRoot';
import { CssBaseline } from "@mui/material";
import { Box } from "@mui/system";
import styles from "../assets/styles";


class CustomerCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
        oldCart:{},
      productsAll: [],
      tableProd:[],
      loggedin:false,
      errAlert:''

    };
  }
  
 
  async componentDidMount ()  {

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

      try{
      
        const hitback =  await axios.get(process.env.REACT_APP_API_URL+"/customers/myCart",axiosConfig, {
          withCredentials: true
          
      });
  
      
      console.log(hitback)
      this.setState({ oldCart: hitback.data });
      console.log("after hitback assignmemnt")
      console.log(this.state.oldCart[0].productlist)
      
      console.log(this.state.productsAll)
  
      // 
      // this.setState({}) SET PRODTABLE DATA HERE
  }catch(e){
         
       
      this.setState.loggedin = true
      this.state.errAlert = "error"
      this.state.message ="Only vendors can add products"
      console.log("in error")
      console.log(e)
  }


      axios.get(process.env.REACT_APP_API_URL+`/product/all`,axiosConfig).then(response => {console.log("response" + response.data);
        this.setState({ productsAll: response.data });
        console.log(this.state.productsAll,"check")
        console.log(this.state.oldCart[0].productlist)

        for(var i =0;i<this.state.productsAll.length;i++){
    
            for(var j=0;j<this.state.oldCart[0].productlist.length;j++){
                
              if(this.state.productsAll[i]._id == this.state.oldCart[0].productlist[j].product){
                  var tempJson = {
                      "id":this.state.productsAll[i]._id,
                      "name": this.state.productsAll[i].name,
                      "photo": this.state.productsAll[i].photo,
                      "price": this.state.productsAll[i].price,
                      "quantity": this.state.oldCart[0].productlist[j].quantity,
                      "backQuantity":this.state.productsAll.quantity

                  }
                  this.setState({ tableProd: [...this.state.tableProd, tempJson] })

              }
              
            }
        }

       
      })
      .catch(error => {
          console.log(error)
        
      });

console.log("before for",this.state.productsAll )




  }

  render() {
      
  
      return(

        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <AppBar/>
          <Box style={styles.ProductListBox}>
              <CartTable products = {this.state.tableProd} />
            </Box>

        </ThemeProvider>
         
  //   <div style={{ display: "inline-block" ,position:"relative",top:"50px",left:"110px"}}>
  //   <CartTable products = {this.state.tableProd} />
  // </div>
  )
    
  }
}

export default withRoot(CustomerCart)
