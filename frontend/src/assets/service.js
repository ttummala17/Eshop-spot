//**//
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { symbol } from 'prop-types';

// const Bearer = "Bearer "+ Cookies.get('token')
//     let axiosConfig = {
//     headers: {
//          'Content-Type': 'application/json;charset=UTF-8',
//          "Authorization" : Bearer
//     }
// }; 

// // const currencies = await axios.get(process.env.REACT_APP_API_URL+"/currency/all").then(response =>{
// //     const options = response.data.map(s => ({
// //       "value" : s._id,
// //       "label" : s.country + " - " + s.code,
// //       "symbol" : s.symbol
// //     }));
// //     //return options;
// //  }).catch(error => {
// //     console.log(error);
// //   });
// // console.log("curevr ---",currencies)

// const userCurrencySymbol = () => {
//  axios.get(process.env.REACT_APP_API_URL+"/currency/me",axiosConfig).then(response =>{
//     console.log(response.data[0].symbol)
//     const symbol = response.data[0].symbol
//     return symbol;
//  }).catch(error => {
//     console.log(error);

// });
// }


// export const getCurrencies = currencies;
// console.log("check--",userCurrencySymbol)

// export const getCurrencySymbol = userCurrencySymbol
