const express = require('express')
const Cart = require('../models/cart')
const auth = require('../middleware/customerAuth')
const router = new express.Router()
const Product = require('../models/product')
const prodDetails = require('../middleware/getprod')




router.post('/cart/add', auth,async (req,res) =>{
    console.log('inside cart add')
    const cart  = new Cart({...req.body,owner:req.customer._id})
    await cart.save().then(() =>{
   
     
        res.send(cart)


    }).catch((error)=>{
        res.status(400).send(error)
    })
})

// get all vendors 
router.get('/cart/all', async (req,res)=>{
    console.log('inside cart get all')
    
    try{
        const carts = await Cart.find({})
        res.send(carts)

    }catch(e){
        res.status(500).send(e)
    }
 
})

router.get('/carts/:id', auth,async (req,res)=>{
    const _id = req.params.id
    
    try{
        const cart = await Cart.findOne({_id,owner:req.customer._id})
        res.send(cart)
        

    }catch(e){
        res.status(500).send(e)
    }
 
})

router.get('/cart/mine',auth, async (req,res)=>{
    console.log("inside cart patch")

    try{
    
     
        const cart =  await Cart.findOne({isActive:true,owner:req.customer._id})

        if(!cart){
            console.log("inside not found")
            return res.status(404).send()
        }
        res.status(200).send(cart);

    }catch(e){
        console.log(e)
        
            res.send(e)
    }
 
})




// update customer

router.patch('/cart/mine',auth, async (req,res)=>{
    console.log("inside cart patch")
    const updates = Object.keys(req.body)
  
    
    try{
    
     
        const cart =  await Cart.findOne({owner:req.customer._id})

        updates.forEach((update) => cart[update] = req.body[update])

        await cart.save()
        
        if(!cart){
            console.log("inside not found")
            return res.status(404).send()
        }
        res.status(200).send(cart)
    }
    catch(e){
        console.log(e)
        
            res.send(e)
    }
 
})


// cartt add product

router.patch('/cart/addProduct',auth, async (req,res)=>{
    console.log("inside cart patch")
    const updates = Object.keys(req.body)
    const prod = req.body.product
  
    try{
     
        const cart =  await Cart.findOne({owner:req.customer._id})
        console.log(cart, "-----cart NOOOOO")
        if(cart.productlist!=null){
                let prodList = cart.productlist
                // console.log(prodList, '-- prodlist',  cart ,'    ---cart')
                let prod_in_cart = prodList.findIndex(p => p.product == prod)
                console.log(prod_in_cart, '-- product in cart')
                if(prod_in_cart != -1){
                    console.log("Into this")
                    // console.log(cart.productlist[prod_in_cart], "--prod")
                    cart.productlist[prod_in_cart].quantity = cart.productlist[prod_in_cart].quantity +1
                }
                else{
                    console.log("No this")

                    console.log(cart.productlist[prod_in_cart], "--prod")
                    let productObect = {"product" : prod, "quantity": 1}
                    console.log(cart.productlist, "--prod  list", productObect, "--- pobj")
                    prodList.push(productObect)
                    cart.productlist = prodList
                    console.log(cart.productlist[prod_in_cart], "--prod")
                }             
        }else{
            let productObect = {"product" : prod, "quantity": 1}
            console.log(productObect, "--- pobj")
            cart.productlist.push(productObect)
            console.log(cart.productlist, "--prod")

        }

        // updates.forEach((update) => cart[update] = req.body[update])
        // console.log(prodList, '-- prodlist',  cart ,'    ---cart')
        await cart.save()
        
        if(!cart){
            console.log("inside not found")
            return res.status(404).send()
        }
        res.status(200).send(cart)
    }catch(e){
        console.log(e)
        
            res.send(e)
    }
 
})



// delete vendor

router.delete('/cart/:id', async (req,res)=>{
    const _id = req.params.id
    
    try{
        const cart = await Cart.findByIdAndDelete(req.params.id)
        if(!cart){
            res.status(404).send()
        }
        res.send(cart)

    }catch(e){
        res.status(500).send(e)
    }
 
})



router.get('/cartcount',auth, async (req,res)=>{
    console.log("inside cart count")

    try{
    
     
        const cart =  await Cart.findOne({isActive:true,owner:req.customer._id})
        var count =0
        if(!cart){
            console.log("inside not found")
            return res.status(404).send()
        }

        if(cart.productlist){
            
            cart.productlist.forEach((brace) => {
            if(brace.quantity) {
                count = count+(brace.quantity)
            }
            console.log("1", brace.quantity)
            }
            )
            console.log(count)
        }
        const cartCount = { count: count }
        console.log("see here, ",cartCount)
        res.status(200).send(cartCount);
    }
    catch(e)
    {
        console.log(e)
        
            res.send(e)
    }
 
})

module.exports = router



