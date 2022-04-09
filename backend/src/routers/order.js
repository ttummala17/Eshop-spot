const express = require('express')
const auth = require('../middleware/customerAuth')
const Order = require('../models/order')
const Customer = require('../models/customer')
const Cart = require('../models/cart')
const Product = require('../models/product')
const cartDetails = require('../middleware/cartDetails')

const router = new express.Router()



router.post('/order/add', auth,async (req,res) =>{
    
    console.log('inside irder add')
    const order  = new Order({...req.body,owner:req.customer._id})
    
    console.log("1___________"+  order)
    const _id = req.customer.cart
    const prodlist = req.body.productlist
    console.log(prodlist,req.body,"In order add")
    try{

        prodlist.forEach(pro => {
            console.log("in for each")
    
            const cart =  Product.findByIdAndUpdate(pro.product, {$inc:{'quantity':- pro.quantity}  },
                function (err, docs) {
                        if (err){
                            
                            console.log(err)
                        }
                        else{
                        console.log("Updated shake : ", docs);
                        }
                        });
            
          });



    const cart =  Cart.findByIdAndUpdate(_id, { productlist: [] },
    function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
            console.log("Updated User : ", docs);
            }
            });


    
    console.log("cart1",cart)
    }catch(err){
        console.log(err)
    }
    await order.save().then(() =>{
     
        res.send(order)

    }).catch((error)=>{
        console.log("in order error")
        console.log(error)
        res.status(400).send(error)
    })
})

// //get all vendors 
router.get('/order/all', async (req,res)=>{
    console.log('inside order get all')
    
    try{
        const orders = await Order.find({})
        res.send(orders)

    }catch(e){
        res.status(500).send(e)
    }
 
})

router.get('/orders/:id', async (req,res)=>{
    const _id = req.params.id
    
    try{
        const order = await Order.findById({_id})
        console.log("inside get orders")
        const owner = order.owner
        console.log(owner)
        const ownerinfo = Customer.findById({owner})
        console.log(ownerinfo)
        res.send(order)
        

    }catch(e){
        res.status(500).send(e)
    }
 
})



// //update customer

router.patch('/order/:id', async (req,res)=>{
    console.log("inside order patch")
    const updates = Object.keys(req.body)
    
    try{
        const order = await Order.findById(req.params.id)

        updates.forEach((update) => order[update] = req.body[update])

        await order.save()
        
        if(!order){
            console.log("inside not found")
            return res.status(404).send()
        }
        res.status(200).send(order)
    }catch(e){
        
            res.body(e)
    }
 
})


router.patch('/order/status/:id', async (req,res)=>{
    console.log("inside status patch")
    const _id = req.params.id
    const prod = req.body.product


    

    // const updates = Object.keys(req.body)

    
    
    try{
        const order = await Order.findById(req.params.id)

        order.productlist.forEach(pro => {
            console.log(pro.product)
            if(pro.product == prod){
                pro.status = req.body.status
                if(req.body.status == "Return Request Initiated" ){
                    pro.returnReason = req.body.returnReason
                }
                else if(req.body.status == "Order Placed" || req.body.status == "Order Dispatched" || req.body.status == "Out for Delivery" || req.body.status == "Delivered"){
                    pro.returnReason = "-"
                }

            }

        }
)
        // updates.forEach((update) => order[update] = req.body[update])

        await order.save()
        
        if(!order){
            console.log("inside not found")
            return res.status(404).send()
        }
        res.status(200).send(order)
    }catch(e){
            
            res.body(e)
    }
 
})




// //delete vendor

router.delete('/order/:id', async (req,res)=>{
    const _id = req.params.id
    
    try{
        const order = await Order.findByIdAndDelete(req.params.id)
        if(!order){
            res.status(404).send()
        }
        res.send(order)

    }catch(e){
        res.status(500).send(e)
    }
 
})

//Get customer order details
router.get('/customerorders', auth, async (req,res)=>{
    //const _id = req.params.id
    
    try{
        const products = await Product.find({})
        await req.customer.populate('orders').execPopulate()
        const orders = req.customer.orders

        orders.forEach(ordr => {
            
            var prodlist = ordr.productlist;
            var statusChange = true;
            prodlist.forEach(prod => {
                if(prod.product && statusChange && !( prod.status == "Delivered" || prod.status == "Return Accepted" || prod.status == "Return Rejected") ){
                    statusChange = false;
                }

            });
            if(statusChange){
                ordr.status = "Completed"
            }
            console.log("state--", statusChange)
        });
        const resp = { products : products, orders: orders}
        res.send(resp)
        //console.log(resp)

    }catch(e){
        res.status(500).send(e)
    }
 
})

module.exports = router
