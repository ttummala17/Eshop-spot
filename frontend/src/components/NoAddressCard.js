import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import  { useState , useEffect} from "react"
import Cookies from 'js-cookie';
import { useHistory } from 'react-router';

import axios from "axios";
import styles from '../assets/styles';
import { Container } from '@mui/material';


export default function NoAddressCard(props) {

    const history = useHistory();
    

    function handleClick(){
        history.push('/customerview/profile/3')
    }


  return (
    <Container sx={{pt:"20px", display: "flex" , justifyContent: "center"}}>

        <Button size="small"  variant="contained" onClick={() => handleClick()}>Add new Address</Button>
    </Container>
  );
}
