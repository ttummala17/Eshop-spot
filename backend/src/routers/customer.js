const express = require('express')
const Customer = require('../models/customer')
const router = new express.Router()
const Cart = require('../models/cart')
const Address = require('../models/address')
const auth = require('../middleware/customerAuth')
const multer = require('multer')




// vendor singup
router.post('/customer/signup', async (req,res) =>{

    const customer  = new Customer(req.body)
    try{
        await customer.save()
        const cart = new Cart({owner:customer._id,productlist:[{}],price:0})
        cart.save()
        customer.cart = cart._id
        const token = await customer.generateAuthToken()
        res.status(200).cookie("token", token,"customer",customer, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
          }).send({customer,token})
    } catch(e){
        res.status(400).send(e)
    }

  
})

router.post('/customer/login',async(req,res)=>{
    try{
        const customer = await Customer.findByCredentials(req.body.email,req.body.password)
        console.log(customer.firstName,"----------------")
        const token = await customer.generateAuthToken()
        res.status(200).cookie("token", token,"customer",customer, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
          }).send({customer,token})

    }catch(e){
        console.log("here in error")
        res.status(400).send(e)
    }
})

router.post('/customer/logout',auth,async(req,res)=>{
    try{
        req.customer.tokens = req.customer.tokens.filter((token) =>{
            return token.token !== req.token
        })
        await req.customer.save()

        res.clearCookie("token").send("Customer Logged out")

    }catch(e){
        res.status(500).send()
    }
})

router.post('/customer/logoutAll',auth,async(req,res)=>{
    try{
        req.customer.tokens = []
        await req.customer.save()

        res.clearCookie("token").send()

    }catch(e){
        res.status(500).send()
    }
})

const upload = multer({
    
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload only images'))

        }
        cb(undefined,true)
    }
})

router.post('/customer/me/avatar',auth,upload.single('avatar'),(req,res)=>{
    req.customer.avatar = req.file.buffer
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

router.get('/customer/me/avatar',auth)//stopped here

// //get all vendors 
router.get('/customers/all', auth,async (req,res)=>{
    console.log('inse customer get all')
    
    try{
        const customers = await Customer.find({})
        res.send(customers)

    }catch(e){
        res.status(500).send(e)
    }
 
})

router.get('/customers/me',auth, async (req,res)=>{
   res.send(req.customer)
})


router.get('/customer/:id',auth, async (req,res)=>{
    const _id = req.params.id
    
    try{
        const customers = await Customer.findById({_id})
        res.send(customers)
        

    }catch(e){
        res.status(500).send(e)
    }
 
})

router.get('/customers/myCart', auth, async (req,res)=>{
    console.log('inside mycart get all')
    
    try{
        await req.customer.populate('carts').execPopulate()
    
        res.send(req.customer.carts)

    }catch(e){
        res.status(500).send(e)
    }
 
})

router.get('/customers/myOrders', auth, async (req,res)=>{
    console.log('inside myorders get all')
    
    try{
        await req.customer.populate('orders').execPopulate()
    
        res.send(req.customer.orders)

    }catch(e){
        res.status(500).send(e)
    }
 
})

router.patch('/customers/me', auth ,async (req,res)=>{
    
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['contact','password','age','firstName','lastName','currency']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({error:'Invalid updates'})

    }
    try{
        updates.forEach((update) =>
        req.customer[update] = req.body[update])
    await req.customer.save()
    res.send(req.customer)

    }catch(e){
        res.status(400).send(e)
    }
    
   })



// //update customer

router.patch('/customer/:id',auth, async (req,res)=>{
    console.log("inside patch")
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','password','age','contact','currency']

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({error:'Invalid updates'})

    }
    
    try{
        const customer = await Customer.findById(_id)

        updates.forEach((update) =>
            customer[update] = req.body[update]

        )
        await customer.save();
        
        if(!customer){
            console.log("inside not found")
            return res.status(404).send()
        }
        res.status(200).send(customer)
    }catch(e){
        
            res.status(500).send(e)
    }
 
})


//create another using address
// router.patch('/customer/address/:id', async (req,res)=>{
//     console.log("inside address patch")
   
//     console.log(req.body.address)
  
    
//     try{
//         const customer = await Customer.findById({_id})
        
//         // const customer = await Customer.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators: true})
        
//         if(!customer){
//             console.log("inside not found")
//             return res.status(404).send()
//         }
//         customer.address = [req.body.address]
//         customer.save()
//         console.log(customer.address)
//         res.status(200).send(customer)
//     }catch(e){
//             console.log("in error pathc address")
//             res.status(500).send(e)
//     }
 
// })


// //delete vendor

router.delete('/customer/:id',auth, async (req,res)=>{
    const _id = req.params.id
    
    try{
        const customer = await Customer.findByIdAndDelete(req.params.id)
        if(!customer){
            res.status(404).send()
        }
        res.send(customer)

    }catch(e){
        res.status(500).send(e)
    }
 
})

router.delete('/customer/me',auth,async(req,res)=>{
    try{
        await req.customer.remove()
        res.send(req.customer)
    }catch(e){
        res.status(400).send()
    }
})






module.exports = router
