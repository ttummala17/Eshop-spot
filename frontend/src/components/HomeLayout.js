


/* eslint-disable no-unused-vars */
import * as React from 'react';
import styles from '../assets/styles';
import { Box, Button } from '@mui/material';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { Link } from '@mui/material';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

export default function HomeLayout() {
    return (

        <Container style={styles.HomeBackground} maxWidth="sm">

    <Box
        
        style={styles.HomeImage}
      />

      {/* <Typography color="secondary.light" align="center" variant="h3" marked="center" style={{paddingTop:"30px"}}>
                Enjoy Gifts with us
        </Typography> */}
        <Typography
        color= "secondary.light"
        align= "center"
        variant= "h4"
        sx={{ mb: 2, paddingTop:"30px" }}
      >
        Selling and Buying gifts made easy
      </Typography>

    <Grid sm={12} style={{ display:"flex", justifyContent:"center"}}>
      <Link
        color= "secondary"
        size= "large"
        component= "a"
        variant= 'h5'
        href= "customerview/login"
        sx= {{ minWidth: 200 , margin:"10px",textTransform:"none",textAlign:"center"}}
      >
        As Customer
        {/*<ChevronRightOutlinedIcon/> */}
      </Link>
      <Link
        color= "secondary"
        size= "large"
        component= "a"
        variant= 'h5'
        href= "vendorview/login"

        sx={{ minWidth: 200 , margin:"10px",textTransform:"none",textAlign:"center"}}
      >
        As Vendor
        {/*<ChevronRightOutlinedIcon/> */}
      </Link>
      </Grid>
{/*  
        <div style={{ position:"absolute",top:"50%",left:"50%"}}>
            <Button href="customer/signup" variant="contained" color="secondary">Sign Up</Button>
        </div>
 */}

        </Container>

);


}
