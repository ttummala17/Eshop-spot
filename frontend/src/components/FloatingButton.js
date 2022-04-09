/* eslint-disable no-unused-vars */
import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import { padding } from '@mui/system';

export default function FloatingActionButtons(props) {
    const style = {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    };
  return (

    <Box style={style} sx={{ '& > :not(style)': { m: 1 } }}>
    
      <Fab color="primary" variant="extended" sx={ {paddingLeft : '40px', paddingRight: '40px'} }>
       {props.personIcon && <PersonIcon sx={{ mr: 1 }} />}
       {props.addIcon && <AddIcon sx={{mr:1}}/>}
        {props.text}
      </Fab>
   
    </Box>
  );
}
