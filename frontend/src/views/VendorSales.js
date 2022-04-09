/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import axios from "axios";
import RecipeReviewCard from "../components/RecipeReviewCard";
import Cookies from 'js-cookie';
import FloatingActionButtons from '../components/FloatingButton';
import CustomizedSnackbars from '../components/CustomizedSnackbars';
import BasicTable from "../components/ProductListTable";
import AppBarVendor from "../components/AppBarVendor"
import Container from '@mui/material/Container';
import theme from "../components/theme";
import { ThemeProvider } from '@material-ui/core/styles';
import withRoot from '../components/WithRoot';
import { CssBaseline } from "@mui/material";
import Grid from '@mui/material/Grid';
import { Box } from "@mui/system";
import styles from "../assets/styles";
import { Link } from "@mui/material";
import Dashboard from "../components/Dashboard";
import CircularIndeterminate from "../components/CircularIndeterminate";



class VendorSales extends Component {
  constructor(props) {
    super(props);
    this.state = {
        tableData:[],
      products: [],
      loggedin:false,
      errAlert:'',
      isLoading: true,
      proSold:"",
      totalsales:"",
      popularPord:""
      

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

        axios.get(process.env.REACT_APP_API_URL+"/vendors/dashboard",axiosConfig,{
          withCredentials: true
        }).then(response =>{
    
        console.log(response.data,"addres")
        
       this.setState({tableData:response.data.tabData})
       this.setState({proSold:response.data.ProductsSold})
       this.setState({totalsales:"$"+response.data.totalSales})
       this.setState({popularPord:response.data.populatProd})
       this.setState({isLoading:false})
       
       
        }).catch(error => {
          console.log("in Dashboard error")
            this.setState({loggedin:true})
            this.setState({errAlert:"error"})
            this.setState({message:"Something went wrong"})
            console.log(error);
          });
      
      
      }catch(e){
       
     
            this.setState.loggedin = true
            this.state.errAlert = "error"
            this.state.message ="Only vendors can add products"
            console.log("in error")
            console.log(e)
        }
    }


  render() {
    // console.log(this.state.tableData,"set=============")

      return(
         
        <ThemeProvider theme={theme}>
        <CssBaseline/>
        <AppBarVendor/>
            <Box style={styles.ProductListBox}>
                {console.log(this.state,"from sales-------->")}
              <Dashboard  data={this.state.tableData} total={this.state.totalsales} popular={this.state.popularPord}  productsSold={this.state.proSold}/>
            </Box>

         
        </ThemeProvider>
  );
    
  }
}

export default withRoot(VendorSales)
