const express = require('express')
const Product = require('../models/product')
const multer = require('multer')
const auth = require('../middleware/vendorAuth')
const router = new express.Router()



router.post('/product/add', auth,async (req,res) =>{
    console.log('inside prodcut add',req.body)
    const product  = new Product({...req.body,owner:req.vendor._id})

    try{
        await product.save()
        res.status(200).send(product)
    }catch(e){
        res.status(400).send(e)
    }

    
})

// //get all vendors 
router.get('/product/all', async (req,res)=>{
    console.log('inside product get all')
    
    try{
        const products = await Product.find({})
        res.send(products)

    }catch(e){
        res.status(500).send(e)
    }
 
})

router.get('/product/mine', auth, async (req,res)=>{
    console.log('inside mine get all')
    
    try{
        await req.vendor.populate('products').execPopulate()
    
        res.send(req.vendor.products)

    }catch(e){
        res.status(500).send(e)
    }
 
})

router.get('/product/order', async (req,res)=>{
    console.log('inside mine get all')
    
    try{
        // await req.vendor.populate('products').execPopulate()

        const product = Product.findById("617f5d9080f2f8af98b2e5ec")

        product.populate('ordereProducts').execPopulate()

        res.send(product.ordereProducts)


    
        // res.send(req.vendor.products)

    }catch(e){
        console.log(e)
        res.status(500).send(e)
    }
 
})

router.get('/products/:id', async (req,res)=>{
    const _id = req.params.id
    
    try{
        const product = await Product.findById({_id})
        res.send(product)
        

    }catch(e){
        res.status(500).send(e)
    }
 
})

const photo = multer({
    dest: 'avatars',
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

router.post('/product/photo/:id',auth,photo.single('photo'),async (req,res)=>{
    const _id = req.params.id
    try{
        const product = await Product.findById({_id})
        product.photo = req.file.buffer
        res.send(product)

    }catch(e){
        res.status(500).send(e)
    }

},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})



// //update customer

router.patch('/product/:id', auth, async (req,res)=>{
    console.log("inside patch")
    const updates = Object.keys(req.body)
    const _id = req.params.id
    
    try{
        const product = await Product.findOne({_id, owner: req.vendor._id})

        updates.forEach((update) => product[update] = req.body[update])

        await product.save()
        
        if(!product){
            console.log("inside not found")
            return res.status(404).send()
        }
        res.status(200).send(product)
    }catch(e){
        
        res.status(400).send("please update only your products")
    }
 
})


// //delete vendor

router.delete('/product/:id',auth,async (req,res)=>{
    const _id = req.params.id
    console.log("in pro")
    
    try{
        // const product = await Product.findByIdAndDelete(req.params.id)
        const product = await Product.findOneAndDelete({_id,owner:req.vendor._id})
        if(!product){
            res.status(404).send()
        }
        res.send(product)

    }catch(e){
        res.status(500).send(e)
    }
 
})

module.exports = router
