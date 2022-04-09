import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import Title from './Title';
import Cookies from 'js-cookie';
import axios from "axios";

// Generate Order Data




export default function Orders(props) {
    
    const[status,setStatus] = React.useState(props.OrderStatus)
    console.log(props,"in orders")

    function refreshPage() {
        setTimeout(()=>{
            window.location.reload(true);
        }, 1000);
        console.log('page to reload')
    }

    const handleAddrTypeChange = async (e,row) => {
        console.log((e.target.value,row))

        const Bearer = "Bearer "+ Cookies.get('token')
        let axiosConfig = {
         headers: {
             'Content-Type': 'application/json;charset=UTF-8',
             "Authorization" : Bearer
         }
      };
      try{
       
 
        const statusUpdate={
            "product":row.product_id,
            "status":e.target.value
        }
        console.log(row.order_id,"order")
        const hitback = await axios.patch(process.env.REACT_APP_API_URL+`/order/status/${row.order_id}`,statusUpdate,axiosConfig,{
                  withCredentials: true
              });
              console.log(hitback)
              if(hitback){
                
           

                // setInputs(null)
                refreshPage()

              }
              
      }
      catch(err){
 
        console.log("in error")
        console.log(err)
      }
    }

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Order_Id</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price </TableCell>
            <TableCell >Action</TableCell>
            <TableCell>Order Status </TableCell>
            <TableCell>Return Reason </ TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
            <TableRow key={row.product_id}>
              <TableCell>{row.order_id}</TableCell>
              <TableCell>{row.productName}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell >    
        <NativeSelect
          defaultValue={30}
          inputProps={{
            name: 'age',
            id: 'uncontrolled-native',
         
          }}
          onChange={(e) => handleAddrTypeChange(e,row)}
        >
            <option value={row.OrderStatus}>-</option>
            <option value={"Order Placed"}>Order Placed</option>
            <option value={"Order Dispatched"}>Order Dispatched</option>
            <option value={"Out for Delivery"}>Out for Delivery</option>
            <option value={"Delivered"}>Delivered</option>
            <option value={"Return Accepted"}>Return Accepted</option>
            <option value={"Return Rejected"}>Return Rejected</option>
        </NativeSelect></TableCell>
              <TableCell>{row.OrderStatus}</TableCell>
              <TableCell>{row.returnReason}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      
    
    </React.Fragment>
  );
}