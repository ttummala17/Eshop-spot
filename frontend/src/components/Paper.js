import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Magnifier from "react-magnifier";


export default function Variants(props) {
  return (
    <Box
      sx={{
        display: 'flex',
        '& > :not(style)': {
          m: 1,
          width: 128,
          height: 128,
        },
      }}
    >
        <Magnifier src={props.src} width={250} />
     {/* <img src={props.src} /> */}
      
    </Box>
  );
}
