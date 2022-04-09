import React, { Component } from "react";
import axios from "axios";
import RecipeReviewCard from "../components/RecipeReviewCard";
import Grid from '@mui/material/Grid';
import AppBarCus from "../components/AppBarCustomer";
import Container from '@mui/material/Container';
import theme from "../components/theme";
import { ThemeProvider } from '@material-ui/core/styles';
import withRoot from '../components/WithRoot';
import { CssBaseline, Typography } from "@mui/material";
import Cookies from "js-cookie";
import Stack from '@mui/material/Stack';
import { Box } from "@mui/system";
import Chip from '@mui/material/Chip';
import styles from '../assets/styles';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(30),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

class CustomerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      oldCart:{},
      productsAll: [],
      tableProd:[],
      loggedin:false,
      errAlert:'',
      noProducts:false,
      symbol:'',
      categories:'',
      selectedCategory:"All",
      searchValue:''
    };
  }

  // requestSearch(searchedVal){
  //     const filteredRows = this.state.products.filter((row) => {
  //       return row.Name.toLowerCase().includes(searchedVal.toLowerCase());
  //     });
  //     this.state.products(filteredRows);
  // }

  componentDidMount () {

    //this.setState({symbol: getCurrencySymbol})
    //console.log("state:",this.state)
    const Bearer = "Bearer "+ Cookies.get('token')
    let axiosConfig = {
    headers: {
         'Content-Type': 'application/json;charset=UTF-8',
         "Authorization" : Bearer
      }
    }; 

    axios.get(process.env.REACT_APP_API_URL+"/currency/me",axiosConfig).then(response =>{
      //console.log(response.data[0].symbol)
      const symbol = response.data[0].symbol
      this.setState({symbol:symbol})
    }).catch(error => {
      console.log(error);
  
    });

    axios.get(process.env.REACT_APP_API_URL+"/category/all").then(response =>{
      console.log("22,,",response.data)
      
      this.setState({categories:response.data})
    }).catch(error => {
      console.log(error);
  
    });

    axios.get(process.env.REACT_APP_API_URL+`/product/all`).then(response => {
        //console.log("response" + response.data);
        this.setState({ products: response.data });
        this.setState({ productsAll: response.data });

        if(response.data.length == 0){
            this.setState({noProducts:true})
        }
        for(var i =0;i<this.state.productsAll.length;i++){
    
          for(var j=0;j<this.state.oldCart[0].productlist.length;j++){
              
            if(this.state.productsAll[i]._id == this.state.oldCart[0].productlist[j].product){
                var tempJson = {
                    "id":this.state.productsAll[i]._id,
                    "name": this.state.productsAll[i].name,
                    "photo": this.state.productsAll[i].photo,
                    "alt":this.state.productsAll[i].alt,
                    "price": this.state.productsAll[i].price,
                    "owner": this.state.productsAll[i].owner,
                    "quantity": this.state.oldCart[0].productlist[j].quantity,
                    "backQuantity":this.state.productsAll.quantity,
                    "category":this.state.productsAll[i].category

                }
                this.setState({ tableProd: [...this.state.tableProd, tempJson] })

            }
            
          }
          console.log(this.state.tableProd,"tab")
      }
      })
      .catch(error => {
        console.log(error);
      });


      // function getColor(name){
      //   if(name == this.state.selectedCategory){
      //     return "primary"
      //   }
      //   else{
      //     return "default"
      //   }
      // }

  }

  

  render() {
      return(

    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <AppBarCus/>

      <Container sx={{ py: 6, paddingTop:'24px' }} >
          {this.state.noProducts && <Typography> No Products Available</Typography>}

          { this.state.noProducts == false &&
            <Box sx={{ m: 2 }} style={styles.SearchBox}>
                <Stack direction="row" spacing={1}>
                    <Chip label="All" onClick={() => this.setState({selectedCategory : "All" })} />
                    {this.state.categories.length > 0 && this.state.categories.map(st => (
                      <Chip 
                      clickable
                      label={st.categoryname} 
                      onClick={() => this.setState({selectedCategory : st.categoryname })} 
                      />
                    ))}
                </Stack>


                <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search…"
                      inputProps={{ 'aria-label': 'search' }}
                      value={this.state.searchValue}
                      onChange={(e) => this.setState({searchValue:e.target.value})}
                    />
                </Search>
                
            </Box>
           }

          {/* <Divider variant="middle" /> */}
          <Grid container spacing={4} >
            {console.log(this.state, " ---")}
            {this.state.products.filter(product => 
                (product.quantity > 0) && 
                ( this.state.selectedCategory == "All" || product.category == this.state.selectedCategory) &&
                ( product.name.includes(this.state.searchValue)) )
            .map(currentproduct => (
             <Grid item key={currentproduct} xs={3} >
                   <RecipeReviewCard oldCart={this.state.oldCart} product={currentproduct} symbol={this.state.symbol}/>
              </Grid>
            ))}
          </Grid>
        </Container>
    </ThemeProvider>
      



  );
    
  }
}

export default withRoot(CustomerHome);
