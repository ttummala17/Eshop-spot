/* eslint-disable no-unused-vars */
import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import RecipeReviewCard from "../components/RecipeReviewCard";
import Grid from '@mui/material/Grid';
import AppBarCus from "../components/AppBarCustomer";
import Container from '@mui/material/Container';
import theme from "../components/theme";
import { ThemeProvider } from '@material-ui/core/styles';
import withRoot from '../components/WithRoot';
import { CssBaseline } from "@mui/material";
import CustomerProfileTabs from "../components/CustomerProfileTabs"
import {
    BrowserRouter as Router,
    useParams
  } from "react-router-dom";

function CustomerProfile() {
    console.log(useParams(), "use param")
    let { index } = useParams();
    console.log(index, "   activeIndex")
    
    if(!index){
        index = 0
    }

    return(
        <ThemeProvider theme={theme}>
        <CssBaseline/>
        <AppBarCus/>
        <CustomerProfileTabs activeIndex={parseInt(index)}/>


        </ThemeProvider>

  
    );
}


export default withRoot(CustomerProfile);
