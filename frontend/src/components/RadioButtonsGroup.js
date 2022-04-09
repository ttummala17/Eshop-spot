import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import withRoot from './WithRoot';
import  { useState , useEffect} from "react"
import { createTheme, ThemeProvider } from '@mui/material/styles';

function RadioButtonsGroup(props) {
    const [address,setAddress]=useState(props.address)

    console.log(address,"radio")
    useEffect(() => {
      const fetchPlanetas = async () => {
          
          setAddress(props.address) // remove curly braces here
      };    
      fetchPlanetas()
  }, [props.address]);


  return (
    <FormControl component="fieldset">

      <RadioGroup
        aria-label="gender"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel value={props.address} control={<Radio />} label= {address.street1+", "+address.city+", "+address.state+" ,"+address.zipcode} />
       
      </RadioGroup>
    </FormControl>
  );
}
export default withRoot(RadioButtonsGroup)
