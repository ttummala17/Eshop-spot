const Order = require('../models/order')
const Customer = require('../models/customer')
const Cart = require('../models/cart')
const Product = require('../models/product')

//On order product quantity update, make cart isActive false, add new cart
module.exports = async function cartDetails(order)
{
    console.log("__ cart Detialslll ")
    let _id = order.cart
    try{
        const cart = await Cart.findById({_id})
        console.log(cart)
        cart.isActive = false
        cart.productlist.forEach(prod =>{
                prod.orderStatus = "Order Placed"
        })
        cart.save()
            try{
            const new_Cart = new Cart({owner:cart.owner})
            new_Cart.save()
            }catch(err){
                console.log(err)
            }
        cart.productlist.forEach(async item =>{
            let _id =  item.product
            try{
                const prod =  await Product.findById({_id})
                prod.quantity = prod.quantity - item.quantity
                prod.save()
            }catch(e){}
        })
    
    }catch(err){

    }
    return cart
}



