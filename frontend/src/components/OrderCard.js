import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';
import styles from '../assets/styles'
import { Divider } from '@mui/material';
import Cookies from 'js-cookie';
import { Button } from '@mui/material';
import axios from "axios";
import { useHistory } from 'react-router';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CustomizedSnackbars from './CustomizedSnackbars';
import { useState } from 'react';
import OrderProductBar from './OrderProductBar';



function refreshPage() {
  setTimeout(()=>{
    window.location.reload(true);
}, 1000);
console.log('page to reload')


  

}


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function OrderCard(props) {
  const [expanded, setExpanded] = React.useState(false);



  const handleExpandClick = () => {
    setExpanded(!expanded);
  };




  return (
    <Card >

      {  console.log(props.orderinfo,"--- order info")}

      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#ff3366'}} aria-label="recipe">
            <ShoppingCartIcon />
          </Avatar>
        }
        title={props.orderinfo.order_id}
        subheader="OrderId"
      />
    
 
      <CardActions disableSpacing>
      <CardContent>
        <Typography variant="h5" color="text.primary">
          {props.symbol}{props.orderinfo.totalPrice}
          </Typography>
      </CardContent>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>

          <Grid item xs={12}> 
                  <Divider orientation="horizontal" flexItem/>
          </Grid>
            <Grid container direction="column" spacing={0} >
                {props.orderinfo.items.map(item => (
                    <OrderProductBar  item={item} order_id={props.orderinfo.order_id} symbol={props.symbol}/>
                  ))}
            </Grid>

        </CardContent>
      </Collapse>
    </Card>
  );
}
