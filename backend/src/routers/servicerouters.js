const express = require('express')
const Category = require('../models/category')

const router = new express.Router()

router.post('/category/add', async (req,res) =>{
    console.log('inside category add')
    const category  = new Category(req.body)
    await category.save().then(() =>{
        res.send(category)

    }).catch((error)=>{
        res.status(400).send(error)
    })
}) 

 //get all currencies 
router.get('/category/all', async (req,res)=>{
    //console.log('inside category get all')
    
    try{
        const categories = await Category.find({})
        res.send(categories)

    }catch(e){
        res.status(500).send(e)
    }
 
})


module.exports = router
