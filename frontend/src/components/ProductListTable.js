import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Link from '@mui/material/Link';
import  { useState } from "react"
import Cookies from 'js-cookie';
import axios from "axios";
import CustomizedSnackbars from './CustomizedSnackbars';
import strings from '../assets/strings'
import styles from '../assets/styles';
import trimWords from 'trim-words';
import { Avatar, getAccordionDetailsUtilityClass } from '@mui/material';
import Popup from "./popup";
import ProductForm from './ProductForm';
import ProductUpdate from '../views/ProductUpdate';
import { useEffect } from 'react';



export default function ProductListTable(props) {

  // var base64Icon = props.product.photo;

  function refreshPage() {
    setTimeout(()=>{
        window.location.reload(true);
    }, 1000);
    console.log('page to reload')
}

  //console.log("77, ",props)
  const [prod,setProd] = useState("");
  const [errAlert,setErrAlert] = useState("");
  const [message,setMessage] = useState("");
  const [loggedin,setLoggedin] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [openPopup, setOpenPopup] = useState(false);
  const [categories, setCategories] = useState([]);


  const openInPopup = item => {
    setRecordForEdit(item)
    setOpenPopup(true)
  }

  useEffect( () => {

    fetchData()
  },[]) 

  async function fetchData(){
    const Bearer = "Bearer "+ Cookies.get('token')
          let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Authorization" : Bearer
          }
      };
  try{
      const hitback =  await axios.get(process.env.REACT_APP_API_URL+"/category/all",axiosConfig,{
          withCredentials: true
      })
      setCategories(hitback.data)
    }catch(e){
      console.log(e)
    }
    console.log("cate--",categories)
    //setCategories(props.categories)
  }

  async function delProd(product){
   
    setLoggedin(false)
    const Bearer = "Bearer "+ Cookies.get('token')
    console.log(Bearer)
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Authorization" : Bearer
      }
    };

    if(!Cookies.get('token')){
      setErrAlert("error")
      setMessage("Only vendors can add products")

     
  }
    try{
      const hitback =  await axios.delete(process.env.REACT_APP_API_URL+`/product/${product._id}`,axiosConfig, {
        withCredentials: true
        
    });
    console.log(hitback.data)
    // this.setState({ products: hitback.data });
    setErrAlert("success")
    setMessage("Product deleted")
    setProd(product.name)
    // setProd(hitback.data.product.name)
    setLoggedin(true)
    refreshPage()

    }catch(e){
      setErrAlert("error")
      setLoggedin(true)
      setMessage("Something went wrong")
      console.log("in error")
      console.log(e)
    }


  }
  return (
    <div> { loggedin && <CustomizedSnackbars errAlert={errAlert}message={message} user={prod}/> }
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Product table">
        <TableHead>
          <TableRow>
            <TableCell style={styles.ProductTableCell_First}></TableCell>
            <TableCell align="center">{strings.product.name}</TableCell>
            <TableCell align="center">{strings.product.desc}&nbsp;</TableCell>
            <TableCell align="center">{strings.product.price}&nbsp;</TableCell>
            <TableCell align="center">{strings.product.quantity}&nbsp;</TableCell>
            <TableCell align="center">Category&nbsp;</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.products.map((product) => (
            <TableRow
              key={product._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

              <TableCell>
                    <Avatar variant="rounded" src={product.photo} ></Avatar>
              </TableCell>
              <TableCell style={styles.ProductTableCell}>{product.name}</TableCell>
              <TableCell style={styles.ProductTableCell}>{trimWords(product.description, 3, '...')}</TableCell>
              <TableCell style={styles.ProductTableCell}>${product.price}</TableCell>
              <TableCell style={styles.ProductTableCell}>{product.quantity}</TableCell>
              <TableCell style={styles.ProductTableCell}>{product.category}</TableCell>
              <TableCell variant="body2">
              {/* <Link underline="none" href={`/product/update/${product._id}`} >
                  <EditIcon />

              </Link> */}
                <Link underline="none" href="#" variant="body2">
                    <EditIcon onClick={() => openInPopup(product)}/>
                </Link>
              </TableCell>
              <TableCell>
                <Link underline="none" href="#" variant="body2">
                    <DeleteIcon onClick={() => delProd(product)}/>
                </Link>
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Popup
                title="Edit Product"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <ProductUpdate 
                    recordForEdit={recordForEdit} 
                    setOpenPopup={setOpenPopup}
                    categories={categories}
                    />
                
            </Popup>
    </div>
  );
}
