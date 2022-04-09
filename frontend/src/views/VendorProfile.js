/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import AppBar from "../components/AppBarVendor";
import theme from "../components/theme";
import { ThemeProvider } from '@material-ui/core/styles';
import withRoot from '../components/WithRoot';
import { CssBaseline } from "@mui/material";
import VendorProfileTabs from "../components/VendorProfileTabs"


function CustomerProfile() {
    return(
        <ThemeProvider theme={theme}>
        <CssBaseline/>
        <AppBar/>
        <VendorProfileTabs/>

        </ThemeProvider>

  
    );
}


export default withRoot(CustomerProfile);
