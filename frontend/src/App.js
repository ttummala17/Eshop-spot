/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";



// Importing components

//Vendor
import Home from "./views/Home";
import VendorLogin from "./views/VendorLogin";
import VendorSignup from "./views/VendorSignup";
// import VendorSales from "./components/VendorSales"
import VendorHome from './views/VendorHome';
import VendorUpdate from './components/VendorUpdate';
import VendorProfile from './views/VendorProfile';
import ProductUpdate from './views/ProductUpdate';

//Customer
import CustomerSignup from "./views/CustomerSignup";
import CustomerLogin from "./views/CustomerLogin";
import CustomerHome from './views/CustomerHome';
import AddressAdd from './components/AddAddressForm'
import CustomerUpdate from './components/CustomerUpdate';
import CustomerProfile from './views/CustomerProfile';
import CustomerCart from './views/CustomerCart';
import CustomerPayment from './views/CustomerPayment';

//Common
import ProductDetails from './views/ProductDetails';
import CustomerCheckout from './views/CustomerCheckout';
import CustomerOrders from './views/CustomerOrders';
import Dashboard from './components/Dashboard';
import VendorSales from './views/VendorSales';




 



function App() {
  return (
    <Router>
        <Route exact path="/" component={Home} />
        <Route path="/vendorview/login" component={VendorLogin} />
        <Route path="/vendorview/signup"  component={VendorSignup} />
        <Route path="/vendorview/home" component={VendorHome} />
        <Route path="/vendorview/profile"  component={VendorProfile} />



        <Route path="/customerview/login" component={CustomerLogin} />
        <Route path="/customerview/signup"  component={CustomerSignup} />
        <Route path="/customerview/home"  component={CustomerHome} />
        
        <Route path="/customerview/update" component={CustomerUpdate} />
        <Route path="/vendorview/update" component={VendorUpdate} />
        <Route path="/productsview/update/:id" component={ProductUpdate} /> 
        <Route path="/productsview/:id" component={ProductDetails} /> 
        <Route path="/customerview/profile/:index?"  component={CustomerProfile} />
        <Route path="/customerview/cart"  component={CustomerCart} />
        
        <Route path="/addressview/add" component={AddressAdd} />




{/* app js new components by gopi */}
        <Route path="/customerview/checkout" component={CustomerCheckout} />
        <Route path="/customerview/payment" component={CustomerPayment} />
        <Route path="/customerview/orders" component={CustomerOrders} />
        <Route path="/vendorview/sales" component={VendorSales} />
        




    </Router>
  );
}

export default App;
