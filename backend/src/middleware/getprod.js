const Order = require('../models/order')
const Customer = require('../models/customer')
const Cart = require('../models/cart')
const Product = require('../models/product')

//On order product quantity update, make cart isActive false, add new cart
module.exports = async function product(_id)
{
    console.log("__ prod Detialslll ")
 
    try{
        const p = await Product.findById({_id})
        console.log("******")
        console.log(p)
        console.log("******")
        return p
        
    
    }catch(err){

    }
    
}



