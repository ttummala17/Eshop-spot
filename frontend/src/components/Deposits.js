import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';


function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits(props) {
  return (
    <React.Fragment>
        
      <Title ><Typography color="secondary" variant="h5" >{props.title}      </Typography></Title>

      <Typography component="p" variant="h6">
        {props.data}
      </Typography>
      <Typography color="secondary" sx={{ flex: 1 }}>
       Until Today
      </Typography>
      <div>
   
      </div>
    </React.Fragment>
  );
}