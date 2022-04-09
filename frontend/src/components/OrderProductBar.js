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
import { useState, useEffect } from "react"




export default function OrderProductBar(props) {
  const [returnRes, setReturnRea] = React.useState();
  const [callFlag, setCallFlag] = React.useState(false)
  const [errAlert,setErrAlert] = useState("");
  const [message,setMessage] = useState("");
  const [item, setItem] = useState(props.item)

  const history = useHistory();

//   useEffect(() => {
//         setItem(props.item)
//         console.log(item,"---- item")
//     }, [props.item])

    // useEffect(() => {
    //     const fetchPlanetas = async () => {
    //         setItem(props.item) 
    //     };    
    //     fetchPlanetas()
    // }, [props.item]);
  

  function onReasonChange(e){
    console.log(e)
    setReturnRea(e.target.value)
  }

  function handleReturnRequest(e,item){
    e.preventDefault()

    console.log(props.order_id,item  ,"on click==========")

    const Bearer = "Bearer "+ Cookies.get('token')
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Authorization" : Bearer
      }
    }
    if(returnRes != null)
     {
      console.log("In return ")


                const statusUpdate={
                  "product":item.id,
                  "status":"Return Request Initiated",
                  "returnReason":returnRes
                }



                axios.patch(process.env.REACT_APP_API_URL+`/order/status/${props.order_id}`,statusUpdate,axiosConfig,{
                  withCredentials: true
              }).then(response =>{
              console.log(response.data," Status updates")
              window.location.href = "/customerview/profile/2";
              
              
              }).catch(error => {

                  console.log(error);
                });
     }
          else{
            console.log("No return ")
            setCallFlag(true)
            setErrAlert("error")
            setMessage("Enter Reason for Return")

          }

  }

  return (

                  <Grid container direction="row"key={item} xs={12} sx={{p:2}}>
                          { callFlag && <CustomizedSnackbars errAlert={errAlert} message={message}  /> }

                        <Grid item xs={2} 
                           style={{ display: "flex" }}
                           alignItems="center"
                           justifyContent="flex-end"
                          > 
                            <Avatar variant="rounded" src={item.photo} ></Avatar>

                        </Grid>
                        <Grid item xs={6} 
                           style={{ display: "flex", paddingLeft:"15px", paddingRight:"15px" }}
                           direction="column"
                           justifyContent="center"

                          > 
                             <Typography variant="h6" color="text.primary" style={styles.textTransformNone}>
                              {item.name}
                              </Typography>
                          </Grid>
                          <Grid item xs={4} 
                                 style={{ display: "flex", paddingRight:"15px" }}
                                direction="column"
                                justifyContent="center"
                              >
                              <Typography variant="body1" color="text.primary" style={styles.textTransformNone}>
                              Quantity : {item.quantity}  
                              </Typography>


                              <Typography variant="body1" color="text.primary" style={styles.textTransformNone}>
                              Price : {props.symbol}{item.price}
                              </Typography>

                              <Typography variant="body1" color="text.primary" style={styles.textTransformNone}>
                              Status : {item.status}  
                           
                              </Typography>

                              {(item.status =="Return Request Initiated" || item.status =="Return Accepted" || item.status =="Return Rejected")
                              ?  <Typography variant="body1" color="text.primary" style={styles.textTransformNone}>
                                Return reason : {item.returnReason}  
                           
                              </Typography>

                              :
                              <Box component="form" noValidate  sx={{ mt: 3 }}>
                              <TextField
                                    variant="outlined"
                                    name={item.id}
                                    required
                                    fullWidth
                                    id={item.id}
                                    label="Return Reason"
                                    autoFocus
                                    onChange={(e) => onReasonChange(e)}
                                    value={returnRes}
                                    size="small"
                                />
                              <Button
                                  type="submit"
                                  fullWidth
                                  value="Return Request Initiated"
                                  variant="contained"
                                  sx={{ mt: 3, mb: 2 }} 
                                  size="small"     
                                  onClick={(e) => handleReturnRequest(e,item)}                                >
                                Request Return
                            </Button>
                            </Box>
                          

                            }

                        </Grid>
                              
                  </Grid>
  );
}
