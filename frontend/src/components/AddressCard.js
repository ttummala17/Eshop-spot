import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import trimWords from 'trim-words';
import styles from '../assets/styles';

export default function AddressCard(props) {

  const handleDelete = (address) => {
    props.delAddress(address);
  }

  const handleEditClick = (address) => {
    props.openInPopup(address);
  }


  return (
    <Card sx={{ minWidth:250, maxWidth:300, maxHeight:300, minHeight: 200 }}>
      {console.log(props, " -- pop")}
      <CardContent sx= {{minHeight: 150}} >
        <Typography variant="h6" sx={{ mb: 1.5 }}>
        {props.address.suffix} {props.address.firstName} {props.address.lastName}
        </Typography>

        <Typography variant="body2"> {props.address.street1} </Typography>
        <Typography variant="body2"> {props.address.street2} </Typography>
        <Typography variant="body2">   {props.address.city}, {props.address.state} </Typography>
        <Typography variant="body2">  {props.address.zipcode} - {props.address.country} </Typography>
       

      </CardContent>
      <CardActions>
        <Button style={styles.CardButton} onClick={() => handleEditClick(props.address)} size ="small" variant="outlined" color="secondary">Edit </Button>
        <Button style={styles.CardButton} onClick={() => handleDelete(props.address)} size ="small" variant="outlined" color="secondary">Delete</Button>
      </CardActions>
    </Card>
  );
}
