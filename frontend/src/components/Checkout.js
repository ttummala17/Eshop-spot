import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import  { useState , useEffect} from "react"
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import Cookies from 'js-cookie';
import axios from "axios";
import theme from './theme';
import AppBarCustomer from './AppBarCustomer';
import styles from '../assets/styles';



export default function Checkout(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [address,setAddress]=useState(props.add)
  const [oldCart,setOldCart]=useState(props.cart)
  const [selAddress,setselAddress]=useState()
  const [paymentDetails, setPaymentDetails]= useState()

  console.log(props, "-- -props------------------")
  console.log(address, "-- -add")
  console.log(oldCart, "-- -cart")

  const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm address ={props.add} setselAddress={setselAddress} handleNext={handleNext}/>;
    case 1:
      return <PaymentForm handleNext={handleNext} setPaymentDetails={setPaymentDetails}/>;
    case 2:
      return <Review address ={selAddress} paymentDetails={paymentDetails}/>;
    default:
      throw new Error('Unknown step');
  }
}


console.log(oldCart,"In checkout")

console.log(address,"In  checkout")

  

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h2" variant="h3" align="center" style={styles.HeadingCheckout}>
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                {      console.log("selected *******Address-----, ",selAddress)}

              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        
      </Container>
    </ThemeProvider>
  );
}