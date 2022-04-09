const express = require('express')
const Customer = require('../models/customer')
const auth = require('../middleware/customerAuth')
const Currency = require('../models/currency')

const router = new express.Router()



router.post('/currency/add', async (req,res) =>{
    console.log('inside currency add')
    const currency  = new Currency(req.body)
    await currency.save().then(() =>{
        res.send(currency)

    }).catch((error)=>{
        res.status(400).send(error)
    })
}) 

 //get all currencies 
router.get('/currency/all', async (req,res)=>{
    console.log('inside currency get all')
    
    try{
        const currencies = await Currency.find({})
        res.send(currencies)

    }catch(e){
        res.status(500).send(e)
    }
 
})


router.get('/currency/me', auth, async (req,res)=>{
    var cus = req.customer;
    const _id = cus.currency;

    try{
        const currency = await Currency.find({_id})
        res.send(currency)
    }
    catch(e){
                res.status(500).send(e)
             }
})




module.exports = router
