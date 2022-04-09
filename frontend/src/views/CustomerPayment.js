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
import PaymentForm from "../components/PaymentForm";





class CustomerPayment extends Component {
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
          this.state.message ="Only vendors can add products"
         
      }


    axios
      .get(process.env.REACT_APP_API_URL+`/product/all`)
      .then(response => {
        console.log("response" + response.data);
        this.setState({ products: response.data });
        this.setState({ productsAll: response.data });


        for(var i =0;i<this.state.productsAll.length;i++){
    
          for(var j=0;j<this.state.oldCart[0].productlist.length;j++){
              
            if(this.state.productsAll[i]._id == this.state.oldCart[0].productlist[j].product){
                
                var tempJson = {
                    "id":this.state.productsAll[i]._id,
                    "quantity": this.state.productsAll[i].quantity - this.state.oldCart[0].productlist[j].quantity,
                   

                }
                this.setState({ updateProd: [...this.state.updateProd, tempJson] })

            }
            
          }
          console.log(this.state.updateProd,"tab")
      }
      })
      .catch(error => {
        
        console.log(error);
      });






      try{
       
      
        axios.get(process.env.REACT_APP_API_URL+"/customers/myCart",axiosConfig, {
        withCredentials: true
        
    }).then(resposne =>{
      this.setState({ oldCart: resposne.data });
      this.setState({notify: this.state.oldCart[0].productlist.length})

      console.log(this.state.oldCart,"oldcart")
    })
  
      
      
  
      // 
      // this.setState({}) SET PRODTABLE DATA HERE
  }catch(e){
         
       
      this.setState.loggedin = true
      this.state.errAlert = "error"
      this.state.message ="Only vendors can add products"
      console.log("in error")
      console.log(e)
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


  <div>

<PaymentForm />
  </div>
      



  );
    
  }
}

export default withRoot(CustomerPayment);
