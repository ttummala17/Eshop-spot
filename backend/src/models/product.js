const mongoose = require('mongoose')
const validator = require('validator')
const Order = require('../models/order')

const productSchema =  new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    price:{
        type: Number,
        required: true,
        validate(value){
            if(value<0){
                throw new Error('price cant be negitve')
            }
        }
    },
    quantity:{
        type: Number,
        required: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Vendor'

    },
    size:{
        type: String,
      
    },
    color:
    {
        type: String
    },
    photo:{
        type: String
    },
    alt:{
        type: String
    },
    category:{ type: String }

})


const Product  =  mongoose.model('Product',productSchema)
module.exports = Product
