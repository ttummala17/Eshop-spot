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
import Popup from "../components/popup";
import ProductForm from "../components/ProductForm"
import { Button } from "@mui/material";


class VendorHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loggedin:false,
      errAlert:'',
      openPopup:false,
      recordForEdit:null,
      categories:[]
    };
    //const categories = []
  }

 
  async componentDidMount ()  {

    if(!Cookies.get('token')){
      this.setState.loggedin = true
      this.state.errAlert = "error"
      this.state.message ="Invalid Authentication"
     
    }

    const Bearer = "Bearer "+ Cookies.get('token')
    let axiosConfig = {
     headers: {
         'Content-Type': 'application/json;charset=UTF-8',
         "Authorization" : Bearer
      }
    };
 
      try{
      
      const hitback =  await axios.get(process.env.REACT_APP_API_URL+"/product/mine",axiosConfig, {
                  withCredentials: true
        
                });
                console.log(hitback)
                this.setState({ products: hitback.data });
      }catch(e){
       
     
            this.setState.loggedin = true
            this.state.errAlert = "error"
            this.state.message ="Only vendors can add products"
            console.log("in error")
            console.log(e)
        }
        try{
        const hitback = await axios.get(process.env.REACT_APP_API_URL+"/category/all",axiosConfig,{
          withCredentials: true
        })
        this.state.categories=hitback.data
        //console.log("^^ ",this.state.categories)
      }catch(e){
        console.log(e)
      }
        //getCategories();
        
  }

  // async getCategories(){
  //   const Bearer = "Bearer "+ Cookies.get('token')
  //   let axiosConfig = {
  //    headers: {
  //        'Content-Type': 'application/json;charset=UTF-8',
  //        "Authorization" : Bearer
  //     }
  //   };

  //   const hitback = await axios.get(process.env.REACT_APP_API_URL+"/category/all",axiosConfig,{
  //     withCredentials: true
  //   })
  //   this.state.categories=hitback.data
  // }

  updatePopup(value){
    this.setState({openPopup:value})
  }

  openInPopup(item){

    this.setState({recordForEdit:item})
    this.updatePopup(true)
  }


  render() {
  
      return(
         
        <ThemeProvider theme={theme}>
        <CssBaseline/>
        <AppBarVendor/>
            <Box style={styles.ProductListBox}>
              <BasicTable products = {this.state.products} 
                          //categories={this.state.categories}
                          openInPopup={(e) => this.openInPopup(e)} 
              />
            </Box>
{/* 
            <Link href="/product/create" variant="body2">
                <FloatingActionButtons addIcon={true} text="Add Product" />
            </Link> */}

          <Button onClick={() => this.updatePopup(true)} variant="body2">
                <FloatingActionButtons addIcon={true} text="Add Product" />
            </Button>

            <Popup
                title="Add Product"
                openPopup={this.state.openPopup}
                setOpenPopup={(e) => this.updatePopup(e)}
            >
                <ProductForm 
                    recordForEdit={this.state.recordForEdit} 
                    setOpenPopup={(e) => this.updatePopup(e)}
                    categories = {this.state.categories}
                    />
                
            </Popup>
        </ThemeProvider>
  );
    
  }
}

export default withRoot(VendorHome)
